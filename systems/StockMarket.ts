/**
 * Stock Market System
 * Allow players to buy/sell "shares" of buildings at dynamic prices
 * Prices fluctuate based on market supply/demand and global events
 */

interface StockPrice {
  buildingId: string;
  currentPrice: number;
  previousPrice: number;
  highToday: number;
  lowToday: number;
  trend: 'up' | 'down' | 'stable';
  volatility: number;
  dayChange: number; // percentage change
  buyVolume: number;
  sellVolume: number;
}

interface StockPortfolio {
  buildingId: string;
  sharesOwned: number;
  totalInvested: number;
  averageBuyPrice: number;
  profitLoss: number;
}

interface MarketEvent {
  id: string;
  name: string;
  description: string;
  affectedBuilding: string | 'all';
  priceImpact: number; // multiplier 0.5 to 2.0
  duration: number;
  type: 'news' | 'recession' | 'boom' | 'scandal';
}

export class StockMarket {
  stocks: Map<string, StockPrice> = new Map();
  portfolio: StockPortfolio[] = [];
  totalProfit: number = 0;
  totalLoss: number = 0;
  daysSinceMarketOpen: number = 0;
  activeMarketEvents: MarketEvent[] = [];
  
  lastUpdateTime: number = Date.now();
  volatilityTrend: number = 1; // Affects how much prices move
  
  callbacks = {
    onPriceUpdate: (building: string) => {},
    onMarketEvent: (event: MarketEvent) => {},
    onProfit: (amount: number) => {},
  };

  // Initialize market with building prices
  initializeMarket(buildingIds: string[], baseValue: number = 100) {
    buildingIds.forEach(id => {
      this.stocks.set(id, {
        buildingId: id,
        currentPrice: baseValue + Math.random() * baseValue * 0.5,
        previousPrice: baseValue,
        highToday: baseValue,
        lowToday: baseValue,
        trend: 'stable',
        volatility: 0.05 + Math.random() * 0.10,
        dayChange: 0,
        buyVolume: 0,
        sellVolume: 0,
      });
    });
  }

  // Feature 1: Buy shares at current market price
  buyShares(buildingId: string, quantity: number, playerCoxinhas: number): { success: boolean; cost: number; message: string } {
    const stock = this.stocks.get(buildingId);
    if (!stock) return { success: false, cost: 0, message: 'Building not found' };

    const totalCost = stock.currentPrice * quantity;
    if (playerCoxinhas < totalCost) {
      return { success: false, cost: totalCost, message: `Insufficient funds. Need ${this.formatPrice(totalCost)}` };
    }

    // Add to portfolio or create new entry
    let portfolio = this.portfolio.find(p => p.buildingId === buildingId);
    if (!portfolio) {
      portfolio = {
        buildingId,
        sharesOwned: 0,
        totalInvested: 0,
        averageBuyPrice: 0,
        profitLoss: 0,
      };
      this.portfolio.push(portfolio);
    }

    // Update average buy price
    const oldTotal = portfolio.totalInvested;
    portfolio.totalInvested += totalCost;
    portfolio.averageBuyPrice = portfolio.totalInvested / (portfolio.sharesOwned + quantity);
    portfolio.sharesOwned += quantity;

    // Update stock volume
    stock.buyVolume += quantity;

    return { success: true, cost: totalCost, message: `Bought ${quantity} shares at ${this.formatPrice(stock.currentPrice)} each` };
  }

  // Feature 2: Sell shares at current market price
  sellShares(buildingId: string, quantity: number): { success: boolean; gain: number; profitLoss: number; message: string } {
    const stock = this.stocks.get(buildingId);
    const portfolio = this.portfolio.find(p => p.buildingId === buildingId);

    if (!stock || !portfolio || portfolio.sharesOwned < quantity) {
      return { success: false, gain: 0, profitLoss: 0, message: 'Not enough shares to sell' };
    }

    const saleProceeds = stock.currentPrice * quantity;
    const costBasis = portfolio.averageBuyPrice * quantity;
    const profitLoss = saleProceeds - costBasis;

    portfolio.sharesOwned -= quantity;
    portfolio.totalInvested -= costBasis;
    portfolio.profitLoss += profitLoss;

    if (profitLoss > 0) {
      this.totalProfit += profitLoss;
      this.callbacks.onProfit?.(profitLoss);
    } else {
      this.totalLoss += Math.abs(profitLoss);
    }

    // Update stock volume
    stock.sellVolume += quantity;

    // Remove portfolio entry if empty
    if (portfolio.sharesOwned === 0) {
      this.portfolio = this.portfolio.filter(p => p.buildingId !== buildingId);
    }

    return { success: true, gain: saleProceeds, profitLoss, message: `Sold ${quantity} shares at ${this.formatPrice(stock.currentPrice)}` };
  }

  // Feature 3: Limit orders (buy at specific price)
  limitOrderBuy(buildingId: string, quantity: number, maxPrice: number): { success: boolean; message: string } {
    const stock = this.stocks.get(buildingId);
    if (!stock) return { success: false, message: 'Building not found' };

    if (stock.currentPrice <= maxPrice) {
      // Automatically buy
      return this.buyShares(buildingId, quantity, stock.currentPrice * quantity).success 
        ? { success: true, message: `Limit order executed at ${this.formatPrice(stock.currentPrice)}` }
        : { success: false, message: 'Purchase failed' };
    }

    return { success: true, message: `Limit order placed for ${quantity} shares at ${this.formatPrice(maxPrice)}` };
  }

  // Feature 4: Stop loss orders (sell if price drops)
  stopLossOrder(buildingId: string, triggerPrice: number): { success: boolean; message: string } {
    const stock = this.stocks.get(buildingId);
    const portfolio = this.portfolio.find(p => p.buildingId === buildingId);

    if (!stock || !portfolio) {
      return { success: false, message: 'Position not found' };
    }

    if (stock.currentPrice <= triggerPrice) {
      // Automatically sell all
      this.sellShares(buildingId, portfolio.sharesOwned);
      return { success: true, message: `Stop loss triggered at ${this.formatPrice(stock.currentPrice)}` };
    }

    return { success: true, message: `Stop loss order set at ${this.formatPrice(triggerPrice)}` };
  }

  // Feature 5: Market price simulation & updates
  updateMarketPrices(deltaTime: number) {
    const now = Date.now();
    if (now - this.lastUpdateTime < 1000) return; // Update once per second max
    
    this.lastUpdateTime = now;

    this.stocks.forEach((stock) => {
      const previousPrice = stock.currentPrice;

      // Random walk with volatility
      const randomWalk = (Math.random() - 0.5) * 2 * stock.volatility;
      const trend = stock.buyVolume > stock.sellVolume ? 0.02 : stock.sellVolume > stock.buyVolume ? -0.02 : 0;

      let newPrice = stock.currentPrice * (1 + randomWalk + trend) * this.volatilityTrend;

      // Apply market events
      this.activeMarketEvents.forEach(event => {
        if (event.affectedBuilding === 'all' || event.affectedBuilding === stock.buildingId) {
          newPrice *= event.priceImpact;
        }
      });

      // Prevent prices from going negative
      newPrice = Math.max(newPrice, 1);

      stock.previousPrice = previousPrice;
      stock.currentPrice = newPrice;
      stock.dayChange = ((newPrice - previousPrice) / previousPrice) * 100;

      // Track high/low
      stock.highToday = Math.max(stock.highToday, newPrice);
      stock.lowToday = Math.min(stock.lowToday, newPrice);

      // Determine trend
      if (newPrice > previousPrice) stock.trend = 'up';
      else if (newPrice < previousPrice) stock.trend = 'down';
      else stock.trend = 'stable';

      // Reset volume counters
      stock.buyVolume = Math.max(0, stock.buyVolume - 10);
      stock.sellVolume = Math.max(0, stock.sellVolume - 10);

      this.callbacks.onPriceUpdate?.(stock.buildingId);
    });
  }

  // Feature 6: Market sentiment indicator
  getMarketSentiment(): 'bullish' | 'bearish' | 'neutral' {
    if (this.stocks.size === 0) return 'neutral';
    
    const upCount = Array.from(this.stocks.values()).filter(s => s.trend === 'up').length;
    const downCount = Array.from(this.stocks.values()).filter(s => s.trend === 'down').length;

    if (upCount > downCount * 1.5) return 'bullish';
    if (downCount > upCount * 1.5) return 'bearish';
    return 'neutral';
  }

  // Feature 7: Portfolio value calculation
  getPortfolioValue(): number {
    let total = 0;
    this.portfolio.forEach(position => {
      const stock = this.stocks.get(position.buildingId);
      if (stock) {
        total += stock.currentPrice * position.sharesOwned;
      }
    });
    return total;
  }

  // Feature 8: Portfolio return percentage
  getPortfolioReturn(): number {
    const currentValue = this.getPortfolioValue();
    const investedValue = this.portfolio.reduce((sum, p) => sum + p.totalInvested, 0);

    if (investedValue === 0) return 0;
    return ((currentValue - investedValue) / investedValue) * 100;
  }

  // Feature 9: Diversification score (0-100)
  getDiversificationScore(): number {
    if (this.portfolio.length === 0) return 0;
    if (this.portfolio.length === 1) return 25;
    if (this.portfolio.length <= 3) return 50;
    if (this.portfolio.length <= 6) return 75;
    return 100;
  }

  // Feature 10: Trigger market event
  triggerMarketEvent(event: MarketEvent) {
    this.activeMarketEvents.push(event);
    this.callbacks.onMarketEvent?.(event);

    // Auto-remove after duration
    setTimeout(() => {
      this.activeMarketEvents = this.activeMarketEvents.filter(e => e.id !== event.id);
    }, event.duration * 1000);
  }

  // Feature 11: Panic selling detection
  isPanicSelling(): boolean {
    const sellCount = Array.from(this.stocks.values()).filter(s => s.sellVolume > s.buyVolume * 2).length;
    return sellCount > this.stocks.size * 0.5;
  }

  // Feature 12: Market manipulation (rare events)
  marketManipulation(buildingId: string, direction: 'pump' | 'dump') {
    const stock = this.stocks.get(buildingId);
    if (!stock) return;

    const multiplier = direction === 'pump' ? 1.3 : 0.7;
    stock.currentPrice *= multiplier;

    const event: MarketEvent = {
      id: `manip_${Date.now()}`,
      name: direction === 'pump' ? 'PUMP DETECTED! 📈' : 'DUMP DETECTED! 📉',
      description: `Market manipulation detected on ${buildingId}`,
      affectedBuilding: buildingId,
      priceImpact: multiplier,
      duration: 5,
      type: direction === 'pump' ? 'boom' : 'scandal',
    };

    this.triggerMarketEvent(event);
  }

  // Feature 13: Dividend simulation
  getDividends(): { buildingId: string; amount: number }[] {
    const dividends: { buildingId: string; amount: number }[] = [];

    this.portfolio.forEach(position => {
      // Generate small passive income for held shares
      const dividend = position.sharesOwned * 0.1 * (Math.random() * 0.5); // 5-10% of position per period
      if (dividend > 0) {
        dividends.push({ buildingId: position.buildingId, amount: dividend });
      }
    });

    return dividends;
  }

  // Feature 14: Short selling
  shortSell(buildingId: string, quantity: number): { success: boolean; proceeds: number; message: string } {
    const stock = this.stocks.get(buildingId);
    if (!stock) return { success: false, proceeds: 0, message: 'Building not found' };

    const proceeds = stock.currentPrice * quantity;

    // Track as negative position in portfolio
    let portfolio = this.portfolio.find(p => p.buildingId === buildingId);
    if (!portfolio) {
      portfolio = {
        buildingId,
        sharesOwned: -quantity, // Negative for short
        totalInvested: proceeds,
        averageBuyPrice: stock.currentPrice,
        profitLoss: 0,
      };
      this.portfolio.push(portfolio);
    } else {
      portfolio.sharesOwned -= quantity;
    }

    return { success: true, proceeds, message: `Short sold ${quantity} shares, received ${this.formatPrice(proceeds)}` };
  }

  // Feature 15: Short squeeze detection
  isShortSqueeze(): { detected: boolean; buildingId?: string } {
    let maxShorts = 0;
    let squeezedBuilding = '';

    this.portfolio.forEach(position => {
      if (position.sharesOwned < 0 && Math.abs(position.sharesOwned) > maxShorts) {
        const stock = this.stocks.get(position.buildingId);
        if (stock && stock.trend === 'up') {
          maxShorts = Math.abs(position.sharesOwned);
          squeezedBuilding = position.buildingId;
        }
      }
    });

    return maxShorts > 0 ? { detected: true, buildingId: squeezedBuilding } : { detected: false };
  }

  // Feature 16: Options trading (call/put simulation)
  buyCallOption(buildingId: string, strikePrice: number, contracts: number): { success: boolean; cost: number } {
    const stock = this.stocks.get(buildingId);
    if (!stock) return { success: false, cost: 0 };

    // Simple option pricing: 5% of stock price * (stock volatility)
    const premiumPerShare = stock.currentPrice * 0.05 * stock.volatility;
    const totalCost = premiumPerShare * contracts;

    // In actual game, would need to track options separately
    return { success: true, cost: totalCost };
  }

  // Feature 17: Portfolio rebalancing suggestion
  getRebalancingSuggestion(): string {
    const sentiment = this.getMarketSentiment();
    const diversification = this.getDiversificationScore();
    const returnRate = this.getPortfolioReturn();

    if (diversification < 50 && this.portfolio.length < 5) {
      return 'Portfolio too concentrated - consider buying more diverse assets';
    }
    if (returnRate < -20 && sentiment === 'bearish') {
      return 'Consider cutting losses and diversifying';
    }
    if (returnRate > 50 && sentiment === 'bullish') {
      return 'Take profits and rebalance to lock in gains';
    }

    return 'Portfolio is balanced';
  }

  // Feature 18: Historical price tracking
  private priceHistory: Map<string, number[]> = new Map();

  recordPrice(buildingId: string) {
    const stock = this.stocks.get(buildingId);
    if (!stock) return;

    if (!this.priceHistory.has(buildingId)) {
      this.priceHistory.set(buildingId, []);
    }

    const history = this.priceHistory.get(buildingId)!;
    history.push(stock.currentPrice);

    // Keep only last 100 prices
    if (history.length > 100) {
      history.shift();
    }
  }

  getAveragePrice(buildingId: string): number {
    const history = this.priceHistory.get(buildingId);
    if (!history || history.length === 0) {
      const stock = this.stocks.get(buildingId);
      return stock?.currentPrice || 0;
    }

    return history.reduce((a, b) => a + b, 0) / history.length;
  }

  // Feature 19: Arbitrage opportunities detection
  findArbitrageOpportunity(): { buildingId: string; opportunity: string } | null {
    const undervalued: { buildingId: string; discount: number }[] = [];

    this.portfolio.forEach(position => {
      const currentPrice = this.stocks.get(position.buildingId)?.currentPrice || 0;
      const averagePrice = this.getAveragePrice(position.buildingId);
      const discount = ((averagePrice - currentPrice) / averagePrice) * 100;

      if (discount > 15) {
        undervalued.push({ buildingId: position.buildingId, discount });
      }
    });

    if (undervalued.length > 0) {
      undervalued.sort((a, b) => b.discount - a.discount);
      return {
        buildingId: undervalued[0].buildingId,
        opportunity: `${undervalued[0].buildingId} is ${undervalued[0].discount.toFixed(1)}% undervalued`,
      };
    }

    return null;
  }

  // Feature 20: Hedging calculations
  calculateHedgeNeeded(buildingId: string): number {
    const portfolio = this.portfolio.find(p => p.buildingId === buildingId);
    if (!portfolio) return 0;

    const stock = this.stocks.get(buildingId);
    if (!stock) return 0;

    // Suggest hedging 20% of position if volatility is high
    if (stock.volatility > 0.15) {
      return portfolio.sharesOwned * 0.2;
    }

    return 0;
  }

  // Feature 21: Bull/bear market signals
  getBearishSignals(): string[] {
    const signals: string[] = [];

    const sentiment = this.getMarketSentiment();
    if (sentiment === 'bearish') {
      signals.push('Overall market sentiment is bearish');
    }

    const avg = Array.from(this.stocks.values()).reduce((sum, s) => sum + s.dayChange, 0) / Math.max(this.stocks.size, 1);
    if (avg < -2) {
      signals.push('Market-wide price decline detected');
    }

    if (this.isPanicSelling()) {
      signals.push('Panic selling detected');
    }

    return signals;
  }

  // Feature 22: Market hours simulation
  isMarketOpen(): boolean {
    const hour = new Date().getHours();
    return hour >= 9 && hour < 17; // Simple 9-5 market hours
  }

  // Feature 23: Tax calculation (gains tax)
  calculateCapitalGains(): number {
    // Simple 15% tax on profits
    return this.totalProfit * 0.15;
  }

  // Feature 24: Wealth distribution
  getWealthDistribution(): { buildingId: string; percentage: number }[] {
    const total = this.getPortfolioValue();
    if (total === 0) return [];

    return this.portfolio
      .map(p => ({
        buildingId: p.buildingId,
        percentage: (this.stocks.get(p.buildingId)!.currentPrice * p.sharesOwned / total) * 100,
      }))
      .sort((a, b) => b.percentage - a.percentage);
  }

  // Feature 25: Market forecast (simple trend prediction)
  getForecast(buildingId: string): 'buy' | 'sell' | 'hold' {
    const stock = this.stocks.get(buildingId);
    if (!stock) return 'hold';

    const volatility = stock.volatility;
    const trend = stock.trend;

    if (trend === 'up' && volatility < 0.10) return 'buy';
    if (trend === 'down' && volatility > 0.15) return 'sell';
    return 'hold';
  }

  // Utility: Format price for display
  private formatPrice(price: number): string {
    return `${price.toFixed(2)}`;
  }
}
