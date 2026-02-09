export const formatNumber = (num: number): string => {
  // Mostrar número completo até 1 bilhão
  if (num < 1_000_000_000) {
    if (num < 1000) {
      return num < 100 && num % 1 !== 0 ? num.toFixed(1) : Math.floor(num).toString();
    }
    // Formatar com separador de milhar
    return Math.floor(num).toLocaleString('pt-BR');
  }
  
  // A partir de 1 bilhão, começar a abreviar
  const suffixes = ["", "mil", "mi", "bi", "tri", "qua", "qui"];
  const suffixNum = Math.floor(Math.log10(num) / 3);
  
  if (suffixNum >= suffixes.length) return "∞";
  
  let shortValue = num / Math.pow(1000, suffixNum);
  
  if (shortValue >= 100) {
    return Math.floor(shortValue) + " " + suffixes[suffixNum];
  } else if (shortValue >= 10) {
    return shortValue.toFixed(1) + " " + suffixes[suffixNum];
  } else {
    return shortValue.toFixed(2) + " " + suffixes[suffixNum];
  }
};

export const calculateBuildingCost = (baseCost: number, count: number): number => {
  return Math.ceil(baseCost * Math.pow(1.15, count));
};