import { ExamQuestion } from './examData';

export interface RandomQuestionTemplate {
  part: 1 | 2;
  partTitle: string;
  originalSentence: string;
  targetRequirement: string;
  givenPrefix: string;
  expectedCompletion: string;
  fullStandardAnswer: string;
  acceptedAnswers: string[];
  grammarRule: {
    formula: string;
    explanation: string;
    keyPoints: string[];
  };
}

export const CURATED_RANDOM_QUESTIONS: RandomQuestionTemplate[] = [
  // --- PART 1: So sánh hơn ➜ So sánh bằng phủ định (Not as... as / Not so... as) ---
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'The express train is faster than the local bus. (as...as)',
    targetRequirement: 'Viết lại câu dùng (as...as)',
    givenPrefix: 'The local bus ',
    expectedCompletion: 'is not as fast as the express train.',
    fullStandardAnswer: 'The local bus is not as fast as the express train.',
    acceptedAnswers: [
      'The local bus is not as fast as the express train.',
      "The local bus isn't as fast as the express train.",
      'is not as fast as the express train.',
      "isn't as fast as the express train."
    ],
    grammarRule: {
      formula: 'S1 + is faster than + S2 ➜ S2 + is not as fast as + S1',
      explanation: 'Đảo chủ ngữ "The local bus" lên đầu câu. Vì "bus" là số ít nên đi với "is not / isn\'t". Đưa tính từ "faster" về dạng nguyên thể "fast" giữa cặp "as...as".',
      keyPoints: ['Đảo chủ ngữ: bus ↔ train', 'To-be số ít: is not / isn\'t', 'faster ➜ as fast as']
    }
  },
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'Living in a luxury villa is more expensive than living in a small flat. (as...as)',
    targetRequirement: 'Viết lại câu dùng (as...as)',
    givenPrefix: 'Living in a small flat ',
    expectedCompletion: 'is not as expensive as living in a luxury villa.',
    fullStandardAnswer: 'Living in a small flat is not as expensive as living in a luxury villa.',
    acceptedAnswers: [
      'Living in a small flat is not as expensive as living in a luxury villa.',
      "Living in a small flat isn't as expensive as living in a luxury villa.",
      'is not as expensive as living in a luxury villa.',
      "isn't as expensive as living in a luxury villa."
    ],
    grammarRule: {
      formula: 'V-ing 1 + is more Adj than + V-ing 2 ➜ V-ing 2 + is not as Adj as + V-ing 1',
      explanation: 'Chủ ngữ danh động từ "Living in..." chia to-be số ít "is not". Bỏ "more", giữ nguyên tính từ "expensive" giữa "as...as".',
      keyPoints: ['Living in... làm chủ ngữ đi với is not', 'more expensive than ➜ not as expensive as']
    }
  },
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'Tom speaks English more fluently than his classmate David. (so...as)',
    targetRequirement: 'Viết lại câu dùng (so...as)',
    givenPrefix: "David doesn't ",
    expectedCompletion: 'speak English so fluently as Tom.',
    fullStandardAnswer: "David doesn't speak English so fluently as Tom.",
    acceptedAnswers: [
      "David doesn't speak English so fluently as Tom.",
      'David does not speak English so fluently as Tom.',
      "David doesn't speak English so fluently as Tom does.",
      'David does not speak English so fluently as Tom does.',
      'speak English so fluently as Tom.',
      'speak English so fluently as Tom does.'
    ],
    grammarRule: {
      formula: 'S1 + V-s + more Adv than + S2 ➜ S2 + does not + V + so + Adv + as + S1',
      explanation: 'Động từ thường "speaks" chuyển sang phủ định ngôi 3 số ít: mượn trợ động từ "doesn\'t / does not" + động từ nguyên thể "speak". Đề bài yêu cầu (so...as) nên dùng "so fluently as".',
      keyPoints: ['Chủ ngữ số ít đi với doesn\'t speak', 'Yêu cầu (so...as): so fluently as', 'more fluently ➜ so fluently as']
    }
  },
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'Electric cars are quieter than traditional gasoline cars. (as...as)',
    targetRequirement: 'Viết lại câu dùng (as...as)',
    givenPrefix: 'Traditional gasoline cars ',
    expectedCompletion: 'are not as quiet as electric cars.',
    fullStandardAnswer: 'Traditional gasoline cars are not as quiet as electric cars.',
    acceptedAnswers: [
      'Traditional gasoline cars are not as quiet as electric cars.',
      "Traditional gasoline cars aren't as quiet as electric cars.",
      'are not as quiet as electric cars.',
      "aren't as quiet as electric cars."
    ],
    grammarRule: {
      formula: 'S1(số nhiều) + are + Adj-er + than + S2 ➜ S2 + are not as + Adj + as + S1',
      explanation: 'Chủ ngữ "Traditional gasoline cars" là danh từ số nhiều nên dùng to-be phủ định "are not" hoặc "aren\'t". "quieter" trở về dạng nguyên thể "quiet".',
      keyPoints: ['Danh từ số nhiều đi với are not / aren\'t', 'quieter ➜ as quiet as']
    }
  },
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'My elder brother drives more carefully than I do. (so...as)',
    targetRequirement: 'Viết lại câu dùng (so...as)',
    givenPrefix: 'I ',
    expectedCompletion: 'do not drive so carefully as my elder brother does.',
    fullStandardAnswer: 'I do not drive so carefully as my elder brother does.',
    acceptedAnswers: [
      'I do not drive so carefully as my elder brother does.',
      'I do not drive so carefully as my elder brother.',
      "I don't drive so carefully as my elder brother does.",
      "I don't drive so carefully as my elder brother.",
      'do not drive so carefully as my elder brother does.',
      'do not drive so carefully as my elder brother.',
      "don't drive so carefully as my elder brother does.",
      "don't drive so carefully as my elder brother."
    ],
    grammarRule: {
      formula: 'S1 + V + more Adv than + I do ➜ I + do not / don\'t + V + so + Adv + as + S1 (does)',
      explanation: 'Chủ ngữ "I" dùng trợ động từ "do not / don\'t". Đề yêu cầu (so...as) nên dùng "so carefully as".',
      keyPoints: ['Chủ ngữ I đi với do not drive', 'Đúng cấu trúc đề bài: so carefully as']
    }
  },
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'Gold is more valuable than silver. (as...as)',
    targetRequirement: 'Viết lại câu dùng (as...as)',
    givenPrefix: 'Silver ',
    expectedCompletion: 'is not as valuable as gold.',
    fullStandardAnswer: 'Silver is not as valuable as gold.',
    acceptedAnswers: [
      'Silver is not as valuable as gold.',
      "Silver isn't as valuable as gold.",
      'is not as valuable as gold.',
      "isn't as valuable as gold."
    ],
    grammarRule: {
      formula: 'S1 + is more valuable than + S2 ➜ S2 + is not as valuable as + S1',
      explanation: 'Silver là danh từ không đếm được đi với "is not". Bỏ "more", đưa về "as valuable as gold".',
      keyPoints: ['Silver đi với is not', 'as valuable as gold']
    }
  },
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'Cheetahs run faster than lions in the savannah. (as...as)',
    targetRequirement: 'Viết lại câu dùng (as...as)',
    givenPrefix: 'Lions ',
    expectedCompletion: "don't run as fast as cheetahs in the savannah.",
    fullStandardAnswer: "Lions don't run as fast as cheetahs in the savannah.",
    acceptedAnswers: [
      "Lions don't run as fast as cheetahs in the savannah.",
      'Lions do not run as fast as cheetahs in the savannah.',
      "don't run as fast as cheetahs in the savannah.",
      'do not run as fast as cheetahs in the savannah.'
    ],
    grammarRule: {
      formula: 'S1 + run faster than + S2 ➜ S2 + don\'t / do not run as fast as + S1',
      explanation: 'Lions số nhiều dùng "don\'t run". "faster" chuyển về trạng từ nguyên thể "fast" giữa "as...as".',
      keyPoints: ['Lions đi với don\'t run', 'faster ➜ as fast as']
    }
  },
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'Summer in Da Nang is hotter than summer in Sa Pa. (so...as)',
    targetRequirement: 'Viết lại câu dùng (so...as)',
    givenPrefix: 'Summer in Sa Pa ',
    expectedCompletion: 'is not so hot as summer in Da Nang.',
    fullStandardAnswer: 'Summer in Sa Pa is not so hot as summer in Da Nang.',
    acceptedAnswers: [
      'Summer in Sa Pa is not so hot as summer in Da Nang.',
      "Summer in Sa Pa isn't so hot as summer in Da Nang.",
      'is not so hot as summer in Da Nang.',
      "isn't so hot as summer in Da Nang."
    ],
    grammarRule: {
      formula: 'S1 + is hotter than + S2 ➜ S2 + is not so hot as + S1',
      explanation: 'Chủ ngữ "Summer in Sa Pa" đi với "is not / isn\'t". Bỏ đuôi -ter của "hotter" về "hot" giữa "so...as".',
      keyPoints: ['hotter ➜ so hot as', 'Chủ ngữ số ít đi với is not']
    }
  },
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'My mother cooks better than my father does. (as...as)',
    targetRequirement: 'Viết lại câu dùng (as...as)',
    givenPrefix: 'My father ',
    expectedCompletion: "doesn't cook as well as my mother does.",
    fullStandardAnswer: "My father doesn't cook as well as my mother does.",
    acceptedAnswers: [
      "My father doesn't cook as well as my mother does.",
      'My father does not cook as well as my mother does.',
      "My father doesn't cook as well as my mother.",
      'My father does not cook as well as my mother.',
      "doesn't cook as well as my mother does.",
      'does not cook as well as my mother does.',
      "doesn't cook as well as my mother.",
      'does not cook as well as my mother.'
    ],
    grammarRule: {
      formula: 'S1 + cooks better than + S2 ➜ S2 + does not cook as well as + S1',
      explanation: '"better" là so sánh hơn của trạng từ "well". Khi đưa về so sánh bằng phải chuyển về "well" (không dùng *as good as sau động từ thường).',
      keyPoints: ['cooks better ➜ doesn\'t cook as well as', 'Trạng từ đi sau cook phải là "well", không dùng "good"']
    }
  },
  {
    part: 1,
    partTitle: 'Comparative → Not as... as / Not so... as',
    originalSentence: 'This modern laptop operates more smoothly than that old PC. (so...as)',
    targetRequirement: 'Viết lại câu dùng (so...as)',
    givenPrefix: 'That old PC ',
    expectedCompletion: "doesn't operate so smoothly as this modern laptop.",
    fullStandardAnswer: "That old PC doesn't operate so smoothly as this modern laptop.",
    acceptedAnswers: [
      "That old PC doesn't operate so smoothly as this modern laptop.",
      'That old PC does not operate so smoothly as this modern laptop.',
      "doesn't operate so smoothly as this modern laptop.",
      'does not operate so smoothly as this modern laptop.'
    ],
    grammarRule: {
      formula: 'S1 + operates more smoothly than + S2 ➜ S2 + doesn\'t operate so smoothly as + S1',
      explanation: 'Chủ ngữ số ít "That old PC" mượn trợ động từ "doesn\'t / does not" + V nguyên thể "operate" + so smoothly as.',
      keyPoints: ['That old PC đi với doesn\'t operate', 'more smoothly ➜ so smoothly as']
    }
  },

  // --- PART 2: Cụm Tính từ + Danh từ ➜ Động từ + Trạng từ (Adj ➜ Adv) ---
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'Mr. Brown is a more careful driver than his colleague.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Mr. Brown drives ',
    expectedCompletion: 'more carefully than his colleague.',
    fullStandardAnswer: 'Mr. Brown drives more carefully than his colleague.',
    acceptedAnswers: [
      'Mr. Brown drives more carefully than his colleague.',
      'more carefully than his colleague.'
    ],
    grammarRule: {
      formula: 'S + is a more careful driver than... ➜ S + drives more carefully than...',
      explanation: 'Danh từ "driver" chuyển thành động từ "drives". Tính từ "careful" thêm đuôi "-ly" thành trạng từ "carefully". So sánh hơn: "more carefully than".',
      keyPoints: ['driver ➜ drives', 'careful (adj) ➜ carefully (adv)', 'more carefully than']
    }
  },
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'Sarah is a better swimmer than her elder sister.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Sarah swims ',
    expectedCompletion: 'better than her elder sister.',
    fullStandardAnswer: 'Sarah swims better than her elder sister.',
    acceptedAnswers: [
      'Sarah swims better than her elder sister.',
      'better than her elder sister.'
    ],
    grammarRule: {
      formula: 'S + is a better swimmer than... ➜ S + swims better than...',
      explanation: '"swimmer" đổi thành động từ "swims". So sánh hơn của trạng từ "well" là "better". Do đó cấu trúc giữ nguyên từ "better than".',
      keyPoints: ['swimmer ➜ swims', 'well (adv) có so sánh hơn là better']
    }
  },
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'The young chef is a more skillful cake decorator than his assistant.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'The young chef decorates ',
    expectedCompletion: 'cakes more skillfully than his assistant.',
    fullStandardAnswer: 'The young chef decorates cakes more skillfully than his assistant.',
    acceptedAnswers: [
      'The young chef decorates cakes more skillfully than his assistant.',
      'cakes more skillfully than his assistant.'
    ],
    grammarRule: {
      formula: 'S + is a more skillful [Object] decorator ➜ S + decorates + [Object] + more skillfully than...',
      explanation: '"cake decorator" chuyển thành "decorates cakes". "skillful" (adj) chuyển thành "skillfully" (adv).',
      keyPoints: ['decorator ➜ decorates cakes', 'skillful ➜ skillfully', 'more skillfully than']
    }
  },
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'Linda is a more fluent French speaker than her classmates.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Linda speaks ',
    expectedCompletion: 'French more fluently than her classmates.',
    fullStandardAnswer: 'Linda speaks French more fluently than her classmates.',
    acceptedAnswers: [
      'Linda speaks French more fluently than her classmates.',
      'French more fluently than her classmates.'
    ],
    grammarRule: {
      formula: 'S + is a more fluent [Language] speaker ➜ S + speaks [Language] + more fluently than...',
      explanation: '"speaker" chuyển thành động từ "speaks", mang theo tân ngữ "French". "fluent" (adj) chuyển thành "fluently" (adv).',
      keyPoints: ['French speaker ➜ speaks French', 'fluent ➜ fluently']
    }
  },
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'Those construction workers are harder workers than the new apprentices.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Those construction workers work ',
    expectedCompletion: 'harder than the new apprentices.',
    fullStandardAnswer: 'Those construction workers work harder than the new apprentices.',
    acceptedAnswers: [
      'Those construction workers work harder than the new apprentices.',
      'harder than the new apprentices.'
    ],
    grammarRule: {
      formula: 'S + are harder workers than... ➜ S + work harder than...',
      explanation: '"hard" là tính từ lẫn trạng từ bất quy tắc (không dùng *hardly vì hardly mang nghĩa "hầu như không"). So sánh hơn của trạng từ là "harder".',
      keyPoints: ['workers ➜ work', 'Trạng từ của hard là hard ➜ harder than (không dùng hardly)']
    }
  },
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'The violinist was a more emotional performer than other musicians in the hall.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'The violinist performed ',
    expectedCompletion: 'more emotionally than other musicians in the hall.',
    fullStandardAnswer: 'The violinist performed more emotionally than other musicians in the hall.',
    acceptedAnswers: [
      'The violinist performed more emotionally than other musicians in the hall.',
      'more emotionally than other musicians in the hall.'
    ],
    grammarRule: {
      formula: 'S + was a more emotional performer than... ➜ S + performed more emotionally than...',
      explanation: 'Tương tự như câu 12 trong bài thi của học sinh: "performer" chuyển thành động từ "performed". Tính từ "emotional" chuyển thành trạng từ "emotionally". Không thêm bất kỳ danh từ thừa nào.',
      keyPoints: ['performer ➜ performed', 'emotional ➜ emotionally', 'Không thêm từ thừa']
    }
  },
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'Alex is a more patient teacher than his colleague.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Alex teaches ',
    expectedCompletion: 'more patiently than his colleague.',
    fullStandardAnswer: 'Alex teaches more patiently than his colleague.',
    acceptedAnswers: [
      'Alex teaches more patiently than his colleague.',
      'more patiently than his colleague.'
    ],
    grammarRule: {
      formula: 'S + is a more patient teacher than... ➜ S + teaches more patiently than...',
      explanation: '"teacher" chuyển thành động từ "teaches". "patient" (adj) thêm đuôi -ly thành "patiently" (adv).',
      keyPoints: ['teacher ➜ teaches', 'patient ➜ patiently', 'more patiently than']
    }
  },
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'The little girl is a faster runner than her brother in the park.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'The little girl runs ',
    expectedCompletion: 'faster than her brother in the park.',
    fullStandardAnswer: 'The little girl runs faster than her brother in the park.',
    acceptedAnswers: [
      'The little girl runs faster than her brother in the park.',
      'The little girl runs in the park faster than her brother.',
      'faster than her brother in the park.'
    ],
    grammarRule: {
      formula: 'S + is a faster runner than... ➜ S + runs faster than...',
      explanation: '"fast" là trạng từ bất quy tắc giữ nguyên hình thức. So sánh hơn là "faster than".',
      keyPoints: ['runner ➜ runs', 'faster than']
    }
  },
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'Grandmother was a more lively storyteller than anyone in our village.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'Grandmother told stories ',
    expectedCompletion: 'more lively than anyone in our village.',
    fullStandardAnswer: 'Grandmother told stories more lively than anyone in our village.',
    acceptedAnswers: [
      'Grandmother told stories more lively than anyone in our village.',
      'Grandmother told stories more livelily than anyone in our village.',
      'more lively than anyone in our village.',
      'more livelily than anyone in our village.'
    ],
    grammarRule: {
      formula: 'S + was a more lively storyteller ➜ S + told stories more lively/livelily than...',
      explanation: '"storyteller" chuyển thành cụm động từ "told stories" (thì quá khứ đơn vì câu gốc dùng "was").',
      keyPoints: ['storyteller ➜ told stories', 'more lively than']
    }
  },
  {
    part: 2,
    partTitle: 'Adjectives → Adverbs in comparative structures',
    originalSentence: 'The Japanese craftsperson is a more delicate wood carver than the apprentice.',
    targetRequirement: 'Chuyển cụm danh từ (Adj + Noun) thành cụm động từ (Verb + Adv)',
    givenPrefix: 'The Japanese craftsperson carves ',
    expectedCompletion: 'wood more delicately than the apprentice.',
    fullStandardAnswer: 'The Japanese craftsperson carves wood more delicately than the apprentice.',
    acceptedAnswers: [
      'The Japanese craftsperson carves wood more delicately than the apprentice.',
      'wood more delicately than the apprentice.'
    ],
    grammarRule: {
      formula: 'S + is a more delicate [Object] carver ➜ S + carves [Object] + more delicately than...',
      explanation: '"wood carver" chuyển thành "carves wood". "delicate" chuyển thành trạng từ "delicately".',
      keyPoints: ['wood carver ➜ carves wood', 'delicate ➜ delicately', 'more delicately than']
    }
  }
];
