export interface ExamQuestion {
  id: number;
  part: 1 | 2;
  partTitle: string;
  imagePage: 1 | 2;
  imageAsset: string;
  originalSentence: string;
  targetRequirement: string;
  givenPrefix: string;
  expectedCompletion: string;
  fullStandardAnswer: string;
  acceptedAnswers: string[];
  studentHandwrittenAnswer: string;
  studentAnswerFull: string;
  studentAudit: {
    isFormCorrect: boolean;
    wrongWords: string[];
    errorCount: number;
    points: number; // out of 1.0
    status: 'correct' | 'has_error' | 'incorrect';
    flawDescription: string;
    correctionAdvice: string;
  };
  grammarRule: {
    formula: string;
    explanation: string;
    keyPoints: string[];
  };
}

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    imagePage: 1,
    imageAsset: '/assets/aistudio/1792835210312_706890774353951918_g1474643848733071383_9e225e09204785d0333727781a925b74_74a95d9e.jpg',
    originalSentence: 'Life in the countryside is more peaceful than life in the big city. (as...as)',
    targetRequirement: 'Viết lại câu dùng (as...as)',
    givenPrefix: 'Life in the big city ',
    expectedCompletion: 'is not as peaceful as life in the countryside.',
    fullStandardAnswer: 'Life in the big city is not as peaceful as life in the countryside.',
    acceptedAnswers: [
      'Life in the big city is not as peaceful as life in the countryside.',
      'Life in the big city isn\'t as peaceful as life in the countryside.',
      'is not as peaceful as life in the countryside.',
      'isn\'t as peaceful as life in the countryside.',
      'is not as peaceful as in the countryside.',
      'isn\'t as peaceful as in the countryside.'
    ],
    studentHandwrittenAnswer: 'is not as peaceful as life in the countryside.',
    studentAnswerFull: 'Life in the big city is not as peaceful as life in the countryside.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Học sinh đảo đúng chủ ngữ, dùng đúng to-be phủ định "is not" và cấu trúc "as peaceful as".',
      correctionAdvice: 'Không có lỗi sai.'
    },
    grammarRule: {
      formula: 'S1 + is/are + more + Adj + than + S2  ➜  S2 + is/are + not as + Adj + as + S1',
      explanation: 'Khi câu gốc nói "A thanh bình hơn B", câu viết lại mang nghĩa "B không thanh bình bằng A". Tính từ "peaceful" giữ nguyên dạng nguyên thể giữa hai từ "as...as".',
      keyPoints: [
        'Đảo chủ ngữ: "Life in the countryside" và "Life in the big city"',
        'Phủ định động từ to-be: is not / isn\'t',
        'Cấu trúc so sánh bằng: as + Adj + as'
      ]
    }
  },
  {
    id: 2,
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    imagePage: 1,
    imageAsset: '/assets/aistudio/1792835210312_706890774353951918_g1474643848733071383_9e225e09204785d0333727781a925b74_74a95d9e.jpg',
    originalSentence: 'Modern combine harvesters work faster than water buffaloes. (as...as)',
    targetRequirement: 'Viết lại câu dùng (as...as)',
    givenPrefix: 'Water buffaloes ',
    expectedCompletion: "don't work as fast as modern combine harvesters.",
    fullStandardAnswer: "Water buffaloes don't work as fast as modern combine harvesters.",
    acceptedAnswers: [
      "Water buffaloes don't work as fast as modern combine harvesters.",
      "Water buffaloes do not work as fast as modern combine harvesters.",
      "don't work as fast as modern combine harvesters.",
      "do not work as fast as modern combine harvesters."
    ],
    studentHandwrittenAnswer: "don't work as fast as modern combine harvesters.",
    studentAnswerFull: "Water buffaloes don't work as fast as modern combine harvesters.",
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Chủ ngữ số nhiều "Water buffaloes" đi với trợ động từ phủ định "don\'t", trạng từ "fast" giữ nguyên dạng gốc.',
      correctionAdvice: 'Không có lỗi sai.'
    },
    grammarRule: {
      formula: 'S1 + V + faster than + S2  ➜  S2 + do/does not + V + as fast as + S1',
      explanation: 'Câu gốc dùng động từ thường "work", nên câu phủ định phải mượn trợ động từ "do not / don\'t" (vì "Water buffaloes" là danh từ số nhiều). Chuyển "faster" về dạng nguyên thể "fast".',
      keyPoints: [
        'Chủ ngữ số nhiều "Water buffaloes" dùng trợ động từ "don\'t / do not"',
        'Động từ "work" đưa về nguyên thể không chia',
        '"fast" là trạng từ bất quy tắc (không có "fastly"), dạng nguyên thể là "fast"'
      ]
    }
  },
  {
    id: 3,
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    imagePage: 1,
    imageAsset: '/assets/aistudio/1792835210312_706890774353951918_g1474643848733071383_9e225e09204785d0333727781a925b74_74a95d9e.jpg',
    originalSentence: 'Riding a horse is more difficult than riding a bicycle. (as...as)',
    targetRequirement: 'Viết lại câu dùng (as...as)',
    givenPrefix: 'Riding a bicycle ',
    expectedCompletion: 'is not as difficult as riding a horse.',
    fullStandardAnswer: 'Riding a bicycle is not as difficult as riding a horse.',
    acceptedAnswers: [
      'Riding a bicycle is not as difficult as riding a horse.',
      'Riding a bicycle isn\'t as difficult as riding a horse.',
      'is not as difficult as riding a horse.',
      'isn\'t as difficult as riding a horse.'
    ],
    studentHandwrittenAnswer: 'is not as difficult as riding a horse.',
    studentAnswerFull: 'Riding a bicycle is not as difficult as riding a horse.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Chủ ngữ danh động từ "Riding a bicycle" là số ít đi với "is not", tính từ "difficult" giữ nguyên.',
      correctionAdvice: 'Không có lỗi sai.'
    },
    grammarRule: {
      formula: 'V-ing 1 + is + more + Adj + than + V-ing 2  ➜  V-ing 2 + is not + as + Adj + as + V-ing 1',
      explanation: 'Chủ ngữ bắt đầu bằng danh động từ V-ing được xem là số ít nên đi với to-be "is". So sánh bằng phủ định là "not as difficult as".',
      keyPoints: [
        'V-ing làm chủ ngữ luôn chia động từ số ít ("is")',
        'Đổi vị trí 2 hành động: Riding a bicycle ↔ Riding a horse',
        'Bỏ "more", thay bằng "as difficult as"'
      ]
    }
  },
  {
    id: 4,
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    imagePage: 1,
    imageAsset: '/assets/aistudio/1792835210312_706890774353951918_g1474643848733071383_9e225e09204785d0333727781a925b74_74a95d9e.jpg',
    originalSentence: "Nam rides a horse more skillfully than his younger brother. (so...as)",
    targetRequirement: 'Viết lại câu dùng (so...as)',
    givenPrefix: "Nam's younger brother ",
    expectedCompletion: "doesn't ride a horse so skillfully as Nam.",
    fullStandardAnswer: "Nam's younger brother doesn't ride a horse so skillfully as Nam.",
    acceptedAnswers: [
      "Nam's younger brother doesn't ride a horse so skillfully as Nam.",
      "Nam's younger brother does not ride a horse so skillfully as Nam.",
      "Nam's younger brother doesn't ride a horse so skillfully as Nam does.",
      "Nam's younger brother does not ride a horse so skillfully as Nam does.",
      "doesn't ride a horse so skillfully as Nam.",
      "does not ride a horse so skillfully as Nam.",
      "doesn't ride a horse so skillfully as Nam does.",
      "does not ride a horse so skillfully as Nam does."
    ],
    studentHandwrittenAnswer: "doesn't ride a horse so skillfully as Nam.",
    studentAnswerFull: "Nam's younger brother doesn't ride a horse so skillfully as Nam.",
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Học sinh lúc đầu viết thiếu cụm "a horse" nhưng đã kịp thời dùng dấu mũ (^) chèn "a horse" đúng vị trí trước khi nộp bài.',
      correctionAdvice: 'Chú ý viết cẩn thận không để sót tân ngữ "a horse".'
    },
    grammarRule: {
      formula: 'S1 + V-s + more Adv + than + S2  ➜  S2 + does not / doesn\'t + V + so + Adv + as + S1',
      explanation: 'Trong câu phủ định, ta có thể dùng "not so... as" thay cho "not as... as". Chủ ngữ "Nam\'s younger brother" là ngôi thứ ba số ít, dùng trợ động từ "doesn\'t / does not" + V nguyên thể "ride".',
      keyPoints: [
        'Đề bài yêu cầu cụ thể (so...as) nên phải dùng "so skillfully as"',
        'Chủ ngữ số ít đi với "doesn\'t ride"',
        'Đừng quên tân ngữ "a horse" đi kèm động từ'
      ]
    }
  },
  {
    id: 5,
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    imagePage: 1,
    imageAsset: '/assets/aistudio/1792835210312_706890774353951918_g1474643848733071383_9e225e09204785d0333727781a925b74_74a95d9e.jpg',
    originalSentence: 'The air in the city is more polluted than the air in the countryside. (so...as)',
    targetRequirement: 'Viết lại câu dùng (so...as)',
    givenPrefix: 'The air in the countryside ',
    expectedCompletion: 'is not so polluted as the air in the city.',
    fullStandardAnswer: 'The air in the countryside is not so polluted as the air in the city.',
    acceptedAnswers: [
      'The air in the countryside is not so polluted as the air in the city.',
      'The air in the countryside isn\'t so polluted as the air in the city.',
      'The air in the countryside is not so polluted as that in the city.',
      'is not so polluted as the air in the city.',
      'isn\'t so polluted as the air in the city.',
      'is not so polluted as in the city.'
    ],
    studentHandwrittenAnswer: 'is not so polluted as the air in the city.',
    studentAnswerFull: 'The air in the countryside is not so polluted as the air in the city.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Sử dụng đúng to-be phủ định "is not / isn\'t" và cặp từ "so polluted as".',
      correctionAdvice: 'Không có lỗi sai.'
    },
    grammarRule: {
      formula: 'S1 + is + more + Adj + than + S2  ➜  S2 + is not + so + Adj + as + S1',
      explanation: '"The air" là danh từ không đếm được nên dùng động từ số ít "is". Khi phủ định với yêu cầu (so...as), công thức là "not so polluted as".',
      keyPoints: [
        'Danh từ không đếm được "The air" đi với "is"',
        'Đúng yêu cầu đề bài: "so polluted as" (phủ định đi với so...as)',
        'Giữ nguyên tính từ "polluted"'
      ]
    }
  },
  {
    id: 6,
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    imagePage: 1,
    imageAsset: '/assets/aistudio/1792835210312_706890774353951918_g1474643848733071383_9e225e09204785d0333727781a925b74_74a95d9e.jpg',
    originalSentence: 'My grandfather loads rice onto the cart more quickly than I do. (so...as)',
    targetRequirement: 'Viết lại câu dùng (so...as)',
    givenPrefix: 'I ',
    expectedCompletion: 'do not load rice onto the cart so quickly as my grandfather does.',
    fullStandardAnswer: 'I do not load rice onto the cart so quickly as my grandfather does.',
    acceptedAnswers: [
      'I do not load rice onto the cart so quickly as my grandfather does.',
      'I do not load rice onto the cart so quickly as my grandfather.',
      "I don't load rice onto the cart so quickly as my grandfather does.",
      "I don't load rice onto the cart so quickly as my grandfather.",
      'do not load rice onto the cart so quickly as my grandfather does.',
      'do not load rice onto the cart so quickly as my grandfather.',
      "don't load rice onto the cart so quickly as my grandfather does.",
      "don't load rice onto the cart so quickly as my grandfather."
    ],
    studentHandwrittenAnswer: 'do not load rice onto the cart so quickly as my grandfather',
    studentAnswerFull: 'I do not load rice onto the cart so quickly as my grandfather.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Chủ ngữ "I" đi với "do not load", dùng đúng "so quickly as". Kết thúc bằng "as my grandfather" hoặc "as my grandfather does" đều được chấp nhận điểm tối đa trong thi cử.',
      correctionAdvice: 'Có thể thêm trợ động từ "does" ở cuối ("as my grandfather does") để câu đối xứng hoàn hảo với vế "than I do" ở đề gốc.'
    },
    grammarRule: {
      formula: 'S1 + V-s + more Adv + than + S2 + do/does  ➜  S2 + do/does not + V + so + Adv + as + S1 (does)',
      explanation: 'Chủ ngữ "I" mượn trợ động từ "do not / don\'t". Cụm vị ngữ đầy đủ "load rice onto the cart" đi với "so quickly as my grandfather (does)".',
      keyPoints: [
        'Chủ ngữ "I" dùng trợ động từ "do not" hoặc "don\'t"',
        'Trạng từ "quickly" giữ nguyên giữa cặp "so...as"',
        'Đầy đủ cả cụm tân ngữ "rice onto the cart"'
      ]
    }
  },
  {
    id: 7,
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    imagePage: 2,
    imageAsset: '/assets/aistudio/1792835210533_706890774353951918_g1474643848733071383_a5d10b0313c97252101422906844cbab_d793fc87.jpg',
    originalSentence: 'Phong is a more skillful kite flyer than his brother.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Phong flies ',
    expectedCompletion: 'kites more skillfully than his brother.',
    fullStandardAnswer: 'Phong flies kites more skillfully than his brother.',
    acceptedAnswers: [
      'Phong flies kites more skillfully than his brother.',
      'Phong flies a kite more skillfully than his brother.',
      'kites more skillfully than his brother.',
      'a kite more skillfully than his brother.'
    ],
    studentHandwrittenAnswer: 'kites more skillfully than his brother.',
    studentAnswerFull: 'Phong flies kites more skillfully than his brother.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Học sinh biến đổi danh từ "kite flyer" thành động từ "flies kites", và tính từ "skillful" thành trạng từ "skillfully".',
      correctionAdvice: 'Không có lỗi sai.'
    },
    grammarRule: {
      formula: 'S + be + a/an + more + Adj + N(er) + than + S2  ➜  S + V + (O) + more + Adv + than + S2',
      explanation: 'Danh từ chỉ người "kite flyer" (người thả diều) chuyển thành hành động "flies kites". Tính từ "skillful" chuyển thành trạng từ "skillfully". So sánh hơn của trạng từ dài là "more skillfully than".',
      keyPoints: [
        '"flyer" ➜ động từ "flies", tân ngữ "kites"',
        'Tính từ "skillful" ➜ Trạng từ "skillfully" (thêm đuôi -ly)',
        'Cấu trúc so sánh hơn: "more skillfully than"'
      ]
    }
  },
  {
    id: 8,
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    imagePage: 2,
    imageAsset: '/assets/aistudio/1792835210533_706890774353951918_g1474643848733071383_a5d10b0313c97252101422906844cbab_d793fc87.jpg',
    originalSentence: 'Lan is a better dancer than Mai at the village spring festival.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Lan dances ',
    expectedCompletion: 'better than Mai at the village spring festival.',
    fullStandardAnswer: 'Lan dances better than Mai at the village spring festival.',
    acceptedAnswers: [
      'Lan dances better than Mai at the village spring festival.',
      'better than Mai at the village spring festival.'
    ],
    studentHandwrittenAnswer: 'better than Mai at the village spring festival.',
    studentAnswerFull: 'Lan dances better than Mai at the village spring festival.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Danh từ "dancer" đổi thành động từ "dances". "better" là dạng so sánh hơn của cả tính từ "good" và trạng từ "well".',
      correctionAdvice: 'Không có lỗi sai.'
    },
    grammarRule: {
      formula: 'S + is a better dancer than + S2  ➜  S + dances better than + S2',
      explanation: '"good" (adj) ➜ "well" (adv). Cả "good" và "well" đều có dạng so sánh hơn là "better". Do đó khi chuyển từ danh từ "dancer" sang động từ "dances", dạng so sánh vẫn là "better than".',
      keyPoints: [
        'Dancer (danh từ) ➜ dances (động từ ngôi 3 số ít)',
        'So sánh hơn của "well" là "better"',
        'Giữ nguyên trạng ngữ chỉ nơi chốn/thời gian: "at the village spring festival"'
      ]
    }
  },
  {
    id: 9,
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    imagePage: 2,
    imageAsset: '/assets/aistudio/1792835210533_706890774353951918_g1474643848733071383_a5d10b0313c97252101422906844cbab_d793fc87.jpg',
    originalSentence: 'Village children are faster runners across open fields than town kids.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Village children run ',
    expectedCompletion: 'across open fields faster than town kids.',
    fullStandardAnswer: 'Village children run across open fields faster than town kids.',
    acceptedAnswers: [
      'Village children run across open fields faster than town kids.',
      'Village children run faster across open fields than town kids.',
      'across open fields faster than town kids.',
      'faster across open fields than town kids.'
    ],
    studentHandwrittenAnswer: 'across open fields faster than town kids.',
    studentAnswerFull: 'Village children run across open fields faster than town kids.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Danh từ "runners" đổi thành động từ "run". Cả 2 trật tự từ ("run faster across open fields than town kids" hoặc "run across open fields faster than town kids") đều chuẩn ngữ pháp.',
      correctionAdvice: 'Trong văn viết học thuật, trật tự "run faster across open fields than town kids" cũng rất phổ biến.'
    },
    grammarRule: {
      formula: 'S + are faster runners than + S2  ➜  S + run faster than + S2',
      explanation: '"fast" là từ vừa là tính từ vừa là trạng từ (không có dạng *fastly). So sánh hơn của trạng từ "fast" là "faster". Danh từ "runners" chuyển thành động từ "run".',
      keyPoints: [
        '"fast" là tính từ lẫn trạng từ bất quy tắc, so sánh hơn là "faster"',
        'Chủ ngữ số nhiều "Village children" đi với động từ nguyên mẫu "run"',
        'Cụm giới từ "across open fields" có thể đặt trước hoặc sau "faster"'
      ]
    }
  },
  {
    id: 10,
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    imagePage: 2,
    imageAsset: '/assets/aistudio/1792835210533_706890774353951918_g1474643848733071383_a5d10b0313c97252101422906844cbab_d793fc87.jpg',
    originalSentence: 'His grandfather is an earlier riser in the morning than anyone else in the family.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'His grandfather wakes up ',
    expectedCompletion: 'earlier in the morning than anyone else in the family.',
    fullStandardAnswer: 'His grandfather wakes up earlier in the morning than anyone else in the family.',
    acceptedAnswers: [
      'His grandfather wakes up earlier in the morning than anyone else in the family.',
      'earlier in the morning than anyone else in the family.'
    ],
    studentHandwrittenAnswer: 'earlier in the morning than anyone else in the family.',
    studentAnswerFull: 'His grandfather wakes up earlier in the morning than anyone else in the family.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. Danh từ "riser" được đề bài gợi ý thành "wakes up", tính từ "earlier" đóng vai trò trạng từ "earlier".',
      correctionAdvice: 'Không có lỗi sai.'
    },
    grammarRule: {
      formula: 'S + is an earlier riser than...  ➜  S + wakes up / rises earlier than...',
      explanation: '"early" là tính từ và trạng từ đặc biệt kết thúc bằng "-y". Dạng so sánh hơn của cả hai đều đổi "-y" thành "-ier" ➜ "earlier". Đề bài cho sẵn "wakes up", ta chỉ cần hoàn thành vế so sánh.',
      keyPoints: [
        '"early" ➜ "earlier" (đổi -y thành -i rồi thêm -er)',
        'Cụm từ "earlier in the morning than anyone else in the family"'
      ]
    }
  },
  {
    id: 11,
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    imagePage: 2,
    imageAsset: '/assets/aistudio/1792835210533_706890774353951918_g1474643848733071383_a5d10b0313c97252101422906844cbab_d793fc87.jpg',
    originalSentence: 'The local craftsmen are more patient basket weavers than younger apprentices.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'The local craftsmen weave ',
    expectedCompletion: 'baskets more patiently than younger apprentices.',
    fullStandardAnswer: 'The local craftsmen weave baskets more patiently than younger apprentices.',
    acceptedAnswers: [
      'The local craftsmen weave baskets more patiently than younger apprentices.',
      'baskets more patiently than younger apprentices.'
    ],
    studentHandwrittenAnswer: 'baskets more patiently than younger apprentices.',
    studentAnswerFull: 'The local craftsmen weave baskets more patiently than younger apprentices.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: [],
      errorCount: 0,
      points: 1.0,
      status: 'correct',
      flawDescription: 'Chính xác 100%. "basket weavers" (những người đan giỏ) chuyển thành "weave baskets", tính từ "patient" chuyển thành trạng từ "patiently".',
      correctionAdvice: 'Không có lỗi sai.'
    },
    grammarRule: {
      formula: 'S + be + more patient + [Object] weavers + than...  ➜  S + weave + [Object] + more patiently than...',
      explanation: '"basket weaver" là danh từ ghép (tân ngữ + người thực hiện). Khi chuyển sang động từ: "weavers" ➜ "weave", tân ngữ "baskets" đặt sau động từ. Tính từ "patient" thêm đuôi "-ly" thành trạng từ "patiently".',
      keyPoints: [
        '"basket weavers" ➜ "weave baskets"',
        '"patient" (adj) ➜ "patiently" (adv)',
        'Cấu trúc: weave + baskets + more patiently than...'
      ]
    }
  },
  {
    id: 12,
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    imagePage: 2,
    imageAsset: '/assets/aistudio/1792835210533_706890774353951918_g1474643848733071383_a5d10b0313c97252101422906844cbab_d793fc87.jpg',
    originalSentence: 'Her sister was a more graceful folk performer than other contestants.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Her sister performed ',
    expectedCompletion: 'more gracefully than other contestants.',
    fullStandardAnswer: 'Her sister performed more gracefully than other contestants.',
    acceptedAnswers: [
      'Her sister performed more gracefully than other contestants.',
      'more gracefully than other contestants.',
      'Her sister performed folk dance more gracefully than other contestants.',
      'Her sister performed folk songs more gracefully than other contestants.'
    ],
    studentHandwrittenAnswer: 'folks more gracefully than other contestants.',
    studentAnswerFull: 'Her sister performed folks more gracefully than other contestants.',
    studentAudit: {
      isFormCorrect: true,
      wrongWords: ['folks'],
      errorCount: 1,
      points: 0.75,
      status: 'has_error',
      flawDescription: 'CÓ CHỖ SAI! Học sinh đã viết thừa từ "folks". Câu của học sinh: "Her sister performed folks more gracefully than other contestants." Trong câu gốc, "folk performer" nghĩa là "người biểu diễn dân gian/nghệ sĩ biểu diễn dân ca". Khi đề bài đã cho sẵn động từ "performed", danh từ "performer" đã được chuyển đổi thành động từ. Việc thêm từ "folks" (số nhiều có s) là sai ngữ pháp vì "folks" có nghĩa là "mọi người/bà con", không thể là tân ngữ của "performed". Nếu giữ từ "folk", nó chỉ có thể là tính từ đi kèm tân ngữ cụ thể như "folk songs" hoặc "folk dances", nhưng đáp án chuẩn nhất là bỏ từ "folk" vì hành động biểu diễn đã bao hàm ngữ cảnh.',
      correctionAdvice: 'Bỏ từ "folks"! Viết đúng là: "Her sister performed more gracefully than other contestants." (Theo quy chế chấm thi: Đúng dạng câu được 1.0 điểm, nhưng sai 1 từ ("folks") bị trừ 0.25 điểm ➜ Còn lại 0.75 / 1.0 điểm).'
    },
    grammarRule: {
      formula: 'S + was a more graceful performer + than...  ➜  S + performed + more gracefully than...',
      explanation: 'Tính từ "graceful" chuyển thành trạng từ "gracefully". Danh từ "performer" chuyển thành động từ quá khứ đơn "performed" (vì câu gốc dùng "was"). Không thêm từ "folks" tùy tiện.',
      keyPoints: [
        'Dạng đúng: graceful ➜ gracefully',
        'Lỗi học sinh mắc phải: Thêm từ "folks" không phù hợp làm sai ngữ pháp (-0.25đ)',
        'Đáp án chuẩn: more gracefully than other contestants'
      ]
    }
  }
];

export const STUDENT_EXAM_SUMMARY = {
  studentName: 'Học sinh làm bài trong ảnh',
  totalQuestions: 12,
  standardScale: 10.0,
  maxRawPoints: 12.0,
  earnedRawPoints: 11.75, // 11 correct (11 * 1.0) + Q12 (0.75) = 11.75
  scaledScore: 9.79, // (11.75 / 12) * 10 = 9.79 / 10
  perfectQuestionsCount: 11,
  questionsWithErrorsCount: 1,
  failedQuestionsCount: 0,
  letterGrade: 'Xuất sắc',
  summaryComment: 'Bài làm rất tốt, nắm vững hầu hết các cấu trúc so sánh bằng (not as/so...as) và chuyển tính từ sang trạng từ so sánh hơn. Chỉ mắc 01 lỗi duy nhất ở câu số 12 do viết thừa từ "folks" (-0.25 điểm).'
};
