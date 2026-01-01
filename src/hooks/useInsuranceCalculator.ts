import { useCallback } from 'react';
import { calculateSocialInsurance } from '../domain/insuranceCalculator';

export const useInsuranceCalculator = () => {
  const calculateSocialInsuranceCallback = useCallback(calculateSocialInsurance, []);

  return { calculateSocialInsurance: calculateSocialInsuranceCallback };
};
