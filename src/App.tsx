import { useState } from "react";
import { SalaryInputForm } from "./components/calculator/SalaryInputForm";
import { ComparisonTable } from "./components/comparison/ComparisonTable";
import { useComparisonPatterns } from "./hooks/useComparisonPatterns";

function App() {
  const [activeTab, setActiveTab] = useState<"calculator" | "comparison">("calculator");
  const { patterns, addPattern, removePattern } = useComparisonPatterns();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">年収計算ツール</h1>
          <p className="text-sm text-gray-600 mt-1">基本給・手当・残業時間から手取り年収を計算</p>
        </div>
      </header>

      {/* タブナビゲーション */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8" aria-label="Tabs">
            <button
              type="button"
              onClick={() => setActiveTab("calculator")}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === "calculator"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              💰 計算
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("comparison")}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors relative
                ${
                  activeTab === "comparison"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }
              `}
            >
              📊 比較
              {patterns.length > 0 && (
                <span className="ml-2 bg-primary-500 text-white text-xs rounded-full px-2 py-0.5">
                  {patterns.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "calculator" && <SalaryInputForm onSave={addPattern} />}
        {activeTab === "comparison" && (
          <ComparisonTable patterns={patterns} onRemove={removePattern} />
        )}
      </main>

      {/* フッター */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            ※ この計算結果はあくまで概算です。実際の税額・社会保険料は個人の状況により異なります。
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
