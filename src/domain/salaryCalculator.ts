import type { SalaryCalculationResult, SalaryInput } from "../types/salary";
import { LEGAL_WORKING_HOURS_PER_MONTH, OVERTIME_RATE } from "../utils/constants";
import { calculateSocialInsurance } from "./insuranceCalculator";
import { calculateIncomeTax, calculateResidentTax, calculateTaxableIncome } from "./taxCalculator";

export const calculateHourlyRate = (baseSalary: number): number => {
  return baseSalary / LEGAL_WORKING_HOURS_PER_MONTH;
};

export const calculateMonthlyOvertimePay = (hourlyRate: number, hours: number): number => {
  return hourlyRate * OVERTIME_RATE * hours;
};

export const calculateMonthlyGross = (input: SalaryInput): number => {
  const allowanceTotal = input.allowances.reduce((sum, allowance) => sum + allowance.amount, 0);
  const hourlyRate = calculateHourlyRate(input.baseSalary);
  const overtimePay = calculateMonthlyOvertimePay(hourlyRate, input.expectedOvertimeHours);
  return input.baseSalary + allowanceTotal + overtimePay;
};

export const calculateAnnualBonus = (input: SalaryInput): number => {
  return input.baseSalary * (input.summerBonus + input.winterBonus);
};

export const calculateSalary = (input: SalaryInput, age: number = 35): SalaryCalculationResult => {
  const monthlyGrossSalary = calculateMonthlyGross(input);
  const annualGrossSalary = monthlyGrossSalary * 12;
  const annualBonus = calculateAnnualBonus(input);

  const hourlyRate = calculateHourlyRate(input.baseSalary);
  const annualOvertimePay =
    calculateMonthlyOvertimePay(hourlyRate, input.expectedOvertimeHours) * 12;

  const annualTotalIncome = annualGrossSalary + annualBonus;

  const socialInsurance = calculateSocialInsurance(monthlyGrossSalary, annualBonus, age);
  const annualSocialInsurance = socialInsurance.total;

  const taxableIncome = calculateTaxableIncome(annualTotalIncome, annualSocialInsurance);
  const annualIncomeTax = calculateIncomeTax(taxableIncome);
  const annualResidentTax = calculateResidentTax(taxableIncome);

  const totalDeductions = annualIncomeTax + annualResidentTax + annualSocialInsurance;
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
};
