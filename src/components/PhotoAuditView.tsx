import React, { useState } from 'react';
import { EXAM_QUESTIONS, STUDENT_EXAM_SUMMARY, ExamQuestion } from '../data/examData';
import { AlertCircle, CheckCircle2, ChevronRight, Eye, HelpCircle, Info, Sparkles, ZoomIn } from 'lucide-react';

interface PhotoAuditViewProps {
  onTakeTest: () => void;
  onOpenSandbox: (questionId: number) => void;
}

export const PhotoAuditView: React.FC<PhotoAuditViewProps> = ({ onTakeTest, onOpenSandbox }) => {
  const [activePhoto, setActivePhoto] = useState<1 | 2>(1);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(12); // Default to Q12 so user immediately sees the detected error!
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const selectedQuestion = EXAM_QUESTIONS.find(q => q.id === selectedQuestionId) || EXAM_QUESTIONS[11];
  const questionsInCurrentPhoto = EXAM_QUESTIONS.filter(q => q.imagePage === activePhoto);

  return (
    <div className="space-y-8">
      {/* Hero Banner with Executive Audit Summary */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-sky-900/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-sky-400 bg-sky-950/80 px-3 py-1 rounded-md border border-sky-800">
              <Sparkles className="w-3.5 h-3.5" />
              Kết quả thẩm định bài thi trong ảnh thực tế
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Phân Tích & Chấm Điểm Bài Thi Viết Lại Câu
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Áp dụng chuẩn chấm thi GD: Đúng cấu trúc được <span className="text-emerald-400 font-semibold">1.0 điểm</span>,
              sai mỗi từ trừ <span className="text-rose-400 font-semibold">0.25 điểm</span>, sai toàn bộ được <span className="text-amber-400 font-semibold">0 điểm</span>.
              Tổng điểm quy đổi về <span className="text-sky-300 font-semibold">thang điểm 10</span>.
            </p>
          </div>

          {/* Score Card Callout */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/15 flex items-center gap-6 shrink-0">
            <div>
              <div className="text-xs text-sky-200 font-medium">Tổng điểm bài thi</div>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-4xl font-extrabold text-white tracking-tight tabular-nums">
                  {STUDENT_EXAM_SUMMARY.scaledScore}
                </span>
                <span className="text-lg text-sky-200 font-medium">/ 10.0</span>
              </div>
              <div className="text-xs text-slate-300 mt-1">
                Điểm thô: <span className="font-semibold text-white tabular-nums">{STUDENT_EXAM_SUMMARY.earnedRawPoints}</span> / {STUDENT_EXAM_SUMMARY.maxRawPoints}đ
              </div>
            </div>

            <div className="h-12 w-px bg-white/20" />

            <div>
              <div className="text-xs text-sky-200 font-medium">Xếp loại</div>
              <div className="inline-block mt-1 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-sm font-bold border border-emerald-500/30">
                {STUDENT_EXAM_SUMMARY.letterGrade}
              </div>
              <div className="text-xs text-rose-300 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>Phát hiện 01 lỗi sai (Câu 12)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Findings Strip */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">11 câu đạt điểm tối đa (1.0đ):</span>
              <p className="text-slate-300 mt-0.5">Nắm rất vững mẫu câu so sánh bằng phủ định (not as/so... as) và chuyển tính từ sang trạng từ.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Câu 12 phát hiện lỗi sai (-0.25đ):</span>
              <p className="text-slate-300 mt-0.5">Thừa từ <code className="bg-rose-900/60 px-1 py-0.5 rounded text-rose-200">folks</code> làm biến đổi ngữ pháp không chuẩn.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Lưu ý chữ viết ở câu 4:</span>
              <p className="text-slate-300 mt-0.5">Học sinh dùng ký hiệu mũ (^) để bổ sung kịp thời tân ngữ "a horse" trước khi nộp bài.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Photo View & Switcher (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-4 h-4 text-sky-600" />
                Ảnh chụp bài thi gốc của học sinh
              </div>
              <button
                onClick={() => setIsImageZoomed(!isImageZoomed)}
                className="text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1 transition-colors"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                {isImageZoomed ? 'Thu nhỏ' : 'Phóng to'}
              </button>
            </div>

            {/* Photo Tab Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg mb-3">
              <button
                onClick={() => {
                  setActivePhoto(1);
                  setSelectedQuestionId(1);
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-md transition-all ${
                  activePhoto === 1
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ảnh 1: Câu 1 – 6 (Not as... as)
              </button>
              <button
                onClick={() => {
                  setActivePhoto(2);
                  setSelectedQuestionId(12);
                }}
                className={`py-2 px-3 text-xs font-semibold rounded-md transition-all relative ${
                  activePhoto === 2
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ảnh 2: Câu 7 – 12 (Adj → Adv)
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" title="Có câu bị trừ điểm" />
              </button>
            </div>

            {/* Image Container */}
            <div
              className={`relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 flex items-center justify-center transition-all ${
                isImageZoomed ? 'h-[640px]' : 'h-[440px]'
              }`}
            >
              <img
                src={
                  activePhoto === 1
                    ? '/assets/aistudio/1792835210312_706890774353951918_g1474643848733071383_9e225e09204785d0333727781a925b74_74a95d9e.jpg'
                    : '/assets/aistudio/1792835210533_706890774353951918_g1474643848733071383_a5d10b0313c97252101422906844cbab_d793fc87.jpg'
                }
                alt={`Ảnh chụp bài thi phần ${activePhoto}`}
                className="w-full h-full object-contain cursor-zoom-in"
                onClick={() => setIsImageZoomed(!isImageZoomed)}
              />

              <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm text-[11px] text-white px-2.5 py-1 rounded">
                Trang {activePhoto}/2 · Bấm vào ảnh để phóng to/thu nhỏ
              </div>
            </div>

            {/* Questions Quick List inside current photo */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                Danh sách câu trong trang này (chọn câu để xem chi tiết chấm điểm)
              </div>
              <div className="grid grid-cols-6 gap-1.5">
                {questionsInCurrentPhoto.map(q => {
                  const isSelected = q.id === selectedQuestionId;
                  const isError = q.studentAudit.status === 'has_error';
                  return (
                    <button
                      key={q.id}
                      onClick={() => setSelectedQuestionId(q.id)}
                      className={`py-2 text-center rounded-lg text-xs font-bold transition-all relative ${
                        isSelected
                          ? 'bg-sky-600 text-white shadow-sm ring-2 ring-sky-300'
                          : isError
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Câu {q.id}
                      {isError && (
                        <span className="block text-[10px] text-rose-600 font-semibold leading-tight">
                          0.75đ
                        </span>
                      )}
                      {!isError && (
                        <span className="block text-[10px] text-emerald-600 font-semibold leading-tight">
                          1.0đ
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick CTA to take the test */}
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-sky-950">Muốn tự thử sức làm bài?</div>
              <div className="text-xs text-sky-800">Làm lại đúng 12 câu này với hệ thống chấm tự động theo thời gian thực.</div>
            </div>
            <button
              onClick={onTakeTest}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-lg shadow-sm whitespace-nowrap"
            >
              Thi thử ngay
            </button>
          </div>
        </div>

        {/* Right Column: Detailed Question Inspector & Mistake Explanation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
            {/* Question Header & Points Badge */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>Phần {selectedQuestion.part}: {selectedQuestion.partTitle}</span>
                  <span>·</span>
                  <span>Ảnh {selectedQuestion.imagePage}</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
                  <span>Câu số {selectedQuestion.id}</span>
                  {selectedQuestion.studentAudit.status === 'has_error' ? (
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-300">
                      <AlertCircle className="w-3.5 h-3.5" />
                      CÓ CHỖ SAI (-0.25đ)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      ĐÚNG TRỌN VẸN (1.0đ)
                    </span>
                  )}
                </h2>
              </div>

              {/* Point Pill */}
              <div className="text-right shrink-0">
                <div className="text-xs text-slate-500 font-medium">Điểm câu này</div>
                <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  <span className={selectedQuestion.studentAudit.points === 1 ? 'text-emerald-600' : 'text-amber-600'}>
                    {selectedQuestion.studentAudit.points.toFixed(2)}
                  </span>
                  <span className="text-sm text-slate-400 font-normal"> / 1.00</span>
                </div>
              </div>
            </div>

            {/* Original Sentence */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Đề bài trong phiếu:
              </div>
              <div className="p-3.5 bg-slate-50 rounded-lg text-slate-900 font-medium text-base border border-slate-200">
                {selectedQuestion.originalSentence}
              </div>
            </div>

            {/* Student's Handwritten Answer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Chữ viết của học sinh trong ảnh:</span>
                <span className="text-slate-400 font-normal normal-case">
                  (Đã cho sẵn: "{selectedQuestion.givenPrefix}")
                </span>
              </div>
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg">
                <div className="text-sm text-slate-600 mb-1 font-mono">
                  → {selectedQuestion.givenPrefix}
                  <span className="underline decoration-2 decoration-sky-600 font-semibold text-slate-950 font-sans ml-1">
                    {selectedQuestion.studentHandwrittenAnswer}
                  </span>
                </div>
              </div>
            </div>

            {/* Error Analysis & Deduction Logic (Crucial for Q12!) */}
            <div className={`p-4 rounded-xl border ${
              selectedQuestion.studentAudit.status === 'has_error'
                ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                : 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-2">
                {selectedQuestion.studentAudit.status === 'has_error' ? (
                  <>
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Phân tích chỗ sai & Quy tắc trừ điểm câu số {selectedQuestion.id}:</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Nhận xét chấm điểm câu số {selectedQuestion.id}:</span>
                  </>
                )}
              </div>

              <p className="text-sm leading-relaxed mb-3">
                {selectedQuestion.studentAudit.flawDescription}
              </p>

              {/* Formula Deduction Breakdown */}
              <div className="bg-white/80 rounded-lg p-3 text-xs space-y-1.5 border border-slate-200/80">
                <div className="font-semibold text-slate-700">Công thức tính điểm câu này:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center pt-1 font-mono">
                  <div className="bg-slate-100 p-2 rounded">
                    <div className="text-[11px] text-slate-500 font-sans">Đúng dạng câu</div>
                    <div className="font-bold text-emerald-600 text-sm">+1.00 đ</div>
                  </div>
                  <div className="bg-slate-100 p-2 rounded">
                    <div className="text-[11px] text-slate-500 font-sans">Trừ từ sai/thừa</div>
                    <div className="font-bold text-rose-600 text-sm">
                      {selectedQuestion.studentAudit.errorCount === 0 ? '-0.00 đ' : `-${(selectedQuestion.studentAudit.errorCount * 0.25).toFixed(2)} đ`}
                    </div>
                  </div>
                  <div className="bg-slate-100 p-2 rounded">
                    <div className="text-[11px] text-slate-500 font-sans">Điểm chính thức</div>
                    <div className="font-bold text-sky-700 text-sm">
                      = {selectedQuestion.studentAudit.points.toFixed(2)} đ
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Standard Correct Answer */}
            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Đáp án chuẩn của Bộ / Đề thi:
              </div>
              <div className="p-3.5 bg-emerald-50 rounded-lg text-emerald-950 font-medium text-sm border border-emerald-200">
                → {selectedQuestion.fullStandardAnswer}
              </div>
            </div>

            {/* Detailed Grammar Rule Explanation */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
                Quy tắc ngữ pháp cần nắm:
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="text-xs font-mono font-semibold text-sky-900 bg-sky-100/70 p-2.5 rounded-lg border border-sky-200">
                  {selectedQuestion.grammarRule.formula}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedQuestion.grammarRule.explanation}
                </p>
                <ul className="text-xs text-slate-600 space-y-1 list-disc pl-4">
                  {selectedQuestion.grammarRule.keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => onOpenSandbox(selectedQuestion.id)}
                className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
              >
                <span>Thử chấm các biến thể câu này ở Sandbox</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  disabled={selectedQuestionId <= 1}
                  onClick={() => setSelectedQuestionId(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 rounded-lg disabled:opacity-40"
                >
                  ← Câu trước
                </button>
                <button
                  disabled={selectedQuestionId >= 12}
                  onClick={() => setSelectedQuestionId(prev => Math.min(12, prev + 1))}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg disabled:opacity-40"
                >
                  Câu tiếp theo →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
