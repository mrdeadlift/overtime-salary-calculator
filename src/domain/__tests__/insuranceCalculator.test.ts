import { describe, expect, it } from "vitest";
import { calculateSocialInsurance } from "../insuranceCalculator";

describe("insuranceCalculator", () => {
  it("applies care insurance only when age is 40 or older", () => {
    const monthlyGross = 300000;
    const annualBonus = 900000;
    const total = monthlyGross * 12 + annualBonus;

    const underForty = calculateSocialInsurance(monthlyGross, annualBonus, 39);
    const overForty = calculateSocialInsurance(monthlyGross, annualBonus, 40);

    expect(underForty.careInsurance).toBe(0);
    expect(overForty.careInsurance).toBeCloseTo(total * 0.009);
  });
});
