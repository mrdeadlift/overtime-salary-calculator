# 年収計算ツール

基本給、手当、見込み残業時間から年収と手取り額を計算するWebアプリケーションです。

## 機能

### 1. 年収計算
- 基本給(月額)の入力
- 各種手当の追加・管理
- 見込み残業時間の入力(時給と残業代を自動計算)
- 賞与(夏季・冬季)の入力

### 2. 税金・社会保険料の概算
- 所得税の計算(累進課税対応)
- 住民税の計算
- 社会保険料の計算
  - 健康保険料
  - 介護保険料(40歳以上)
  - 厚生年金保険料
  - 雇用保険料

### 3. 手取り年収の表示
- 年間手取り額
- 月額手取り概算
- 手取り率

### 4. 複数パターンの比較
- 異なる条件での年収を並べて比較
- 最大4パターンまで保存可能

## 技術スタック

- **React 18** - UIライブラリ
- **TypeScript** - 型安全性
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - ユーティリティファーストCSS

## セットアップ

### 必要要件
- Node.js 18以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 使い方

### 1. 年収計算
1. 「計算」タブを選択
2. 基本給を入力(月額)
3. 必要に応じて手当を追加
4. 月間見込み残業時間を入力
5. 賞与の倍数を入力(デフォルト: 夏季2.0ヶ月、冬季2.0ヶ月)
6. 「年収を計算」ボタンをクリック

### 2. パターンの保存と比較
1. 計算結果が表示されたら、パターン名を入力
2. 「比較用に保存」ボタンをクリック
3. 「比較」タブに移動して、保存したパターンを確認

## 計算式

### 年収計算
```
時給 = 基本給 ÷ 173.8時間
月額残業代 = 時給 × 1.25 × 残業時間
月額総支給額 = 基本給 + 手当合計 + 月額残業代
年間基本給与 = 月額総支給額 × 12
年間賞与 = 基本給 × (夏季倍数 + 冬季倍数)
年間総支給額 = 年間基本給与 + 年間賞与
```

### 税金・社会保険料計算
```
社会保険料 = (月額総支給額 × 12 + 年間賞与) × 保険料率合計
  - 健康保険: 5% (労働者負担分)
  - 介護保険: 0.9% (40歳以上)
  - 厚生年金: 9.15% (労働者負担分)
  - 雇用保険: 0.6%

給与所得控除 = 年収に応じた控除額(最大195万円)
課税所得 = 年収 - 給与所得控除 - 社会保険料 - 基礎控除(48万円)
所得税 = 課税所得 × 税率 - 控除額(累進課税)
住民税 = 課税所得 × 10% + 5,000円

年間手取り = 年間総支給額 - 所得税 - 住民税 - 社会保険料
```

## 注意事項

※ この計算結果はあくまで概算です。実際の税額・社会保険料は以下の要因により異なる場合があります:

- 扶養家族の有無
- 各種控除(住宅ローン控除、医療費控除など)
- 正確な社会保険料率(企業や地域により異なる)
- その他の所得

詳しくは税理士や社会保険労務士にご相談ください。

## ライセンス

MIT

## 開発

### プロジェクト構成

```
src/
├── components/
│   ├── common/          # 共通UIコンポーネント
│   ├── calculator/      # 計算機能コンポーネント
│   └── comparison/      # 比較機能コンポーネント
├── hooks/               # カスタムフック
│   ├── useSalaryCalculator.ts
│   ├── useTaxCalculator.ts
│   ├── useInsuranceCalculator.ts
│   └── useComparisonPatterns.ts
├── types/               # TypeScript型定義
├── utils/               # ユーティリティ関数
├── App.tsx
└── main.tsx
```

### 主要な型定義

```typescript
interface SalaryInput {
  baseSalary: number;              // 基本給(月額)
  allowances: Allowance[];         // 各種手当
  expectedOvertimeHours: number;   // 見込み残業時間(月)
  summerBonus: number;             // 夏季賞与(月給の倍数)
  winterBonus: number;             // 冬季賞与(月給の倍数)
}

interface SalaryCalculationResult {
  monthlyGrossSalary: number;      // 月額総支給額
  annualGrossSalary: number;       // 年間総支給額
  annualBonus: number;             // 年間賞与総額
  annualOvertimePay: number;       // 年間残業代総額
  annualIncomeTax: number;         // 年間所得税
  annualResidentTax: number;       // 年間住民税
  annualSocialInsurance: number;   // 年間社会保険料
  totalDeductions: number;         // 年間控除総額
  annualNetSalary: number;         // 年間手取り額
  monthlyNetSalary: number;        // 月額手取り概算
}
```

## 貢献

プルリクエストを歓迎します。大きな変更の場合は、まずissueを開いて変更内容を議論してください。
