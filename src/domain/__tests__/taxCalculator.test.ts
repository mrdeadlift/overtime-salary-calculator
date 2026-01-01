import { describe, expect, it } from 'vitest';
import {
  calculateEmploymentIncomeDeduction,
  calculateIncomeTax,
  calculateResidentTax,
  calculateTaxableIncome,
} from '../taxCalculator';

describe('taxCalculator', () => {
  it('calculates employment income deduction at bracket boundaries', () => {
    expect(calculateEmploymentIncomeDeduction(1625000)).toBe(550000);
    expect(calculateEmploymentIncomeDeduction(1800000)).toBeCloseTo(1800000 * 0.4 - 100000);
    expect(calculateEmploymentIncomeDeduction(3600000)).toBeCloseTo(3600000 * 0.3 + 80000);
    expect(calculateEmploymentIncomeDeduction(6600000)).toBeCloseTo(6600000 * 0.2 + 440000);
    expect(calculateEmploymentIncomeDeduction(8500000)).toBeCloseTo(8500000 * 0.1 + 1100000);
    expect(calculateEmploymentIncomeDeduction(8500001)).toBe(1950000);
  });

  it('floors taxable income at zero', () => {
    expect(calculateTaxableIncome(1000000, 2000000)).toBe(0);
  });

  it('uses the correct income tax bracket at the boundary', () => {
    expect(calculateIncomeTax(1950000)).toBeCloseTo(1950000 * 0.05);
    expect(calculateIncomeTax(1950001)).toBeCloseTo(1950001 * 0.1 - 97500);
  });

  it('includes resident tax minimum with small taxable income', () => {
    expect(calculateResidentTax(0)).toBeCloseTo(10000);
  });
});
