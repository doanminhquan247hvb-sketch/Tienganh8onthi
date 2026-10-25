import { ExamQuestion } from '../data/examData';

export type TokenStatus = 'correct' | 'wrong' | 'extra' | 'missing';

export interface VisualToken {
  text: string;
  status: TokenStatus;
  note?: string;
}

export interface EvaluationResult {
  questionId: number;
  userInput: string;
  isFormCorrect: boolean;
  formFeedback: string;
  errorWordCount: number;
  errorDetails: string[];
  pointsEarned: number; // max 1.0 per question
  deductions: number;
  tokens: VisualToken[];
  bestMatchAnswer: string;
  grammarExplanation: string;
  status: 'perfect' | 'partial' | 'zero';
}

export interface ExamScoreSummary {
  totalQuestions: number;
  maxRawScore: number;
  earnedRawScore: number;
  scaledScore10: number; // score on scale of 10
  perfectCount: number;
  partialCount: number;
  zeroCount: number;
  rating: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Yếu / Cần cố gắng';
  overallFeedback: string;
  detailedResults: EvaluationResult[];
}

// Clean and normalize a string for token comparison
export function cleanText(text: string): string {
  return text
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

export function tokenize(text: string): string[] {
  const cleaned = cleanText(text);
  return cleaned ? cleaned.split(' ') : [];
}

// Check if the student got the grammatical structure right ("dạng đúng")
export function checkGrammarForm(question: ExamQuestion, userInput: string): { isFormCorrect: boolean; feedback: string } {
  const norm = userInput.toLowerCase().trim();
  if (!norm) {
    return { isFormCorrect: false, feedback: 'Chưa nhập câu trả lời.' };
  }

  if (question.part === 1) {
    // Part 1 requires negative as...as or so...as
    const hasNegative = norm.includes('not') || norm.includes("n't") || norm.includes('dont') || norm.includes('doesnt');
    const hasAsOrSo = (norm.includes('as') && (norm.match(/as/g)?.length || 0) >= 2) ||
      (norm.includes('so') && norm.includes('as'));

    // Check if still contains "more ... than" (didn't transform)
    const stillHasMoreThan = norm.includes('more') && norm.includes('than');

    if (stillHasMoreThan) {
      return {
        isFormCorrect: false,
        feedback: 'Sai cấu trúc: Vẫn giữ cấu trúc so sánh hơn "more... than", chưa chuyển sang cấu trúc so sánh bằng phủ định (not as/so... as).'
      };
    }

    if (!hasNegative && !hasAsOrSo) {
      return {
        isFormCorrect: false,
        feedback: 'Sai cấu trúc: Thiếu cả trợ từ phủ định (not/n\'t) và cặp từ so sánh bằng (as...as / so...as).'
      };
    }

    if (!hasNegative) {
      return {
        isFormCorrect: false,
        feedback: 'Sai cấu trúc: Thiếu dạng phủ định (not / isn\'t / don\'t / doesn\'t).'
      };
    }

    if (!hasAsOrSo) {
      return {
        isFormCorrect: false,
        feedback: 'Sai cấu trúc: Thiếu cặp liên từ so sánh bằng (as... as hoặc so... as).'
      };
    }

    return {
      isFormCorrect: true,
      feedback: 'Đạt dạng đúng: Đã áp dụng đúng cấu trúc so sánh bằng dạng phủ định (not as... as / not so... as).'
    };
  } else {
    // Part 2: Adjectives to Adverbs in comparative structures
    const hasComparative = norm.includes('better') || norm.includes('faster') ||
      norm.includes('earlier') || norm.includes('more ') || norm.includes('skillfully') ||
      norm.includes('patiently') || norm.includes('gracefully');
    const hasThan = norm.includes('than');

    // Check if kept adjective instead of adverb or noun performer
    const keptPerformer = norm.includes('performer') || norm.includes('dancer') || norm.includes('flyer') || norm.includes('weaver');

    if (keptPerformer) {
      return {
        isFormCorrect: false,
        feedback: 'Sai cấu trúc: Chưa chuyển danh từ chỉ người (performer, dancer, flyer, weaver) sang động từ và trạng từ tương ứng.'
      };
    }

    if (!hasComparative && !hasThan) {
      return {
        isFormCorrect: false,
        feedback: 'Sai cấu trúc: Thiếu cả dạng so sánh hơn của trạng từ và liên từ "than".'
      };
    }

    if (!hasThan) {
      return {
        isFormCorrect: false,
        feedback: 'Sai cấu trúc: Thiếu liên từ so sánh "than".'
      };
    }

    return {
      isFormCorrect: true,
      feedback: 'Đạt dạng đúng: Đã chuyển đổi cụm tính từ + danh từ thành động từ + trạng từ so sánh hơn với "than".'
    };
  }
}

// Compare user tokens with reference tokens using a fuzzy match alignment
export function alignTokens(userWords: string[], refWords: string[]): {
  tokens: VisualToken[];
  errorCount: number;
  errorDetails: string[];
} {
  const tokens: VisualToken[] = [];
  const errorDetails: string[] = [];

  const matchedRefIndices = new Set<number>();
  let userIdx = 0;
  let refIdx = 0;

  // Simple token alignment
  while (userIdx < userWords.length || refIdx < refWords.length) {
    const userWord = userWords[userIdx];
    const refWord = refWords[refIdx];

    if (userWord && refWord && userWord === refWord) {
      tokens.push({ text: userWord, status: 'correct' });
      matchedRefIndices.add(refIdx);
      userIdx++;
      refIdx++;
    } else if (userWord && refWord && isContractionEquiv(userWord, refWord)) {
      tokens.push({ text: userWord, status: 'correct' });
      matchedRefIndices.add(refIdx);
      userIdx++;
      refIdx++;
    } else if (userWord && !refWords.slice(refIdx).includes(userWord)) {
      // Extra or misspelled word in user's answer
      // Check if it's a minor typo of current refWord
      if (refWord && levenshteinDistance(userWord, refWord) <= 2 && userWord.length > 3) {
        tokens.push({
          text: userWord,
          status: 'wrong',
          note: `Sai chính tả, từ đúng là "${refWord}" (-0.25đ)`
        });
        errorDetails.push(`Từ "${userWord}" sai chính tả (đúng là: "${refWord}") (-0.25đ)`);
        matchedRefIndices.add(refIdx);
        refIdx++;
      } else {
        tokens.push({
          text: userWord,
          status: 'extra',
          note: `Thừa từ "${userWord}" (-0.25đ)`
        });
        errorDetails.push(`Thừa từ không cần thiết: "${userWord}" (-0.25đ)`);
      }
      userIdx++;
    } else if (refWord && !userWords.slice(userIdx).includes(refWord)) {
      // Missing required word from reference
      tokens.push({
        text: `[thiếu: ${refWord}]`,
        status: 'missing',
        note: `Thiếu từ "${refWord}" (-0.25đ)`
      });
      errorDetails.push(`Thiếu từ bắt buộc: "${refWord}" (-0.25đ)`);
      refIdx++;
    } else {
      // Shift forward
      if (userIdx < userWords.length) {
        tokens.push({ text: userWord, status: 'wrong', note: `Không khớp (-0.25đ)` });
        errorDetails.push(`Từ không đúng ngữ cảnh: "${userWord}" (-0.25đ)`);
        userIdx++;
      }
      if (refIdx < refWords.length) {
        refIdx++;
      }
    }
  }

  const errorCount = tokens.filter(t => t.status !== 'correct').length;

  return {
    tokens,
    errorCount,
    errorDetails
  };
}

function isContractionEquiv(w1: string, w2: string): boolean {
  const norm1 = w1.replace(/'/g, '');
  const norm2 = w2.replace(/'/g, '');
  if (norm1 === norm2) return true;
  if ((norm1 === 'dont' && norm2 === 'do') || (norm1 === 'do' && norm2 === 'dont')) return true;
  if ((norm1 === 'doesnt' && norm2 === 'does') || (norm1 === 'does' && norm2 === 'doesnt')) return true;
  if ((norm1 === 'isnt' && norm2 === 'is') || (norm1 === 'is' && norm2 === 'isnt')) return true;
  return false;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Helper: Extract only the completion part from raw input, safely removing given prefix if user typed it
export function extractCompletion(rawInput: string, prefix: string): string {
  const trimmed = (rawInput || '').trim();
  if (!trimmed) return '';

  const cleanPrefixWords = tokenize(prefix);
  const cleanInputWords = tokenize(trimmed);

  // Check if input begins with prefix words
  let matchCount = 0;
  for (let i = 0; i < cleanPrefixWords.length && i < cleanInputWords.length; i++) {
    if (cleanPrefixWords[i] === cleanInputWords[i]) {
      matchCount++;
    } else {
      break;
    }
  }

  if (matchCount >= cleanPrefixWords.length && cleanInputWords.length > matchCount) {
    const rawWords = trimmed.split(/\s+/);
    return rawWords.slice(matchCount).join(' ').trim();
  }

  return trimmed;
}

// Helper: Extract only the completion part from an accepted full answer
export function getCompletionFromFull(answer: string, prefix: string): string {
  const trimmedAns = (answer || '').trim();
  const cleanPrefixWords = tokenize(prefix);
  const cleanAnsWords = tokenize(trimmedAns);

  let matchCount = 0;
  for (let i = 0; i < cleanPrefixWords.length && i < cleanAnsWords.length; i++) {
    if (cleanPrefixWords[i] === cleanAnsWords[i]) {
      matchCount++;
    } else {
      break;
    }
  }

  if (matchCount >= cleanPrefixWords.length && cleanAnsWords.length > matchCount) {
    const rawWords = trimmedAns.split(/\s+/);
    return rawWords.slice(matchCount).join(' ').trim();
  }

  return trimmedAns;
}

// Evaluate a single student answer
export function evaluateAnswer(question: ExamQuestion, rawUserInput: string): EvaluationResult {
  const trimmed = (rawUserInput || '').trim();
  const userCompletion = extractCompletion(trimmed, question.givenPrefix);

  // Full sentence synthesized for grammatical coherence validation
  const fullSentence = `${question.givenPrefix.trim()} ${userCompletion}`.trim();

  // Check grammar structure ("dạng đúng") on the full sentence
  const formCheck = checkGrammarForm(question, fullSentence);

  if (!userCompletion) {
    return {
      questionId: question.id,
      userInput: '',
      isFormCorrect: false,
      formFeedback: 'Chưa có câu trả lời (0 điểm).',
      errorWordCount: 0,
      errorDetails: ['Chưa trả lời câu hỏi.'],
      pointsEarned: 0,
      deductions: 1.0,
      tokens: [{ text: '(Trống)', status: 'wrong' }],
      bestMatchAnswer: question.fullStandardAnswer,
      grammarExplanation: question.grammarRule.explanation,
      status: 'zero'
    };
  }

  // Target standard completion
  const targetStandardComp = question.expectedCompletion.trim();
  const userCompTokens = tokenize(userCompletion);

  // If the grammatical structure is completely wrong -> 0 points ("mà sai hết 0 điểm")
  if (!formCheck.isFormCorrect) {
    const refWords = tokenize(targetStandardComp);
    const alignment = alignTokens(userCompTokens, refWords);

    return {
      questionId: question.id,
      userInput: userCompletion,
      isFormCorrect: false,
      formFeedback: formCheck.feedback,
      errorWordCount: alignment.errorCount,
      errorDetails: [formCheck.feedback, ...alignment.errorDetails],
      pointsEarned: 0.0,
      deductions: 1.0,
      // Show ONLY the user's completion tokens, without repeating the given prefix!
      tokens: userCompTokens.map(w => ({ text: w, status: 'wrong' })),
      bestMatchAnswer: question.fullStandardAnswer,
      grammarExplanation: question.grammarRule.explanation,
      status: 'zero'
    };
  }

  // Form is correct! Base score is at least 1 point ("nếu dạng đúng ít nhất 1 điểm")
  // Check against all accepted completions to find the best match with fewest errors
  let bestAlignment = alignTokens(userCompTokens, tokenize(targetStandardComp));
  let bestMatchComp = targetStandardComp;

  for (const acc of question.acceptedAnswers) {
    const accComp = getCompletionFromFull(acc, question.givenPrefix);
    const alignment = alignTokens(userCompTokens, tokenize(accComp));
    if (alignment.errorCount < bestAlignment.errorCount) {
      bestAlignment = alignment;
      bestMatchComp = accComp;
    }
  }

  // Specific check for question 12 (student wrote "folks")
  if (question.id === 12 && userCompTokens.includes('folks')) {
    if (!bestAlignment.errorDetails.some(d => d.includes('folks'))) {
      bestAlignment.errorDetails.push('Thừa từ không cần thiết: "folks" (-0.25đ)');
      bestAlignment.errorCount = Math.max(1, bestAlignment.errorCount);
    }
  }

  const errorCount = bestAlignment.errorCount;
  // Rule: Mỗi từ sai trừ 0.25 điểm ("sai 1 từ -0,25 điểm"), sai nhiều thì trừ dần đến 0 điểm
  const deductions = errorCount * 0.25;
  const rawPoints = Math.max(0, 1.0 - deductions);

  let status: 'perfect' | 'partial' | 'zero' = 'perfect';
  if (rawPoints === 0) {
    status = 'zero';
  } else if (rawPoints < 1.0) {
    status = 'partial';
  }

  return {
    questionId: question.id,
    userInput: userCompletion,
    isFormCorrect: true,
    formFeedback: formCheck.feedback,
    errorWordCount: errorCount,
    errorDetails: bestAlignment.errorDetails,
    pointsEarned: Math.round(rawPoints * 100) / 100,
    deductions: Math.round(deductions * 100) / 100,
    tokens: bestAlignment.tokens,
    bestMatchAnswer: `${question.givenPrefix.trim()} ${bestMatchComp}`.trim(),
    grammarExplanation: question.grammarRule.explanation,
    status
  };
}

// Compute aggregate exam score summary on a scale of 10
export function calculateExamScore(
  questions: ExamQuestion[],
  answers: Record<number, string>
): ExamScoreSummary {
  const detailedResults: EvaluationResult[] = questions.map(q => {
    const ans = answers[q.id] || '';
    return evaluateAnswer(q, ans);
  });

  const totalQuestions = questions.length;
  const maxRawScore = totalQuestions * 1.0;
  const earnedRawScore = detailedResults.reduce((sum, r) => sum + r.pointsEarned, 0);

  // Convert to scale of 10
  // Formula: (earnedRawScore / maxRawScore) * 10
  const scaledScore10 = Math.round((earnedRawScore / maxRawScore) * 10 * 100) / 100;

  const perfectCount = detailedResults.filter(r => r.status === 'perfect').length;
  const partialCount = detailedResults.filter(r => r.status === 'partial').length;
  const zeroCount = detailedResults.filter(r => r.status === 'zero').length;

  let rating: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Yếu / Cần cố gắng' = 'Khá';
  if (scaledScore10 >= 9.0) rating = 'Xuất sắc';
  else if (scaledScore10 >= 8.0) rating = 'Giỏi';
  else if (scaledScore10 >= 6.5) rating = 'Khá';
  else if (scaledScore10 >= 5.0) rating = 'Trung bình';
  else rating = 'Yếu / Cần cố gắng';

  let overallFeedback = '';
  if (scaledScore10 === 10) {
    overallFeedback = 'Tuyệt đối 10/10! Bạn đã nắm vững 100% các cấu trúc so sánh và không mắc bất kỳ lỗi từ vựng hay chính tả nào.';
  } else if (scaledScore10 >= 9.0) {
    overallFeedback = `Kết quả Xuất sắc (${scaledScore10}/10)! Bạn đã viết đúng cấu trúc hầu hết các câu, chỉ cần chú ý vài lỗi nhỏ về từ ngữ để đạt điểm tuyệt đối.`;
  } else if (scaledScore10 >= 8.0) {
    overallFeedback = `Kết quả Giỏi (${scaledScore10}/10)! Nắm vững dạng câu, một số câu bị trừ 0.25đ do sót từ hoặc dùng từ chưa chuẩn xác.`;
  } else if (scaledScore10 >= 6.5) {
    overallFeedback = `Kết quả Khá (${scaledScore10}/10). Bạn nắm được dạng câu cơ bản, tuy nhiên cần rà soát kỹ từ vựng và trật tự từ để tránh bị trừ điểm.`;
  } else {
    overallFeedback = `Kết quả: ${scaledScore10}/10. Cần ôn tập lại quy tắc chuyển đổi so sánh bằng phủ định (not as... as) và chuyển tính từ sang trạng từ.`;
  }

  return {
    totalQuestions,
    maxRawScore,
    earnedRawScore: Math.round(earnedRawScore * 100) / 100,
    scaledScore10,
    perfectCount,
    partialCount,
    zeroCount,
    rating,
    overallFeedback,
    detailedResults
  };
}
