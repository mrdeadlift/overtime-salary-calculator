export interface Allowance {
  id: string;
  name: string;
  amount: number;
  isTaxable: boolean;
}

export interface SalaryInput {
  baseSalary: number; // 基本給(月額)
  allowances: Allowance[]; // 各種手当
  expectedOvertimeHours: number; // 見込み残業時間(月)
  summerBonus: number; // 夏季賞与(月給の倍数)
  winterBonus: number; // 冬季賞与(月給の倍数)
}

export interface SalaryCalculationResult {
  monthlyGrossSalary: number; // 月額総支給額
  annualGrossSalary: number; // 年間総支給額
  annualBonus: number; // 年間賞与総額
  annualOvertimePay: number; // 年間残業代総額
  annualIncomeTax: number; // 年間所得税
  annualResidentTax: number; // 年間住民税
  annualSocialInsurance: number; // 年間社会保険料
  totalDeductions: number; // 年間控除総額
  annualNetSalary: number; // 年間手取り額
  monthlyNetSalary: number; // 月額手取り概算
}
