import React, { useState } from "react";
import type { SalaryInput, SalaryCalculationResult } from "../../types/salary";
import { useSalaryCalculator } from "../../hooks/useSalaryCalculator";
import { Card } from "../common/Card";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { AllowanceInputSection } from "./AllowanceInputSection";
import { OvertimeInputSection } from "./OvertimeInputSection";
import { BonusInputSection } from "./BonusInputSection";
import { CalculationResults } from "./CalculationResults";

interface SalaryInputFormProps {
  onSave?: (input: SalaryInput, result: SalaryCalculationResult, name: string) => void;
}

export const SalaryInputForm: React.FC<SalaryInputFormProps> = ({ onSave }) => {
  const [input, setInput] = useState<SalaryInput>({
    baseSalary: 300000,
    allowances: [],
    expectedOvertimeHours: 20,
    summerBonus: 2.0,
    winterBonus: 2.0,
  });

  const [result, setResult] = useState<SalaryCalculationResult | null>(null);
  const [patternName, setPatternName] = useState("");

  const { calculate } = useSalaryCalculator();

  const handleCalculate = () => {
    const calculationResult = calculate(input);
    setResult(calculationResult);
  };

  const handleSavePattern = () => {
    if (result && onSave) {
      const name = patternName || `パターン${new Date().toLocaleString("ja-JP")}`;
      onSave(input, result, name);
      setPatternName("");
      alert(`パターン「${name}」を保存しました`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左カラム: 入力フォーム */}
        <div className="space-y-6">
          <Card title="基本給">
            <Input
              type="number"
              value={input.baseSalary}
              onChange={(v) => setInput({ ...input, baseSalary: Number(v) })}
              label="月額基本給"
              placeholder="300000"
              suffix="円"
              min={0}
            />
          </Card>

          <AllowanceInputSection
            allowances={input.allowances}
            onChange={(allowances) => setInput({ ...input, allowances })}
          />

          <OvertimeInputSection
            hours={input.expectedOvertimeHours}
            baseSalary={input.baseSalary}
            onChange={(hours) => setInput({ ...input, expectedOvertimeHours: hours })}
          />

          <BonusInputSection
            summerBonus={input.summerBonus}
            winterBonus={input.winterBonus}
            baseSalary={input.baseSalary}
            onChange={(summer, winter) =>
              setInput({ ...input, summerBonus: summer, winterBonus: winter })
            }
          />

          <Button variant="primary" onClick={handleCalculate} className="w-full py-3 text-lg">
            年収を計算
          </Button>
        </div>

        {/* 右カラム: 計算結果 */}
        <div>
          {result ? (
            <div className="space-y-4">
              <CalculationResults result={result} />
              {onSave && (
                <Card title="パターンとして保存">
                  <div className="space-y-3">
                    <Input
                      type="text"
                      value={patternName}
                      onChange={(v) => setPatternName(String(v))}
                      placeholder="パターン名 (例: 現在の条件)"
                      label="パターン名"
                    />
                    <Button variant="secondary" onClick={handleSavePattern} className="w-full">
                      比較用に保存
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          ) : (
            <Card>
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">左側のフォームに入力して</p>
                <p className="text-lg">「年収を計算」ボタンをクリックしてください</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
