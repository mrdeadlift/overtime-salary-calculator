import { useCallback } from 'react';
import type { SalaryInput, SalaryCalculationResult } from '../types/salary';
import { LEGAL_WORKING_HOURS_PER_MONTH, OVERTIME_RATE } from '../utils/constants';
import { useTaxCalculator } from './useTaxCalculator';
import { useInsuranceCalculator } from './useInsuranceCalculator';

export const useSalaryCalculator = () => {
  const { calculateTaxableIncome, calculateIncomeTax, calculateResidentTax } = useTaxCalculator();
  const { calculateSocialInsurance } = useInsuranceCalculator();

  // 時給計算
  const calculateHourlyRate = useCallback((baseSalary: number): number => {
    return baseSalary / LEGAL_WORKING_HOURS_PER_MONTH;
  }, []);

  // 残業代計算(月額)
  const calculateMonthlyOvertimePay = useCallback((hourlyRate: number, hours: number): number => {
    return hourlyRate * OVERTIME_RATE * hours;
  }, []);

  // 月額総支給額
  const calculateMonthlyGross = useCallback((input: SalaryInput): number => {
    const allowanceTotal = input.allowances.reduce((sum, a) => sum + a.amount, 0);
    const hourlyRate = calculateHourlyRate(input.baseSalary);
    const overtimePay = calculateMonthlyOvertimePay(hourlyRate, input.expectedOvertimeHours);
    return input.baseSalary + allowanceTotal + overtimePay;
  }, [calculateHourlyRate, calculateMonthlyOvertimePay]);

  // 年間賞与計算
  const calculateAnnualBonus = useCallback((input: SalaryInput): number => {
    return input.baseSalary * (input.summerBonus + input.winterBonus);
  }, []);

  // メイン計算関数
  const calculate = useCallback(
    (input: SalaryInput): SalaryCalculationResult => {
      // 月額総支給額
      const monthlyGrossSalary = calculateMonthlyGross(input);

      // 年間総支給額
      const annualGrossSalary = monthlyGrossSalary * 12;

      // 年間賞与
      const annualBonus = calculateAnnualBonus(input);

      // 年間残業代
      const hourlyRate = calculateHourlyRate(input.baseSalary);
      const annualOvertimePay = calculateMonthlyOvertimePay(hourlyRate, input.expectedOvertimeHours) * 12;

      // 年収総額
      const annualTotalIncome = annualGrossSalary + annualBonus;

      // 社会保険料計算
      const socialInsurance = calculateSocialInsurance(monthlyGrossSalary, annualBonus);
      const annualSocialInsurance = socialInsurance.total;

      // 課税所得計算
      const taxableIncome = calculateTaxableIncome(annualTotalIncome, annualSocialInsurance);

      // 所得税・住民税計算
      const annualIncomeTax = calculateIncomeTax(taxableIncome);
      const annualResidentTax = calculateResidentTax(taxableIncome);

      // 控除総額
      const totalDeductions = annualIncomeTax + annualResidentTax + annualSocialInsurance;

      // 手取り額
      const annualNetSalary = annualTotalIncome - totalDeductions;
      const monthlyNetSalary = annualNetSalary / 12;

      return {
        monthlyGrossSalary,
        annualGrossSalary,
        annualBonus,
        annualOvertimePay,
        annualIncomeTax,
        annualResidentTax,
        annualSocialInsurance,
        totalDeductions,
        annualNetSalary,
        monthlyNetSalary,
      };
    },
    [
      calculateMonthlyGross,
      calculateAnnualBonus,
      calculateHourlyRate,
      calculateMonthlyOvertimePay,
      calculateSocialInsurance,
      calculateTaxableIncome,
      calculateIncomeTax,
      calculateResidentTax,
    ]
  );

  return {
    calculate,
    calculateHourlyRate,
    calculateMonthlyGross,
    calculateMonthlyOvertimePay,
  };
};
