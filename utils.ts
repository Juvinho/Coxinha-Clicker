export const formatNumber = (num: number): string => {
  if (num < 1000) {
      // Para números pequenos, mostra 1 casa decimal se não for inteiro
      // Isso ajuda a visualizar o progresso inicial (ex: 0.1 CPS)
      return num < 100 && num % 1 !== 0 ? num.toFixed(1) : Math.floor(num).toString();
  }
  
  const suffixes = ["", "mil", "mi", "bi", "tri", "qua", "qui"];
  const suffixNum = Math.floor(("" + Math.floor(num)).length / 3);
  
  if (suffixNum >= suffixes.length) return "∞";
  
  let shortValue = parseFloat((suffixNum !== 0 ? (num / Math.pow(1000, suffixNum)) : num).toPrecision(3));
  if (shortValue % 1 !== 0) {
      shortValue = parseFloat(shortValue.toFixed(1));
  }
  return shortValue + " " + suffixes[suffixNum];
};

export const calculateBuildingCost = (baseCost: number, count: number): number => {
  return Math.ceil(baseCost * Math.pow(1.15, count));
};