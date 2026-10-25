import React from 'react';
import { Award, BookOpen, CheckCircle, FileSearch, PenTool } from 'lucide-react';

export type TabKey = 'audit' | 'random_practice' | 'test' | 'sandbox' | 'handbook';

interface HeaderProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  onStartExam: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onStartExam }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div
            onClick={() => onSelectTab('audit')}
            className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              EN
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                EduGrader Exam
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-500 font-medium">
                · Chấm thi & Luyện câu
              </span>
            </div>
          </div>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('audit')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'audit'
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <FileSearch className="w-4 h-4" />
              Soi bài trong ảnh
            </button>

            <button
              onClick={() => onSelectTab('random_practice')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'random_practice'
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                  : 'hover:text-slate-900 text-sky-700'
              }`}
            >
              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-sky-100 text-sky-800 font-bold uppercase tracking-wider">
                Mới
              </span>
              Luyện ngẫu nhiên
            </button>

            <button
              onClick={() => onSelectTab('test')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'test'
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <PenTool className="w-4 h-4" />
              Làm bài thi thử
            </button>

            <button
              onClick={() => onSelectTab('sandbox')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'sandbox'
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              Chấm câu tự do
            </button>

            <button
              onClick={() => onSelectTab('handbook')}
              className={`flex items-center gap-1.5 py-1 whitespace-nowrap shrink-0 transition-colors ${
                activeTab === 'handbook'
                  ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                  : 'hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Sổ tay ngữ pháp
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onStartExam}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 active:scale-95 transition-all shadow-sm whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              Làm bài thi ngay
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 bg-slate-50 px-2 py-2 text-xs">
        <button
          onClick={() => onSelectTab('audit')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${
            activeTab === 'audit' ? 'text-sky-600 font-bold' : 'text-slate-600'
          }`}
        >
          <FileSearch className="w-4 h-4" />
          <span>Trong ảnh</span>
        </button>
        <button
          onClick={() => onSelectTab('random_practice')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${
            activeTab === 'random_practice' ? 'text-sky-600 font-bold' : 'text-slate-600'
          }`}
        >
          <span className="text-[10px] font-bold">🎲</span>
          <span>Ngẫu nhiên</span>
        </button>
        <button
          onClick={() => onSelectTab('test')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${
            activeTab === 'test' ? 'text-sky-600 font-bold' : 'text-slate-600'
          }`}
        >
          <PenTool className="w-4 h-4" />
          <span>Thi thử</span>
        </button>
        <button
          onClick={() => onSelectTab('sandbox')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${
            activeTab === 'sandbox' ? 'text-sky-600 font-bold' : 'text-slate-600'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Chấm tự do</span>
        </button>
        <button
          onClick={() => onSelectTab('handbook')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 ${
            activeTab === 'handbook' ? 'text-sky-600 font-bold' : 'text-slate-600'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Ngữ pháp</span>
        </button>
      </div>
    </header>
  );
};
