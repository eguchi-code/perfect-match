// 18 questions across 5 axes
// Positive score → first letter (L, W, C, P, D)
// Negative score → second letter (F, A, S, G, H)

export const questions = [
  // ─── Initiative (L+ / F-) ─── 4 questions
  {
    id: 1,
    axis: 'initiative',
    text: 'デートの後、相手から連絡が来なかったら？',
    a: { label: '自分から「今日楽しかったね！」と送る', score: 2 },
    b: { label: 'そわそわしながら、相手からの連絡を待つ', score: -2 },
  },
  {
    id: 2,
    axis: 'initiative',
    text: '恋人との旅行の計画は？',
    a: { label: '自分がプランを立てて相手を驚かせたい', score: 2 },
    b: { label: '相手にお任せして、ついていくのが楽しい', score: -2 },
  },
  {
    id: 3,
    axis: 'initiative',
    text: '気になる人がいたら、あなたは？',
    a: { label: '自分から積極的にアプローチする', score: 2 },
    b: { label: 'さりげなくアピールして、相手が来るのを待つ', score: -2 },
  },
  {
    id: 4,
    axis: 'initiative',
    text: 'ケンカの後の仲直り、どちらが多い？',
    a: { label: '自分から「ごめんね」と切り出す', score: 1 },
    b: { label: '相手から声をかけてほしいと思う', score: -1 },
  },

  // ─── Expression (W+ / A-) ─── 4 questions
  {
    id: 5,
    axis: 'expression',
    text: '「好き」という気持ち、どう伝える？',
    a: { label: '素直に言葉で「好きだよ」と伝える', score: 2 },
    b: { label: 'さりげない行動や態度で気持ちを示す', score: -2 },
  },
  {
    id: 6,
    axis: 'expression',
    text: '恋人が落ち込んでいるとき、あなたは？',
    a: { label: '「大丈夫？話聞くよ」と声をかける', score: 2 },
    b: { label: '黙ってそばにいる、好きなものを買ってくる', score: -2 },
  },
  {
    id: 7,
    axis: 'expression',
    text: '記念日にもらって一番嬉しいのは？',
    a: { label: '心のこもった手紙やメッセージ', score: 2 },
    b: { label: 'サプライズの行動やプレゼント', score: -2 },
  },
  {
    id: 8,
    axis: 'expression',
    text: '恋人への日頃の感謝、どう伝える？',
    a: { label: 'LINEや対面で「ありがとう」と言葉にする', score: 1 },
    b: { label: '相手の好きな料理を作る、プレゼントを贈る', score: -1 },
  },

  // ─── Distance (C+ / S-) ─── 3 questions
  {
    id: 9,
    axis: 'distance',
    text: '恋人との理想の休日は？',
    a: { label: '朝から晩までずっと一緒に過ごしたい', score: 2 },
    b: { label: '半日は一緒に、あとはそれぞれの時間も欲しい', score: -2 },
  },
  {
    id: 10,
    axis: 'distance',
    text: '恋人から「今日は一人で過ごしたい」と言われたら？',
    a: { label: '正直ちょっと寂しい…', score: 2 },
    b: { label: 'いいね！自分も自分の時間を楽しもう', score: -2 },
  },
  {
    id: 11,
    axis: 'distance',
    text: '連絡の頻度、理想はどのくらい？',
    a: { label: '毎日こまめに連絡を取り合いたい', score: 2 },
    b: { label: '会う約束の時や用事がある時でOK', score: -2 },
  },

  // ─── Values (P+ / G-) ─── 4 questions
  {
    id: 12,
    axis: 'values',
    text: '恋人に一番求めるものは？',
    a: { label: '誠実さ・安心感・信頼できること', score: 2 },
    b: { label: '一緒にいてワクワクする刺激・成長', score: -2 },
  },
  {
    id: 13,
    axis: 'values',
    text: '理想のデートはどっち？',
    a: { label: 'お気に入りの場所でゆったり過ごす', score: 2 },
    b: { label: '行ったことない場所を一緒に開拓する', score: -2 },
  },
  {
    id: 14,
    axis: 'values',
    text: '将来のパートナーに望むことは？',
    a: { label: '安定した関係を一緒に築いていくこと', score: 2 },
    b: { label: 'お互いに刺激し合って成長していくこと', score: -2 },
  },
  {
    id: 15,
    axis: 'values',
    text: '恋愛でマンネリを感じたら？',
    a: { label: '今の関係の良さを再確認して大切にしたい', score: 1 },
    b: { label: '新しいことに一緒にチャレンジしたい', score: -1 },
  },

  // ─── Communication (D+ / H-) ─── 3 questions
  {
    id: 16,
    axis: 'communication',
    text: '恋人との会話で一番幸せを感じるのは？',
    a: { label: 'お互いの本音や将来について深く語り合う時間', score: 2 },
    b: { label: '一緒に笑ったり、楽しい話題で盛り上がる時間', score: -2 },
  },
  {
    id: 17,
    axis: 'communication',
    text: '恋人に自分の悩みを…',
    a: { label: 'しっかり打ち明けて、一緒に考えたい', score: 2 },
    b: { label: '重い話は控えて、楽しい時間を優先したい', score: -2 },
  },
  {
    id: 18,
    axis: 'communication',
    text: '「もっとこうしてほしい」と思ったとき、あなたは？',
    a: { label: 'ちゃんと言葉にして話し合いたい', score: 1 },
    b: { label: '様子を見ながら自然に合わせていく', score: -1 },
  },
];
