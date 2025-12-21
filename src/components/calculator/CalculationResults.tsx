import React from 'react';
import type { SalaryCalculationResult } from '../../types/salary';
import { formatCurrency } from '../../utils/formatters';
import { Card } from '../common/Card';

interface CalculationResultsProps {
  result: SalaryCalculationResult;
}

export const CalculationResults: React.FC<CalculationResultsProps> = ({ result }) => {
  const takeHomeRate = (result.annualNetSalary / (result.annualGrossSalary + result.annualBonus)) * 100;

  return (
    <div className="space-y-4">
      {/* 年間手取り額(大きく強調) */}
      <Card title="年間手取り額" className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
        <p className="text-5xl font-bold text-blue-600 mb-2">{formatCurrency(result.annualNetSalary)}</p>
        <p className="text-lg text-gray-700">月額概算: {formatCurrency(result.monthlyNetSalary)}</p>
        <p className="text-sm text-gray-600 mt-2">手取り率: {takeHomeRate.toFixed(1)}%</p>
      </Card>

      {/* 年間総支給額 */}
      <Card title="年間総支給額">
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">基本給与(12ヶ月分)</span>
            <span className="font-semibold">{formatCurrency(result.annualGrossSalary)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">賞与</span>
            <span className="font-semibold">{formatCurrency(result.annualBonus)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">残業代(12ヶ月分)</span>
            <span className="font-semibold">{formatCurrency(result.annualOvertimePay)}</span>
          </div>
          <div className="flex justify-between items-center py-2 bg-gray-50 px-2 rounded">
            <span className="font-bold text-gray-900">総支給額</span>
            <span className="font-bold text-xl text-gray-900">
              {formatCurrency(result.annualGrossSalary + result.annualBonus)}
            </span>
          </div>
        </div>
      </Card>

      {/* 年間控除額 */}
      <Card title="年間控除額">
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">所得税</span>
            <span className="font-semibold text-red-600">{formatCurrency(result.annualIncomeTax)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">住民税</span>
            <span className="font-semibold text-red-600">{formatCurrency(result.annualResidentTax)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">社会保険料</span>
            <span className="font-semibold text-red-600">{formatCurrency(result.annualSocialInsurance)}</span>
          </div>
          <div className="flex justify-between items-center py-2 bg-red-50 px-2 rounded">
            <span className="font-bold text-gray-900">控除合計</span>
            <span className="font-bold text-xl text-red-600">{formatCurrency(result.totalDeductions)}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
