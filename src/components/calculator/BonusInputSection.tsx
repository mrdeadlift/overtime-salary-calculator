import type React from "react";
import { formatCurrency } from "../../utils/formatters";
import { Card } from "../common/Card";
import { Input } from "../common/Input";

interface BonusInputSectionProps {
  summerBonus: number;
  winterBonus: number;
  baseSalary: number;
  onChange: (summer: number, winter: number) => void;
}

export const BonusInputSection: React.FC<BonusInputSectionProps> = ({
  summerBonus,
  winterBonus,
  baseSalary,
  onChange,
}) => {
  const totalBonus = baseSalary * (summerBonus + winterBonus);

  return (
    <Card title="賞与">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            value={summerBonus}
            onChange={(v) => onChange(Number(v), winterBonus)}
            label="夏季賞与"
            placeholder="2.0"
            suffix="ヶ月分"
            min={0}
            step={0.1}
          />
          <Input
            type="number"
            value={winterBonus}
            onChange={(v) => onChange(summerBonus, Number(v))}
            label="冬季賞与"
            placeholder="2.0"
            suffix="ヶ月分"
            min={0}
            step={0.1}
          />
        </div>
        {baseSalary > 0 && (
          <div className="bg-green-50 p-3 rounded">
            <p className="text-sm text-gray-700">
              年間賞与総額(基本給ベース):{" "}
              <span className="font-bold text-green-600">{formatCurrency(totalBonus)}</span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              ※ 基本給{formatCurrency(baseSalary)} × {summerBonus + winterBonus}ヶ月分
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
