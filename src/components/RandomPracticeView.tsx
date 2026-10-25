import React, { useState } from 'react';
import { ExamQuestion } from '../data/examData';
import { generateRandomExam } from '../utils/randomGenerator';
import { evaluateAnswer, EvaluationResult, VisualToken } from '../utils/gradingEngine';
import { AlertCircle, CheckCircle2, ChevronRight, Dices, HelpCircle, RefreshCw, Sparkles, Trophy } from 'lucide-react';

export const RandomPracticeView: React.FC = () => {
  const [topic, setTopic] = useState<'all' | 'part1' | 'part2'>('all');
  const [currentQuestion, setCurrentQuestion] = useState<ExamQuestion>(() => {
    return generateRandomExam(1, 'all')[0];
  });
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [evalResult, setEvalResult] = useState<EvaluationResult | null>(null);
  const [practiceStats, setPracticeStats] = useState<{
    totalAttempted: number;
    perfectCount: number;
    totalPoints: number;
  }>({
    totalAttempted: 0,
    perfectCount: 0,
    totalPoints: 0
  });

  const handleNextQuestion = () => {
    const nextQ = generateRandomExam(1, topic)[0];
    setCurrentQuestion(nextQ);
    setUserAnswer('');
    setEvalResult(null);
  };

  const handleTopicChange = (newTopic: 'all' | 'part1' | 'part2') => {
    setTopic(newTopic);
    const nextQ = generateRandomExam(1, newTopic)[0];
    setCurrentQuestion(nextQ);
    setUserAnswer('');
    setEvalResult(null);
  };

  const handleCheckAnswer = () => {
    if (!userAnswer.trim()) return;
    const res = evaluateAnswer(currentQuestion, userAnswer);
    setEvalResult(res);

    setPracticeStats(prev => ({
      totalAttempted: prev.totalAttempted + 1,
      perfectCount: res.status === 'perfect' ? prev.perfectCount + 1 : prev.perfectCount,
      totalPoints: Math.round((prev.totalPoints + res.pointsEarned) * 100) / 100
    }));
  };

  const averageScore = practiceStats.totalAttempted > 0
    ? (practiceStats.totalPoints / practiceStats.totalAttempted * 10).toFixed(1)
    : '10.0';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-sky-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded border border-sky-800">
              <Dices className="w-3.5 h-3.5" />
              Chế Độ Luyện Câu Ngẫu Nhiên Mới (Không Trùng Trong Ảnh)
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Luyện Tập Từng Câu Tự Động & Chấm Điểm Chuẩn Thang 10
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Mỗi câu được sinh ngẫu nhiên hoàn toàn. Quy chế chấm thi: Đúng dạng <strong className="text-emerald-400">1.0 điểm</strong>,
              sai mỗi từ trừ <strong className="text-rose-400">0.25 điểm</strong>, sai cấu trúc <strong className="text-amber-300">0 điểm</strong>.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/15 flex items-center gap-4 shrink-0 text-center text-xs">
            <div>
              <div className="text-slate-300">Đã luyện</div>
              <div className="text-xl font-bold text-white tabular-nums">{practiceStats.totalAttempted}</div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <div className="text-slate-300">Điểm TB (thang 10)</div>
              <div className="text-xl font-bold text-emerald-400 tabular-nums">{averageScore}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter / Generator Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Chuyên đề:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleTopicChange('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                topic === 'all'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Hỗn hợp tất cả
            </button>
            <button
              onClick={() => handleTopicChange('part1')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                topic === 'part1'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              So sánh bằng (Not as... as)
            </button>
            <button
              onClick={() => handleTopicChange('part2')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                topic === 'part2'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tính từ ➜ Trạng từ (Adj ➜ Adv)
            </button>
          </div>
        </div>

        <button
          onClick={handleNextQuestion}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors self-end sm:self-auto"
        >
          <Dices className="w-4 h-4 text-sky-600" />
          Đổi câu ngẫu nhiên khác
        </button>
      </div>

      {/* Main Interactive Practice Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Question Topic Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-sky-600 uppercase tracking-wide">
              {currentQuestion.partTitle}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Yêu cầu: {currentQuestion.targetRequirement}
            </div>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-medium">
            Điểm tối đa: 1.00 đ
          </span>
        </div>

        {/* Original Sentence */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Đề bài gốc:
          </div>
          <div className="p-4 bg-slate-50 rounded-xl text-base sm:text-lg font-semibold text-slate-900 border border-slate-200">
            {currentQuestion.originalSentence}
          </div>
        </div>

        {/* Input Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-700 uppercase tracking-wider">
              Viết tiếp câu trả lời:
            </label>
            <span className="text-[11px] text-sky-700 font-medium bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              Chỉ điền phần còn lại · Không viết lại "{currentQuestion.givenPrefix.trim()}"
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <span className="px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 whitespace-nowrap shrink-0">
              → {currentQuestion.givenPrefix}
            </span>
            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCheckAnswer()}
              placeholder="...chỉ điền phần tiếp theo (không viết lại phần đã cho sẵn)"
              className="flex-1 px-4 py-3 text-sm font-medium border border-slate-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit / Check Button */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCheckAnswer}
            disabled={!userAnswer.trim()}
            className="flex-1 sm:flex-initial px-6 py-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-all"
          >
            Kiểm tra & Chấm điểm
          </button>

          {evalResult && (
            <button
              onClick={handleNextQuestion}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Câu tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Evaluation Output if graded */}
        {evalResult && (
          <div className="pt-6 border-t border-slate-100 space-y-4">
            {/* Score pill & result summary */}
            <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <div className="text-xs text-slate-500 font-medium">Kết quả câu ngẫu nhiên:</div>
                <div className="text-lg font-bold text-slate-900 flex items-center gap-2 mt-0.5">
                  {evalResult.pointsEarned === 1.0 ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-5 h-5" /> Đúng tuyệt đối (+1.00 đ)
                    </span>
                  ) : evalResult.pointsEarned > 0 ? (
                    <span className="text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-5 h-5" /> Bị trừ từ ({evalResult.pointsEarned.toFixed(2)} / 1.00 đ)
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-5 h-5" /> Sai cấu trúc (0.00 đ)
                    </span>
                  )}
                </div>
              </div>

              {/* Formula deduction box */}
              <div className="text-right text-xs font-mono">
                <div className="text-slate-500 font-sans">Quy tắc trừ điểm:</div>
                <div className="font-bold text-slate-800 mt-0.5">
                  1.00đ - ({evalResult.errorWordCount} từ lỗi × 0.25) = <span className="text-sky-700 text-sm">{evalResult.pointsEarned.toFixed(2)}đ</span>
                </div>
              </div>
            </div>

            {/* Word by word token diff */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                Phân tích từng từ trong câu của bạn:
              </div>
              <div className="flex flex-wrap items-center gap-1.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-400 font-mono">→ {currentQuestion.givenPrefix}</span>
                {evalResult.tokens.map((token: VisualToken, tIdx: number) => {
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
                      key={tIdx}
                      className={`px-2 py-0.5 text-xs font-medium rounded border ${style}`}
                      title={token.note || 'Từ chính xác'}
                    >
                      {token.text}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Detailed errors list */}
            {evalResult.errorDetails.length > 0 && (
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-800 space-y-1">
                <div className="font-bold">Các chỗ bị trừ điểm (-0.25đ mỗi lỗi):</div>
                {evalResult.errorDetails.map((err, eIdx) => (
                  <div key={eIdx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{err}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Standard Answer */}
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
              <span className="font-bold text-emerald-800">Đáp án chuẩn: </span>
              → {currentQuestion.fullStandardAnswer}
            </div>

            {/* Grammar Formula */}
            <div className="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-xs text-sky-950 space-y-1">
              <div className="font-bold text-sky-800">Công thức áp dụng:</div>
              <div className="font-mono text-sky-900 bg-white/70 p-2 rounded border border-sky-100">
                {currentQuestion.grammarRule.formula}
              </div>
              <p className="text-slate-600 mt-1">{currentQuestion.grammarRule.explanation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
