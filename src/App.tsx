import React, { useState } from 'react';
import { Header, TabKey } from './components/Header';
import { PhotoAuditView } from './components/PhotoAuditView';
import { TestTakingView } from './components/TestTakingView';
import { RandomPracticeView } from './components/RandomPracticeView';
import { CustomGraderView } from './components/CustomGraderView';
import { GrammarHandbookView } from './components/GrammarHandbookView';
import { Award, BookOpen, CheckCircle, Dices, FileSearch, PenTool } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('audit');
  const [sandboxQuestionId, setSandboxQuestionId] = useState<number>(12);

  const handleOpenSandbox = (questionId: number) => {
    setSandboxQuestionId(questionId);
    setActiveTab('sandbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExam = () => {
    setActiveTab('test');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Universal Top Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onStartExam={handleStartExam}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'audit' && (
          <PhotoAuditView
            onTakeTest={handleStartExam}
            onOpenSandbox={handleOpenSandbox}
          />
        )}

        {activeTab === 'random_practice' && (
          <RandomPracticeView />
        )}

        {activeTab === 'test' && (
          <TestTakingView
            onBackToAudit={() => setActiveTab('audit')}
          />
        )}

        {activeTab === 'sandbox' && (
          <CustomGraderView
            initialQuestionId={sandboxQuestionId}
          />
        )}

        {activeTab === 'handbook' && (
          <GrammarHandbookView />
        )}
      </main>

      {/* Clean Domain Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-semibold text-slate-700">EduGrader English</span> · Hệ thống kiểm tra đề thi & chấm điểm viết lại câu thang 10
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab('audit')}
              className="hover:text-slate-900 transition-colors"
            >
              Soi bài trong ảnh
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('test')}
              className="hover:text-slate-900 transition-colors"
            >
              Làm bài thi
            </button>
            <span>·</span>
            <button
              onClick={() => setActiveTab('handbook')}
              className="hover:text-slate-900 transition-colors"
            >
              Quy tắc trừ điểm
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
