import { ExamQuestion } from '../data/examData';
import { CURATED_RANDOM_QUESTIONS, RandomQuestionTemplate } from '../data/randomQuestionBank';

// Dynamic procedural templates for infinite variety
interface ProceduralPart1Template {
  sub1: string;
  sub2: string;
  adjOrAdv: string;
  isAdverb: boolean;
  verb?: string;
  verbThird?: string;
  isPlural1: boolean;
  isPlural2: boolean;
  req: 'as...as' | 'so...as';
}

const PROCEDURAL_PART1_ELEMENTS: ProceduralPart1Template[] = [
  { sub1: 'The bullet train', sub2: 'the passenger airplane', adjOrAdv: 'convenient', isAdverb: false, isPlural1: false, isPlural2: false, req: 'as...as' },
  { sub1: 'Reading physical books', sub2: 'scrolling on social media', adjOrAdv: 'rewarding', isAdverb: false, isPlural1: false, isPlural2: false, req: 'so...as' },
  { sub1: 'Solar panels', sub2: 'diesel generators', adjOrAdv: 'eco-friendly', isAdverb: false, isPlural1: true, isPlural2: true, req: 'as...as' },
  { sub1: 'The modern microscope', sub2: 'the old magnifying glass', adjOrAdv: 'powerful', isAdverb: false, isPlural1: false, isPlural2: false, req: 'so...as' },
  { sub1: 'Working in a laboratory', sub2: 'working outdoors in winter', adjOrAdv: 'comfortable', isAdverb: false, isPlural1: false, isPlural2: false, req: 'as...as' },
  { sub1: 'Bicycle riders in Amsterdam', sub2: 'car drivers in rush hour', adjOrAdv: 'cheerfully', isAdverb: true, verb: 'commute', verbThird: 'commutes', isPlural1: true, isPlural2: true, req: 'so...as' },
  { sub1: 'The young gymnast', sub2: 'her opponent', adjOrAdv: 'gracefully', isAdverb: true, verb: 'land', verbThird: 'lands', isPlural1: false, isPlural2: false, req: 'as...as' },
  { sub1: 'Industrial robots', sub2: 'manual workers', adjOrAdv: 'accurately', isAdverb: true, verb: 'assemble components', verbThird: 'assembles components', isPlural1: true, isPlural2: true, req: 'so...as' },
  { sub1: 'The domestic cat', sub2: 'the stray dog', adjOrAdv: 'clean', isAdverb: false, isPlural1: false, isPlural2: false, req: 'as...as' },
  { sub1: 'Fresh orange juice', sub2: 'canned soda', adjOrAdv: 'healthy', isAdverb: false, isPlural1: false, isPlural2: false, req: 'so...as' }
];

interface ProceduralPart2Template {
  subject: string;
  occupation: string;
  verb: string;
  object?: string;
  adjective: string;
  adverb: string;
  comparisonTarget: string;
}

const PROCEDURAL_PART2_ELEMENTS: ProceduralPart2Template[] = [
  { subject: 'Dr. Watson', occupation: 'listener', verb: 'listens', adjective: 'patient', adverb: 'patiently', comparisonTarget: 'other detectives' },
  { subject: 'The young pianist', occupation: 'player', verb: 'plays the piano', adjective: 'expressive', adverb: 'expressively', comparisonTarget: 'his classmates' },
  { subject: 'The mountain climber', occupation: 'hiker', verb: 'hikes', adjective: 'cautious', adverb: 'cautiously', comparisonTarget: 'the tourists' },
  { subject: 'Uncle John', occupation: 'chess player', verb: 'plays chess', adjective: 'tactical', adverb: 'tactically', comparisonTarget: 'my father' },
  { subject: 'That carpenter', occupation: 'furniture maker', verb: 'makes furniture', adjective: 'meticulous', adverb: 'meticulously', comparisonTarget: 'other workers' },
  { subject: 'The school goalkeeper', occupation: 'catcher', verb: 'catches the ball', adjective: 'quick', adverb: 'quickly', comparisonTarget: 'the reserve player' },
  { subject: 'The barista', occupation: 'coffee brewer', verb: 'brews coffee', adjective: 'passionate', adverb: 'passionately', comparisonTarget: 'the beginner' },
  { subject: 'The robotics engineer', occupation: 'problem solver', verb: 'solves problems', adjective: 'creative', adverb: 'creatively', comparisonTarget: 'the technician' }
];

function generateProceduralPart1(item: ProceduralPart1Template): RandomQuestionTemplate {
  if (item.isAdverb) {
    // Verb + Adverb comparison
    const v1 = item.isPlural1 ? item.verb! : item.verbThird!;
    const orig = `${item.sub1} ${v1} more ${item.adjOrAdv} than ${item.sub2}. (${item.req})`;
    const aux = item.isPlural2 ? "don't" : "doesn't";
    const auxFormal = item.isPlural2 ? "do not" : "does not";
    const marker = item.req === 'so...as' ? 'so' : 'as';
    const comp = `${aux} ${item.verb} ${marker} ${item.adjOrAdv} as ${item.sub1}.`;
    const full = `${item.sub2} ${comp}`;

    return {
      part: 1,
      partTitle: 'Comparative → Not as... as / Not so... as',
      originalSentence: orig,
      targetRequirement: `Viết lại câu dùng (${item.req})`,
      givenPrefix: `${item.sub2} `,
      expectedCompletion: comp,
      fullStandardAnswer: full,
      acceptedAnswers: [
        full,
        `${item.sub2} ${auxFormal} ${item.verb} ${marker} ${item.adjOrAdv} as ${item.sub1}.`,
        comp,
        `${auxFormal} ${item.verb} ${marker} ${item.adjOrAdv} as ${item.sub1}.`
      ],
      grammarRule: {
        formula: `S1 + V + more Adv + than + S2 ➜ S2 + ${aux} + V + ${marker} + Adv + as + S1`,
        explanation: `Đảo chủ ngữ "${item.sub2}" lên đầu câu. Vì là động từ thường, mượn trợ động từ "${aux}" + động từ nguyên thể "${item.verb}". Dùng cấu trúc "${marker} ${item.adjOrAdv} as".`,
        keyPoints: [`Chủ ngữ ${item.sub2} đi với ${aux}`, `Cấu trúc yêu cầu: ${marker} ${item.adjOrAdv} as`]
      }
    };
  } else {
    // To-be + Adjective comparison
    const toBe1 = item.isPlural1 ? 'are' : 'is';
    const toBe2 = item.isPlural2 ? 'are' : 'is';
    const toBeNeg = item.isPlural2 ? "aren't" : "isn't";
    const toBeNegFormal = item.isPlural2 ? "are not" : "is not";
    const marker = item.req === 'so...as' ? 'so' : 'as';

    const orig = `${item.sub1} ${toBe1} more ${item.adjOrAdv} than ${item.sub2}. (${item.req})`;
    const comp = `${toBeNegFormal} ${marker} ${item.adjOrAdv} as ${item.sub1}.`;
    const full = `${item.sub2} ${comp}`;

    return {
      part: 1,
      partTitle: 'Comparative → Not as... as / Not so... as',
      originalSentence: orig,
      targetRequirement: `Viết lại câu dùng (${item.req})`,
      givenPrefix: `${item.sub2} `,
      expectedCompletion: comp,
      fullStandardAnswer: full,
      acceptedAnswers: [
        full,
        `${item.sub2} ${toBeNeg} ${marker} ${item.adjOrAdv} as ${item.sub1}.`,
        comp,
        `${toBeNeg} ${marker} ${item.adjOrAdv} as ${item.sub1}.`
      ],
      grammarRule: {
        formula: `S1 + ${toBe1} more Adj than + S2 ➜ S2 + ${toBeNegFormal} ${marker} Adj as + S1`,
        explanation: `Đảo chủ ngữ "${item.sub2}" lên đầu. Động từ to-be phủ định là "${toBeNegFormal}" (hoặc "${toBeNeg}"). Tính từ "${item.adjOrAdv}" đặt giữa cặp "${marker}...as".`,
        keyPoints: [`Chủ ngữ ${item.sub2} đi với ${toBeNegFormal}`, `more ${item.adjOrAdv} than ➜ not ${marker} ${item.adjOrAdv} as`]
      }
    };
  }
}

function generateProceduralPart2(item: ProceduralPart2Template): RandomQuestionTemplate {
  const orig = `${item.subject} is a more ${item.adjective} ${item.occupation} than ${item.comparisonTarget}.`;
  const prefix = `${item.subject} ${item.verb} `;
  const comp = `more ${item.adverb} than ${item.comparisonTarget}.`;
  const full = `${prefix}${comp}`;

  return {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: orig,
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: prefix,
    expectedCompletion: comp,
    fullStandardAnswer: full,
    acceptedAnswers: [
      comp,
      full,
      `more ${item.adverb} than ${item.comparisonTarget}`
    ],
    grammarRule: {
      formula: `S + is a more ${item.adjective} ${item.occupation} than... ➜ S + ${item.verb} + more ${item.adverb} than...`,
      explanation: `Đề bài đã cho sẵn chủ ngữ và động từ: "${prefix}". Bạn chỉ cần điền tiếp dạng so sánh hơn của trạng từ: "more ${item.adverb} than ${item.comparisonTarget}". Không viết lại "${prefix}".`,
      keyPoints: [`Đã cho sẵn ở đầu: ${prefix}`, `Phần cần viết tiếp: more ${item.adverb} than ${item.comparisonTarget}`]
    }
  };
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates an array of randomized ExamQuestions completely different from the photo questions!
 * @param count Number of questions (default: 10)
 * @param topic 'all' | 'part1' | 'part2'
 */
export function generateRandomExam(
  count: number = 10,
  topic: 'all' | 'part1' | 'part2' = 'all'
): ExamQuestion[] {
  const pool: RandomQuestionTemplate[] = [];

  // Add curated bank
  if (topic === 'all' || topic === 'part1') {
    pool.push(...CURATED_RANDOM_QUESTIONS.filter(q => q.part === 1));
    // Add procedural part 1
    PROCEDURAL_PART1_ELEMENTS.forEach(el => pool.push(generateProceduralPart1(el)));
  }

  if (topic === 'all' || topic === 'part2') {
    pool.push(...CURATED_RANDOM_QUESTIONS.filter(q => q.part === 2));
    // Add procedural part 2
    PROCEDURAL_PART2_ELEMENTS.forEach(el => pool.push(generateProceduralPart2(el)));
  }

  // Shuffle pool
  const shuffled = shuffleArray(pool);

  // Take requested count
  const selected = shuffled.slice(0, count);

  // Map into standard ExamQuestion format
  return selected.map((item, index) => {
    return {
      id: index + 1,
      part: item.part,
      partTitle: item.partTitle,
      imagePage: item.part,
      imageAsset: '', // Generated random question, not from photo
      originalSentence: item.originalSentence,
      targetRequirement: item.targetRequirement,
      givenPrefix: item.givenPrefix,
      expectedCompletion: item.expectedCompletion,
      fullStandardAnswer: item.fullStandardAnswer,
      acceptedAnswers: item.acceptedAnswers,
      studentHandwrittenAnswer: '',
      studentAnswerFull: '',
      studentAudit: {
        isFormCorrect: true,
        wrongWords: [],
        errorCount: 0,
        points: 1.0,
        status: 'correct',
        flawDescription: 'Câu hỏi ngẫu nhiên mới sinh ra từ hệ thống.',
        correctionAdvice: ''
      },
      grammarRule: item.grammarRule
    };
  });
}
