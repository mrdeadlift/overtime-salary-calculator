import type { SalaryInput, SalaryCalculationResult } from './salary';

export interface ComparisonPattern {
  id: string;
  name: string;
  input: SalaryInput;
  result: SalaryCalculationResult;
}
