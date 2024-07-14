export const formatTokenPrice = (price: string, precision: number = 6): string => {
    const [integerPart, decimalPart] = price.split('.');
    const formattedDecimal = (decimalPart || '').padEnd(precision, '0') + '1';
    return `${integerPart}.${formattedDecimal}`;
  };