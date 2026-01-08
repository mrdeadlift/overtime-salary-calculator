// 法定労働時間(月)
export const LEGAL_WORKING_HOURS_PER_MONTH = 173.8;

// 残業割増率
export const OVERTIME_RATE = 1.25;

// 基礎控除額
export const BASIC_DEDUCTION = 480000; // 48万円

// 社会保険料率(2024年度概算)
export const INSURANCE_RATES = {
  healthInsurance: 0.05, // 5% (労働者負担分)
  careInsurance: 0.009, // 0.9% (40歳以上)
  pensionInsurance: 0.0915, // 9.15% (労働者負担分)
  employmentInsurance: 0.006, // 0.6%
};

// 所得税率テーブル(累進課税)
export const INCOME_TAX_BRACKETS = [
  { limit: 1950000, rate: 0.05, deduction: 0 },
  { limit: 3300000, rate: 0.1, deduction: 97500 },
  { limit: 6950000, rate: 0.2, deduction: 427500 },
  { limit: 9000000, rate: 0.23, deduction: 636000 },
  { limit: 18000000, rate: 0.33, deduction: 1536000 },
  { limit: 40000000, rate: 0.4, deduction: 2796000 },
  { limit: Infinity, rate: 0.45, deduction: 4796000 },
];
