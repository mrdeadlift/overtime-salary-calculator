import { useState, useCallback } from 'react';
import type { ComparisonPattern } from '../types/comparison';
import type { SalaryInput, SalaryCalculationResult } from '../types/salary';

export const useComparisonPatterns = () => {
  const [patterns, setPatterns] = useState<ComparisonPattern[]>([]);

  const addPattern = useCallback(
    (input: SalaryInput, result: SalaryCalculationResult, name: string) => {
      const pattern: ComparisonPattern = {
        id: crypto.randomUUID(),
        name,
        input,
        result,
      };
      setPatterns((prev) => [...prev, pattern]);
    },
    []
  );

  const removePattern = useCallback((id: string) => {
    setPatterns((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearPatterns = useCallback(() => {
    setPatterns([]);
  }, []);

  return { patterns, addPattern, removePattern, clearPatterns };
};
