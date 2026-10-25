import React, { useState, useEffect } from 'react';
import { EXAM_QUESTIONS, ExamQuestion } from '../data/examData';
import { calculateExamScore, ExamScoreSummary, VisualToken } from '../utils/gradingEngine';
import { generateRandomExam } from '../utils/randomGenerator';
import { AlertCircle, CheckCircle2, Clock, Dices, HelpCircle, RefreshCw, Sparkles, Trophy, XCircle } from 'lucide-react';

interface TestTakingViewProps {
  onBackToAudit: () => void;
}

type ExamMode = 'random_ten' | 'ten_questions' | 'all_twelve' | 'part_one' | 'part_two';

export const TestTakingView: React.FC<TestTakingViewProps> = ({ onBackToAudit }) => {
  const [mode, setMode] = useState<ExamMode>('random_ten');
  const [randomQuestions, setRandomQuestions] = useState<ExamQuestion[]>(() => generateRandomExam(10, 'all'));
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [results, setResults] = useState<ExamScoreSummary | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Generate fresh random questions
  const handleRegenerateRandom = () => {
    const fresh = generateRandomExam(10, 'all');
    setRandomQuestions(fresh);
    setAnswers({});
    setIsSubmitted(false);
    setResults(null);
    setSecondsElapsed(0);
    setIsTimerRunning(true);
  };

  // Filter questions based on mode
  const currentQuestions: ExamQuestion[] = React.useMemo(() => {
    switch (mode) {
      case 'random_ten':
        return randomQuestions;
      case 'ten_questions':
        // Standard 10 questions from photos for direct 10-point scale: Q1-Q5 and Q7-Q11
        return EXAM_QUESTIONS.filter(q => q.id !== 6 && q.id !== 12);
      case 'all_twelve':
        return EXAM_QUESTIONS;
      case 'part_one':
        return EXAM_QUESTIONS.filter(q => q.part === 1);
      case 'part_two':
        return EXAM_QUESTIONS.filter(q => q.part === 2);
      default:
        return randomQuestions;
    }
  }, [mode, randomQuestions]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !isSubmitted) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = () => {
    const summary = calculateExamScore(currentQuestions, answers);
    setResults(summary);
    setIsSubmitted(true);
    setIsTimerRunning(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFillStudentPhotoAnswers = () => {
    const autoFilled: Record<number, string> = {};
    currentQuestions.forEach(q => {
      autoFilled[q.id] = q.studentHandwrittenAnswer;
    });
    setAnswers(autoFilled);
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
    setResults(null);
    setSecondsElapsed(0);
    setIsTimerRunning(true);
  };

  const answeredCount = currentQuestions.filter(q => answers[q.id]?.trim()).length;

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Mode Selector */}
        <div className="space-y-1.5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span>Chọn chế độ thi:</span>
            {mode === 'random_ten' && (
              <span className="text-sky-600 font-bold normal-case">
                (Đang làm đề ngẫu nhiên mới 10 câu - không giống trong ảnh)
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                setMode('random_ten');
                handleReset();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                mode === 'random_ten'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100'
              }`}
            >
              <Dices className="w-3.5 h-3.5" />
              Đề ngẫu nhiên mới (10 câu)
            </button>
            <button
              onClick={() => {
                setMode('ten_questions');
                handleReset();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'ten_questions'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Đề 10 câu trong ảnh
            </button>
            <button
              onClick={() => {
                setMode('all_twelve');
                handleReset();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'all_twelve'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cả 12 câu trong ảnh
            </button>
            <button
              onClick={() => {
                setMode('part_one');
                handleReset();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'part_one'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Phần 1: So sánh bằng
            </button>
            <button
              onClick={() => {
                setMode('part_two');
                handleReset();
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                mode === 'part_two'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Phần 2: Tính từ ➜ Trạng từ
            </button>

            {mode === 'random_ten' && (
              <button
                onClick={handleRegenerateRandom}
                className="ml-1 px-2.5 py-1.5 text-xs font-bold text-sky-700 bg-sky-100 hover:bg-sky-200 rounded-lg flex items-center gap-1 transition-colors"
                title="Sinh ngay 10 câu ngẫu nhiên mới tinh"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Đổi 10 câu ngẫu nhiên khác
              </button>
            )}
          </div>
        </div>

        {/* Status Metrics */}
        <div className="flex items-center gap-4 shrink-0 text-sm">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Clock className="w-4 h-4 text-sky-600" />
            <span className="font-mono tabular-nums">{formatTime(secondsElapsed)}</span>
          </div>

          <div className="text-slate-500">
            Tiến độ:{' '}
            <span className="font-bold text-slate-900 tabular-nums">
              {answeredCount}/{currentQuestions.length}
            </span>
          </div>

          {!isSubmitted && (
            <button
              onClick={handleFillStudentPhotoAnswers}
              className="text-xs text-sky-700 hover:text-sky-900 font-medium underline"
              title="Điền nội dung giống như bạn học sinh trong hình chụp"
            >
              Điền thử bài trong ảnh
            </button>
          )}
        </div>
      </div>

      {/* Results Banner if Submitted */}
      {isSubmitted && results && (
        <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-sky-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                <Trophy className="w-3.5 h-3.5" />
                Kết quả bài thi đã được chấm tự động
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Điểm tổng kết: {results.scaledScore10} / 10.0
              </h2>
              <p className="text-sm text-slate-300 max-w-2xl">
                {results.overallFeedback}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 flex items-center gap-6 shrink-0">
              <div>
                <div className="text-xs text-sky-200">Xếp loại</div>
                <div className="text-lg font-bold text-white">{results.rating}</div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Thời gian: {formatTime(secondsElapsed)}
                </div>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-xs space-y-1">
                <div className="text-emerald-300">
                  Đúng tuyệt đối: <span className="font-bold tabular-nums">{results.perfectCount}</span>
                </div>
                <div className="text-amber-300">
                  Bị trừ từ: <span className="font-bold tabular-nums">{results.partialCount}</span>
                </div>
                <div className="text-rose-300">
                  Sai hoàn toàn: <span className="font-bold tabular-nums">{results.zeroCount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-xs text-slate-300">
              Quy tắc chấm: Dạng đúng được 1đ, mỗi từ sai hoặc thừa trừ 0.25đ, sai cấu trúc 0đ.
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Làm lại bài thi
            </button>
          </div>
        </div>
      )}

      {/* Questions Form List */}
      <div className="space-y-4">
        {currentQuestions.map((q, idx) => {
          const evalResult = isSubmitted && results
            ? results.detailedResults.find(r => r.questionId === q.id)
            : null;

          return (
            <div
              key={q.id}
              className={`bg-white rounded-xl border p-5 sm:p-6 transition-all ${
                evalResult
                  ? evalResult.status === 'perfect'
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : evalResult.status === 'partial'
                    ? 'border-amber-300 bg-amber-50/20'
                    : 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 shadow-sm'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="text-xs text-slate-500 font-medium">
                    {q.partTitle} · {q.targetRequirement}
                  </div>
                </div>

                {/* Score Pill when graded */}
                {evalResult && (
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold tabular-nums ${
                        evalResult.status === 'perfect'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : evalResult.status === 'partial'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {evalResult.pointsEarned.toFixed(2)} / 1.00 đ
                    </span>
                  </div>
                )}
              </div>

              {/* Original sentence prompt */}
              <div className="text-base font-semibold text-slate-900 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                {q.originalSentence}
              </div>

              {/* Input Area */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-700">
                    Viết tiếp câu trả lời:
                  </label>
                  <span className="text-[11px] text-sky-700 font-medium bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                    Chỉ điền phần còn lại · Không viết lại "{q.givenPrefix.trim()}"
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 whitespace-nowrap shrink-0">
                    → {q.givenPrefix}
                  </div>
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={answers[q.id] || ''}
                    onChange={e => handleInputChange(q.id, e.target.value)}
                    placeholder="...chỉ điền phần tiếp theo (không viết lại phần đã cho sẵn)"
                    className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm font-medium disabled:bg-slate-100 disabled:text-slate-800"
                  />
                </div>
              </div>

              {/* Detailed Evaluation Feedback after submit */}
              {evalResult && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                  {/* Word-by-word visual token tags */}
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                      Phân tích từng từ trong câu bạn làm:
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 p-3 bg-white rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 font-medium">→ {q.givenPrefix}</span>
                      {evalResult.tokens.map((token: VisualToken, tIdx: number) => {
                        let badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-300';
                        if (token.status === 'extra') {
                          badgeStyle = 'bg-rose-100 text-rose-800 border-rose-300 line-through';
                        } else if (token.status === 'wrong') {
                          badgeStyle = 'bg-rose-100 text-rose-800 border-rose-300';
                        } else if (token.status === 'missing') {
                          badgeStyle = 'bg-amber-100 text-amber-800 border-amber-300 italic';
                        }
                        return (
                          <span
                            key={tIdx}
                            className={`px-2 py-0.5 text-xs font-medium rounded border ${badgeStyle}`}
                            title={token.note || 'Từ đúng'}
                          >
                            {token.text}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Deduction breakdown */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-slate-50 p-2.5 rounded-lg text-slate-700 gap-2">
                    <div>
                      <span className="font-semibold">Đánh giá dạng:</span> {evalResult.formFeedback}
                    </div>
                    <div>
                      {evalResult.errorWordCount > 0 ? (
                        <span className="text-rose-600 font-semibold">
                          Trừ {evalResult.errorWordCount} từ lỗi × 0.25đ = -{evalResult.deductions.toFixed(2)}đ
                        </span>
                      ) : (
                        <span className="text-emerald-600 font-semibold">
                          Không có lỗi từ (Trọn vẹn 1.0đ)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Errors list if any */}
                  {evalResult.errorDetails.length > 0 && (
                    <div className="space-y-1">
                      {evalResult.errorDetails.map((err, eIdx) => (
                        <div key={eIdx} className="text-xs text-rose-700 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{err}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Standard Answer */}
                  <div className="text-xs bg-emerald-50 text-emerald-950 p-3 rounded-lg border border-emerald-200">
                    <span className="font-bold text-emerald-800">Đáp án chuẩn: </span>
                    → {q.fullStandardAnswer}
                  </div>

                  {/* Explanation */}
                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-800">Giải thích ngữ pháp: </span>
                    {q.grammarRule.explanation}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      <div className="sticky bottom-4 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 p-4 shadow-lg flex items-center justify-between gap-4">
        <div className="text-xs text-slate-600">
          Đã điền <span className="font-bold text-slate-900">{answeredCount}</span> / {currentQuestions.length} câu.
          {!isSubmitted && answeredCount < currentQuestions.length && (
            <span className="text-amber-600 ml-1">(Chưa hoàn thành hết các câu)</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isSubmitted ? (
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all"
            >
              Làm lại bài thi
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              Nộp bài & Chấm điểm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
