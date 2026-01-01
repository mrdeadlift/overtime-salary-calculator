import { INSURANCE_RATES } from '../utils/constants';

export const calculateSocialInsurance = (monthlyGross: number, annualBonus: number, age: number = 35) => {
  const monthlyBase = monthlyGross * 12;
  const total = monthlyBase + annualBonus;

  const healthInsurance = total * INSURANCE_RATES.healthInsurance;
  const careInsurance = age >= 40 ? total * INSURANCE_RATES.careInsurance : 0;
  const pensionInsurance = total * INSURANCE_RATES.pensionInsurance;
  const employmentInsurance = total * INSURANCE_RATES.employmentInsurance;

  return {
    healthInsurance,
    careInsurance,
    pensionInsurance,
    employmentInsurance,
    total: healthInsurance + careInsurance + pensionInsurance + employmentInsurance,
  };
};
