import React from "react";
import type { Allowance } from "../../types/salary";
import { Card } from "../common/Card";
import { Input } from "../common/Input";
import { Button } from "../common/Button";

interface AllowanceInputSectionProps {
  allowances: Allowance[];
  onChange: (allowances: Allowance[]) => void;
}

export const AllowanceInputSection: React.FC<AllowanceInputSectionProps> = ({
  allowances,
  onChange,
}) => {
  const addAllowance = () => {
    const newAllowance: Allowance = {
      id: crypto.randomUUID(),
      name: "",
      amount: 0,
      isTaxable: true,
    };
    onChange([...allowances, newAllowance]);
  };

  const removeAllowance = (id: string) => {
    onChange(allowances.filter((a) => a.id !== id));
  };

  const updateAllowance = (
    id: string,
    field: keyof Allowance,
    value: string | number | boolean,
  ) => {
    onChange(
      allowances.map((a) =>
        a.id === id
          ? {
              ...a,
              [field]: value,
            }
          : a,
      ),
    );
  };

  const totalAllowance = allowances.reduce((sum, a) => sum + a.amount, 0);

  return (
    <Card title="各種手当">
      <div className="space-y-4">
        {allowances.map((allowance) => (
          <div key={allowance.id} className="flex gap-2 items-start bg-gray-50 p-3 rounded">
            <div className="flex-1">
              <Input
                type="text"
                value={allowance.name}
                onChange={(v) => updateAllowance(allowance.id, "name", v)}
                placeholder="手当名 (例: 住宅手当)"
              />
            </div>
            <div className="w-40">
              <Input
                type="number"
                value={allowance.amount}
                onChange={(v) => updateAllowance(allowance.id, "amount", v)}
                placeholder="金額"
                suffix="円"
                min={0}
              />
            </div>
            <Button variant="danger" size="sm" onClick={() => removeAllowance(allowance.id)}>
              削除
            </Button>
          </div>
        ))}
        <Button variant="secondary" onClick={addAllowance} className="w-full">
          + 手当を追加
        </Button>
        {allowances.length > 0 && (
          <div className="text-right text-gray-700 font-semibold pt-2 border-t">
            手当合計: ¥{totalAllowance.toLocaleString("ja-JP")}
          </div>
        )}
      </div>
    </Card>
  );
};
