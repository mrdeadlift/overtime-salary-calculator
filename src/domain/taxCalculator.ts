import { BASIC_DEDUCTION, INCOME_TAX_BRACKETS } from '../utils/constants';

export const calculateEmploymentIncomeDeduction = (annualIncome: number): number => {
  if (annualIncome <= 1625000) return 550000;
  if (annualIncome <= 1800000) return annualIncome * 0.4 - 100000;
  if (annualIncome <= 3600000) return annualIncome * 0.3 + 80000;
  if (annualIncome <= 6600000) return annualIncome * 0.2 + 440000;
  if (annualIncome <= 8500000) return annualIncome * 0.1 + 1100000;
  return 1950000;
};

export const calculateTaxableIncome = (annualIncome: number, socialInsurance: number): number => {
  const employmentDeduction = calculateEmploymentIncomeDeduction(annualIncome);
  return Math.max(0, annualIncome - employmentDeduction - socialInsurance - BASIC_DEDUCTION);
};

export const calculateIncomeTax = (taxableIncome: number): number => {
  const bracket = INCOME_TAX_BRACKETS.find((b) => taxableIncome <= b.limit);
  if (!bracket) return 0;
  return Math.max(0, taxableIncome * bracket.rate - bracket.deduction);
};

export const calculateResidentTax = (taxableIncome: number): number => {
  const residentBasicDeduction = 430000;
  const adjustedIncome = Math.max(0, taxableIncome + BASIC_DEDUCTION - residentBasicDeduction);
  return adjustedIncome * 0.1 + 5000;
};
