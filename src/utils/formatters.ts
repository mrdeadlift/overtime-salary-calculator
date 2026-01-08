// 通貨フォーマット
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(Math.round(amount));
};

// 数値フォーマット
export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("ja-JP").format(Math.round(value));
};

// パーセンテージフォーマット
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
