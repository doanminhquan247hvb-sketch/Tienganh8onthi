import React from 'react';
import { BookOpen, Check, AlertTriangle, ArrowRight, Lightbulb, FileText, CheckCircle2 } from 'lucide-react';

export const GrammarHandbookView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          Tài Liệu Hướng Dẫn & Cẩm Nang Ngữ Pháp
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Cẩm Nang Ôn Tập: Viết Lại Câu So Sánh & Thang Điểm 10
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Tổng hợp chi tiết 2 chuyên đề trọng tâm trong đề thi: So sánh bằng phủ định (Not as/so... as)
          và Biến đổi Cụm Tính từ + Danh từ sang Động từ + Trạng từ, kèm quy chế trừ điểm chuẩn.
        </p>
      </div>

      {/* Part 1: Comparative to Not as... as / Not so... as */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <span className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-sm">
            01
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Chuyên Đề 1: So Sánh Hơn ➜ So Sánh Bằng Phủ Định
            </h2>
            <p className="text-xs text-slate-500">Comparative ➜ Not as... as / Not so... as</p>
          </div>
        </div>

        {/* Core Formula Box */}
        <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-5 space-y-3">
          <div className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-sky-600" />
            Công thức biến đổi cốt lõi:
          </div>
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-900">
            <div className="p-3 bg-white rounded-lg border border-sky-100">
              <span className="text-slate-500">Câu gốc: </span>
              <strong>S1 + be / V + more + Adj/Adv (hoặc Adj-er) + than + S2</strong>
            </div>
            <div className="flex justify-center text-sky-600 font-bold py-0.5">
              ↓ biến đổi thành ↓
            </div>
            <div className="p-3 bg-white rounded-lg border border-sky-100 text-sky-950">
              <span className="text-slate-500">Câu viết lại: </span>
              <strong>S2 + be not / do not / does not + V + as (hoặc so) + Adj/Adv + as + S1</strong>
            </div>
          </div>
        </div>

        {/* 4 Steps Guide */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
            4 Bước Thực Hiện Chuẩn Xác Không Bị Trừ Điểm:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 bg-sky-100 text-sky-800 rounded-full flex items-center justify-center text-[11px]">1</span>
                Đảo chủ ngữ 2 lên đầu
              </div>
              <p className="text-slate-600">
                Nếu câu gốc "A hơn B", câu viết lại bắt đầu bằng "B" (B không bằng A).
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 bg-sky-100 text-sky-800 rounded-full flex items-center justify-center text-[11px]">2</span>
                Thêm thể phủ định
              </div>
              <p className="text-slate-600">
                To-be: <code>isn't / is not / aren't</code>. Động từ thường: mượn trợ động từ <code>don't / doesn't</code>.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 bg-sky-100 text-sky-800 rounded-full flex items-center justify-center text-[11px]">3</span>
                Đưa tính từ/trạng từ về nguyên thể
              </div>
              <p className="text-slate-600">
                Bỏ "more" hoặc đuôi "-er". Đặt từ giữa cặp <code>as...as</code> hoặc <code>so...as</code>.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                <span className="w-5 h-5 bg-sky-100 text-sky-800 rounded-full flex items-center justify-center text-[11px]">4</span>
                Kiểm tra yêu cầu đề bài
              </div>
              <p className="text-slate-600">
                Nếu đề ghi chú <code>(so...as)</code>, phải dùng "so" ở vế trước (ví dụ câu 4, 5, 6 trong bài).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Adjectives to Adverbs */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <span className="w-8 h-8 rounded-lg bg-sky-600 text-white font-bold flex items-center justify-center text-sm">
            02
          </span>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Chuyên Đề 2: Biến Đổi Cụm Tính Từ + Danh Từ Sang Động Từ + Trạng Từ
            </h2>
            <p className="text-xs text-slate-500">Adjectives ➜ Adverbs in comparative structures</p>
          </div>
        </div>

        {/* Formula Box */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 space-y-3">
          <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            Công thức biến đổi cốt lõi:
          </div>
          <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-900">
            <div className="p-3 bg-white rounded-lg border border-amber-100">
              <span className="text-slate-500">Cấu trúc Danh từ: </span>
              <strong>S + be + a/an + Adj + Noun (chỉ người) + than + S2</strong>
            </div>
            <div className="flex justify-center text-amber-600 font-bold py-0.5">
              ↓ chuyển đổi thành ↓
            </div>
            <div className="p-3 bg-white rounded-lg border border-amber-100 text-amber-950">
              <span className="text-slate-500">Cấu trúc Động từ: </span>
              <strong>S + Verb + (Tân ngữ) + Adv (so sánh hơn) + than + S2</strong>
            </div>
          </div>
        </div>

        {/* Vocabulary Transformation Reference Table */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wide">
            Bảng Chuyển Đổi Các Cụm Từ Xuất Hiện Trong Bài Thi:
          </div>
          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Câu</th>
                  <th className="p-3">Cụm Danh từ (Adj + Noun)</th>
                  <th className="p-3">Cụm Động từ (Verb + Adv)</th>
                  <th className="p-3">Ghi chú ngữ pháp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                <tr>
                  <td className="p-3 font-bold text-sky-700">Câu 7</td>
                  <td className="p-3 font-mono">more skillful kite flyer</td>
                  <td className="p-3 font-mono font-semibold text-emerald-700">flies kites more skillfully</td>
                  <td className="p-3 text-slate-600">flyer ➜ flies kites; skillful (adj) ➜ skillfully (adv)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-sky-700">Câu 8</td>
                  <td className="p-3 font-mono">a better dancer</td>
                  <td className="p-3 font-mono font-semibold text-emerald-700">dances better</td>
                  <td className="p-3 text-slate-600">dancer ➜ dances; well (adv) so sánh hơn vẫn là "better"</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-sky-700">Câu 9</td>
                  <td className="p-3 font-mono">faster runners</td>
                  <td className="p-3 font-mono font-semibold text-emerald-700">run faster</td>
                  <td className="p-3 text-slate-600">fast vừa là adj vừa là adv, không có "fastly"</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-sky-700">Câu 10</td>
                  <td className="p-3 font-mono">an earlier riser</td>
                  <td className="p-3 font-mono font-semibold text-emerald-700">wakes up earlier</td>
                  <td className="p-3 text-slate-600">early (adj/adv) ➜ đổi y thành i rồi thêm -er</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-sky-700">Câu 11</td>
                  <td className="p-3 font-mono">more patient basket weavers</td>
                  <td className="p-3 font-mono font-semibold text-emerald-700">weave baskets more patiently</td>
                  <td className="p-3 text-slate-600">patient (adj) ➜ patiently (adv)</td>
                </tr>
                <tr className="bg-rose-50/50">
                  <td className="p-3 font-bold text-rose-700">Câu 12 ⚠️</td>
                  <td className="p-3 font-mono">more graceful folk performer</td>
                  <td className="p-3 font-mono font-semibold text-emerald-700">performed more gracefully</td>
                  <td className="p-3 text-rose-800 font-medium">
                    Không viết thừa chữ "folks" (-0.25đ)! Performer đã chuyển thành performed.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Special Breakdown for Question 12 Mistake */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 sm:p-5 text-xs text-rose-950 space-y-2">
          <div className="font-bold flex items-center gap-1.5 text-sm text-rose-800">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            Phân Tích Chi Tiết Lỗi Sai Ở Câu Số 12 Trong Ảnh:
          </div>
          <p className="leading-relaxed">
            Học sinh viết: <code className="bg-rose-200/80 px-1 py-0.5 rounded font-mono font-semibold">Her sister performed folks more gracefully than other contestants.</code>
          </p>
          <div className="space-y-1 pl-4 border-l-2 border-rose-300">
            <div>
              • <strong>Tại sao sai?</strong> Đề bài đã cho sẵn từ "performed" (động từ chuyển đổi từ "performer"). Nếu học sinh chèn từ "folks" vào giữa, "folks" là danh từ mang nghĩa "mọi người/bà con", không hợp nghĩa và sai cấu trúc.
            </div>
            <div>
              • <strong>Cách sửa đúng:</strong> Bỏ hẳn từ "folks" ➜ <span className="font-semibold text-emerald-800">"Her sister performed more gracefully than other contestants."</span>
            </div>
            <div>
              • <strong>Hệ quả chấm thi:</strong> Đúng cấu trúc (+1.0đ) nhưng sai 1 từ ("folks") bị trừ 0.25đ ➜ Câu này đạt <strong>0.75 / 1.00 điểm</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Part 3: Grading Rubric Specification */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          Quy chế chấm thi viết lại câu
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Quy Định Chấm Điểm Thang 10 Chuẩn Bộ Giáo Dục
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
            <div className="text-xs font-bold text-emerald-800 uppercase">Dạng đúng</div>
            <div className="text-2xl font-extrabold text-emerald-700">Ít nhất 1.0 đ</div>
            <p className="text-xs text-emerald-900 mt-1">
              Thí sinh áp dụng đúng công thức biến đổi (đúng cấu trúc ngữ pháp và đúng thì của động từ).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
            <div className="text-xs font-bold text-amber-800 uppercase">Lỗi từ vựng</div>
            <div className="text-2xl font-extrabold text-amber-700">-0.25 đ / từ</div>
            <p className="text-xs text-amber-900 mt-1">
              Mỗi từ thừa, thiếu hoặc viết sai chính tả bị trừ 0.25đ. Trừ đến khi hết điểm câu.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
            <div className="text-xs font-bold text-rose-800 uppercase">Sai toàn bộ</div>
            <div className="text-2xl font-extrabold text-rose-700">0.00 đ</div>
            <p className="text-xs text-rose-900 mt-1">
              Không đổi đúng dạng, sai thì, viết lan man hoặc bỏ trống câu trả lời.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
