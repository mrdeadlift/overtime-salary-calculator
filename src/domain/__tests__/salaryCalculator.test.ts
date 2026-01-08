import { describe, expect, it } from "vitest";
import type { SalaryInput } from "../../types/salary";
import { calculateSalary } from "../salaryCalculator";

describe("salaryCalculator", () => {
  it("calculates annual salary breakdown from base inputs", () => {
    const input: SalaryInput = {
      baseSalary: 300000,
      allowances: [
        { id: "housing", name: "住宅手当", amount: 20000, isTaxable: true },
        { id: "transport", name: "通勤手当", amount: 10000, isTaxable: true },
      ],
      expectedOvertimeHours: 20,
      summerBonus: 1.5,
      winterBonus: 1.5,
    };

    const result = calculateSalary(input);

    expect(result.monthlyGrossSalary).toBeCloseTo(373153.0495, 4);
    expect(result.annualGrossSalary).toBeCloseTo(4477836.5938, 3);
    expect(result.annualBonus).toBeCloseTo(900000, 4);
    expect(result.annualOvertimePay).toBeCloseTo(517836.5938, 3);
    expect(result.annualSocialInsurance).toBeCloseTo(793230.8976, 3);
    expect(result.annualIncomeTax).toBeCloseTo(161403.8377, 3);
    expect(result.annualResidentTax).toBeCloseTo(268903.8377, 3);
    expect(result.totalDeductions).toBeCloseTo(1223538.5731, 3);
    expect(result.annualNetSalary).toBeCloseTo(4154298.0207, 3);
    expect(result.monthlyNetSalary).toBeCloseTo(346191.5017, 3);
  });
});
