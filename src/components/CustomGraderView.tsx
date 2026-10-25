import React, { useState } from 'react';
import { EXAM_QUESTIONS, ExamQuestion } from '../data/examData';
import { evaluateAnswer, EvaluationResult, VisualToken } from '../utils/gradingEngine';
import { AlertCircle, CheckCircle2, ChevronRight, HelpCircle, Play, Sparkles, Terminal } from 'lucide-react';

interface CustomGraderViewProps {
  initialQuestionId?: number;
}

export const CustomGraderView: React.FC<CustomGraderViewProps> = ({ initialQuestionId = 12 }) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(initialQuestionId);
  const [userInput, setUserInput] = useState<string>('folks more gracefully than other contestants.');
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(() => {
    const q = EXAM_QUESTIONS.find(item => item.id === initialQuestionId) || EXAM_QUESTIONS[11];
    return evaluateAnswer(q, 'folks more gracefully than other contestants.');
  });

  const selectedQuestion: ExamQuestion =
    EXAM_QUESTIONS.find(q => q.id === selectedQuestionId) || EXAM_QUESTIONS[0];

  const handleSelectQuestion = (id: number) => {
    setSelectedQuestionId(id);
    const q = EXAM_QUESTIONS.find(item => item.id === id)!;
    // Set default sample answer
    const sample = q.studentHandwrittenAnswer;
    setUserInput(sample);
    setEvalResult(evaluateAnswer(q, sample));
  };

  const handleRunEvaluation = () => {
    const res = evaluateAnswer(selectedQuestion, userInput);
    setEvalResult(res);
  };

  const handlePreset = (type: 'perfect' | 'student_photo' | 'minus_one' | 'minus_two' | 'wrong_structure') => {
    let text = '';
    if (type === 'perfect') {
      text = selectedQuestion.expectedCompletion;
    } else if (type === 'student_photo') {
      text = selectedQuestion.studentHandwrittenAnswer;
    } else if (type === 'minus_one') {
      // Add one wrong word or typo
      text = selectedQuestion.id === 12
        ? 'folks more gracefully than other contestants.'
        : `really ${selectedQuestion.expectedCompletion}`;
    } else if (type === 'minus_two') {
      text = selectedQuestion.id === 12
        ? 'folks very more gracefully than other contestants.'
        : `very clearly ${selectedQuestion.expectedCompletion}`;
    } else if (type === 'wrong_structure') {
      text = 'is the best one of all.';
    }
    setUserInput(text);
    setEvalResult(evaluateAnswer(selectedQuestion, text));
  };

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 uppercase tracking-wider mb-1">
          <Terminal className="w-4 h-4" />
          Bộ Thẩm Định Điểm & Chấm Thử Nghiệm
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Máy Chấm Điểm Viết Lại Câu Theo Thời Gian Thực
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Thử nghiệm thuật toán chấm điểm theo quy định: <strong className="text-slate-900">Đúng dạng câu ít nhất 1.0 điểm</strong>,
          <strong className="text-rose-600"> sai mỗi từ trừ 0.25 điểm</strong>,
          <strong className="text-amber-700"> sai cấu trúc hoặc lạc đề 0 điểm</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Input and Preset Simulator (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
            {/* Question Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                1. Chọn câu cần thẩm định (1 – 12):
              </label>
              <select
                value={selectedQuestionId}
                onChange={e => handleSelectQuestion(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 rounded-lg border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
              >
                {EXAM_QUESTIONS.map(q => (
                  <option key={q.id} value={q.id}>
                    Câu {q.id} ({q.part === 1 ? 'So sánh bằng' : 'Tính từ ➜ Trạng từ'}): {q.originalSentence.slice(0, 60)}...
                  </option>
                ))}
              </select>
            </div>

            {/* Original Sentence Display */}
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-sm">
              <div className="text-xs text-slate-400 font-semibold uppercase mb-1">Đề bài:</div>
              <div className="font-semibold text-slate-900">{selectedQuestion.originalSentence}</div>
              <div className="text-xs text-sky-700 mt-1">Yêu cầu: {selectedQuestion.targetRequirement}</div>
            </div>

            {/* Quick Test Presets */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Các trường hợp mẫu để kiểm tra thuật toán chấm:
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handlePreset('perfect')}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-md border border-emerald-200 transition-colors"
                >
                  Đúng chuẩn 100% (+1.00đ)
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('student_photo')}
                  className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold rounded-md border border-sky-200 transition-colors"
                >
                  Theo bài trong ảnh (Câu {selectedQuestion.id === 12 ? '12: trừ 0.25đ' : 'này: đúng 1đ'})
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('minus_one')}
                  className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-md border border-amber-200 transition-colors"
                >
                  Sai 1 từ (-0.25đ ➜ 0.75đ)
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('minus_two')}
                  className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-semibold rounded-md border border-orange-200 transition-colors"
                >
                  Sai 2 từ (-0.50đ ➜ 0.50đ)
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset('wrong_structure')}
                  className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-semibold rounded-md border border-rose-200 transition-colors"
                >
                  Sai cấu trúc (0.00đ)
                </button>
              </div>
            </div>

            {/* Answer Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-semibold text-slate-700 uppercase tracking-wider">
                  2. Câu trả lời của học sinh:
                </label>
                <span className="text-[11px] text-sky-700 font-medium bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                  Chỉ điền phần còn lại · Không viết lại "{selectedQuestion.givenPrefix.trim()}"
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <span className="px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 whitespace-nowrap shrink-0">
                  → {selectedQuestion.givenPrefix}
                </span>
                <input
                  type="text"
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRunEvaluation()}
                  placeholder="...chỉ điền phần tiếp theo (không viết lại phần đã cho sẵn)"
                  className="flex-1 px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
              <p className="text-xs text-slate-400">
                Gợi ý: Bạn có thể nhập từ ngữ thừa, viết sai chính tả, hoặc thay đổi vị trí từ để xem hệ thống phát hiện lỗi.
              </p>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunEvaluation}
              className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 active:scale-98 text-white text-sm font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              Chấm điểm câu này ngay
            </button>
          </div>
        </div>

        {/* Right Column: Live Results & Mathematical Deduction Proof (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {evalResult && (
            <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Kết quả thẩm định
                </div>
                <div className="text-right">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-extrabold tabular-nums ${
                      evalResult.pointsEarned === 1.0
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : evalResult.pointsEarned > 0
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {evalResult.pointsEarned.toFixed(2)} / 1.00 đ
                  </span>
                </div>
              </div>

              {/* Mathematical Equation Card */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase">
                  Cách tính điểm chi tiết:
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-[10px] text-slate-500 font-sans">Đúng dạng</div>
                    <div className="font-bold text-emerald-600 text-sm mt-0.5">
                      {evalResult.isFormCorrect ? '+1.00 đ' : '0.00 đ'}
                    </div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-[10px] text-slate-500 font-sans">
                      Lỗi từ ({evalResult.errorWordCount} từ)
                    </div>
                    <div className="font-bold text-rose-600 text-sm mt-0.5">
                      -{evalResult.deductions.toFixed(2)} đ
                    </div>
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                    <div className="text-[10px] text-slate-500 font-sans">Điểm câu</div>
                    <div className="font-bold text-sky-700 text-sm mt-0.5">
                      = {evalResult.pointsEarned.toFixed(2)} đ
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Check */}
              <div
                className={`p-3 rounded-lg text-xs leading-relaxed border ${
                  evalResult.isFormCorrect
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-rose-50 text-rose-900 border-rose-200'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  {evalResult.isFormCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                  )}
                  {evalResult.isFormCorrect ? 'Đạt tiêu chuẩn về dạng câu' : 'Chưa đạt dạng câu'}
                </div>
                <div>{evalResult.formFeedback}</div>
              </div>

              {/* Word Tokens Visualizer */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Chi tiết từng từ trong câu:
                </div>
                <div className="flex flex-wrap items-center gap-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-400 font-mono">→ {selectedQuestion.givenPrefix}</span>
                  {evalResult.tokens.map((token: VisualToken, idx: number) => {
                    let style = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                    if (token.status === 'extra') {
                      style = 'bg-rose-100 text-rose-800 border-rose-300 line-through';
                    } else if (token.status === 'wrong') {
                      style = 'bg-rose-100 text-rose-800 border-rose-300';
                    } else if (token.status === 'missing') {
                      style = 'bg-amber-100 text-amber-800 border-amber-300 italic';
                    }
                    return (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 text-xs font-semibold rounded border ${style}`}
                        title={token.note || 'Từ chính xác'}
                      >
                        {token.text}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Error details list */}
              {evalResult.errorDetails.length > 0 && (
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-rose-800">Chi tiết các lỗi bị trừ điểm:</div>
                  {evalResult.errorDetails.map((err, idx) => (
                    <div key={idx} className="text-xs text-rose-700 flex items-start gap-1.5 bg-rose-50/60 p-2 rounded">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>{err}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Standard Answer */}
              <div className="p-3 bg-emerald-50/80 rounded-lg border border-emerald-200 text-xs text-emerald-950">
                <span className="font-bold text-emerald-900">Đáp án chuẩn: </span>
                → {selectedQuestion.fullStandardAnswer}
              </div>

              {/* Grammar explanation */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Nguyên tắc: </span>
                {selectedQuestion.grammarRule.formula}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
