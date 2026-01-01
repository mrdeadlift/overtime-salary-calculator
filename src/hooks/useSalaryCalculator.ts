import { useCallback } from 'react';
import type { SalaryCalculationResult, SalaryInput } from '../types/salary';
import {
  calculateHourlyRate,
  calculateMonthlyGross,
  calculateMonthlyOvertimePay,
  calculateSalary,
} from '../domain/salaryCalculator';

export const useSalaryCalculator = () => {
  const calculateHourlyRateCallback = useCallback(calculateHourlyRate, []);
  const calculateMonthlyOvertimePayCallback = useCallback(calculateMonthlyOvertimePay, []);
  const calculateMonthlyGrossCallback = useCallback(calculateMonthlyGross, []);
  const calculateCallback = useCallback(
    (input: SalaryInput): SalaryCalculationResult => {
      return calculateSalary(input);
    },
    []
  );

  return {
    calculate: calculateCallback,
    calculateHourlyRate: calculateHourlyRateCallback,
    calculateMonthlyGross: calculateMonthlyGrossCallback,
    calculateMonthlyOvertimePay: calculateMonthlyOvertimePayCallback,
  };
};
