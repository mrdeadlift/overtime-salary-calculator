import React from "react";
import type { ComparisonPattern } from "../../types/comparison";
import { formatCurrency } from "../../utils/formatters";
import { Card } from "../common/Card";
import { Button } from "../common/Button";

interface ComparisonTableProps {
  patterns: ComparisonPattern[];
  onRemove: (id: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ patterns, onRemove }) => {
  if (patterns.length === 0) {
    return (
      <Card>
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">比較するパターンがありません</p>
          <p className="text-sm">「計算」タブで条件を入力し、パターンを保存してください</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title={`パターン比較 (${patterns.length}件)`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                項目
              </th>
              {patterns.map((pattern) => (
                <th
                  key={pattern.id}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {pattern.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">基本給</td>
              {patterns.map((pattern) => (
                <td key={pattern.id} className="px-4 py-3">
                  {formatCurrency(pattern.input.baseSalary)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-900">手当合計</td>
              {patterns.map((pattern) => (
                <td key={pattern.id} className="px-4 py-3">
                  {formatCurrency(pattern.input.allowances.reduce((sum, a) => sum + a.amount, 0))}
                </td>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">残業時間</td>
              {patterns.map((pattern) => (
                <td key={pattern.id} className="px-4 py-3">
                  {pattern.input.expectedOvertimeHours}時間/月
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-900">賞与</td>
              {patterns.map((pattern) => (
                <td key={pattern.id} className="px-4 py-3">
                  {pattern.input.summerBonus + pattern.input.winterBonus}ヶ月分
                </td>
              ))}
            </tr>
            <tr className="bg-blue-50 border-t-2 border-blue-200">
              <td className="px-4 py-4 font-bold text-gray-900">年間総支給額</td>
              {patterns.map((pattern) => (
                <td key={pattern.id} className="px-4 py-4 font-bold text-blue-600">
                  {formatCurrency(pattern.result.annualGrossSalary + pattern.result.annualBonus)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-900">年間控除額</td>
              {patterns.map((pattern) => (
                <td key={pattern.id} className="px-4 py-3 text-red-600">
                  {formatCurrency(pattern.result.totalDeductions)}
                </td>
              ))}
            </tr>
            <tr className="bg-green-50 border-t-2 border-green-200">
              <td className="px-4 py-4 font-bold text-gray-900 text-lg">年間手取り額</td>
              {patterns.map((pattern) => (
                <td key={pattern.id} className="px-4 py-4 font-bold text-green-600 text-lg">
                  {formatCurrency(pattern.result.annualNetSalary)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-3 font-medium text-gray-900">月額手取り</td>
              {patterns.map((pattern) => (
                <td key={pattern.id} className="px-4 py-3">
                  {formatCurrency(pattern.result.monthlyNetSalary)}
                </td>
              ))}
            </tr>
            <tr className="bg-gray-100">
              <td className="px-4 py-3 font-medium text-gray-900">操作</td>
              {patterns.map((pattern) => (
                <td key={pattern.id} className="px-4 py-3">
                  <Button variant="danger" size="sm" onClick={() => onRemove(pattern.id)}>
                    削除
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};
