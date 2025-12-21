import type { SalaryInput } from '../types/salary';

export const isPositiveNumber = (value: number): boolean => {
  return value > 0 && Number.isFinite(value);
};

export const validateSalaryInput = (input: SalaryInput) => {
  const errors: string[] = [];

  if (!isPositiveNumber(input.baseSalary)) {
    errors.push('基本給は正の数値を入力してください');
  }

  if (input.expectedOvertimeHours < 0) {
    errors.push('残業時間は0以上を入力してください');
  }

  if (input.summerBonus < 0 || input.winterBonus < 0) {
    errors.push('賞与は0以上を入力してください');
  }

  return { valid: errors.length === 0, errors };
};
