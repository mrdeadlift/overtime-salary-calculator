import React from "react";
import { Card } from "../common/Card";
import { Input } from "../common/Input";
import { useSalaryCalculator } from "../../hooks/useSalaryCalculator";
import { formatCurrency } from "../../utils/formatters";

interface OvertimeInputSectionProps {
  hours: number;
  baseSalary: number;
  onChange: (hours: number) => void;
}

export const OvertimeInputSection: React.FC<OvertimeInputSectionProps> = ({
  hours,
  baseSalary,
  onChange,
}) => {
  const { calculateHourlyRate, calculateMonthlyOvertimePay } = useSalaryCalculator();

  const hourlyRate = baseSalary > 0 ? calculateHourlyRate(baseSalary) : 0;
  const monthlyOvertimePay = baseSalary > 0 ? calculateMonthlyOvertimePay(hourlyRate, hours) : 0;

  return (
    <Card title="残業時間">
      <div className="space-y-3">
        <Input
          type="number"
          value={hours}
          onChange={(v) => onChange(Number(v))}
          label="月間見込み残業時間"
          placeholder="20"
          suffix="時間/月"
          min={0}
        />
        {baseSalary > 0 && (
          <div className="bg-blue-50 p-3 rounded space-y-1">
            <p className="text-sm text-gray-700">
              時給(基本給ベース):{" "}
              <span className="font-semibold">{formatCurrency(hourlyRate)}</span>
            </p>
            <p className="text-sm text-gray-700">
              月額残業代(割増率1.25倍):{" "}
              <span className="font-semibold text-blue-600">
                {formatCurrency(monthlyOvertimePay)}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-2">※ 法定労働時間173.8時間/月で計算</p>
          </div>
        )}
      </div>
    </Card>
  );
};
