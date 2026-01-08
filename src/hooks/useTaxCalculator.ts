import { useCallback } from "react";
import {
  calculateEmploymentIncomeDeduction,
  calculateIncomeTax,
  calculateResidentTax,
  calculateTaxableIncome,
} from "../domain/taxCalculator";

export const useTaxCalculator = () => {
  const calculateEmploymentIncomeDeductionCallback = useCallback(
    calculateEmploymentIncomeDeduction,
    [],
  );
  const calculateTaxableIncomeCallback = useCallback(calculateTaxableIncome, []);
  const calculateIncomeTaxCallback = useCallback(calculateIncomeTax, []);
  const calculateResidentTaxCallback = useCallback(calculateResidentTax, []);

  return {
    calculateIncomeTax: calculateIncomeTaxCallback,
    calculateResidentTax: calculateResidentTaxCallback,
    calculateTaxableIncome: calculateTaxableIncomeCallback,
    calculateEmploymentIncomeDeduction: calculateEmploymentIncomeDeductionCallback,
  };
};
