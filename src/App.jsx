import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from './data/questions';
import { matchTypes, getMatchCode, calculateCode, axisInfo } from './data/matchTypes';

// ════════════════════════════════════════════════
// Floating hearts background
// ════════════════════════════════════════════════
function FloatingHearts({ count = 12 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 6,
        dur: 4 + Math.random() * 5,
        size: 14 + Math.random() * 18,
        emoji: ['💕', '💗', '💖', '✨', '💘', '🩷'][i % 6],
      })),
    [count],
  );
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{ left: `${h.x}%`, bottom: -30, fontSize: h.size }}
          animate={{ y: [0, -window.innerHeight - 60], opacity: [0, 0.7, 0.7, 0] }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          {h.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════
// INTRO SCREEN
// ════════════════════════════════════════════════
function IntroScreen({ onStart }) {
  return (
    <motion.div
      className="relative min-h-screen flex flex-col items-center justify-center px-5 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingHearts />

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Hero emoji */}
        <motion.div
          className="text-6xl mb-4"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          本当に相性がいい
          <br />
          <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
            異性タイプ診断
          </span>
        </motion.h1>

        <motion.p
          className="text-xs tracking-widest text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          YOUR PERFECT MATCH FINDER
        </motion.p>

        {/* Description card */}
        <motion.div
          className="bg-white/70 backdrop-blur-md rounded-2xl p-5 mb-6 shadow-lg shadow-rose-100/50 text-left space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            この診断は、あなたの<span className="font-bold text-rose-500">「好きなタイプ」</span>
            を聞くのではありません。
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            あなた自身の
            <span className="font-bold text-rose-500">深層心理と恋愛パターン</span>
            から、本当に相性がいい異性のタイプを逆算して導き出します。
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs bg-rose-50 text-rose-400 px-2 py-0.5 rounded-full">全18問</span>
            <span className="text-xs bg-pink-50 text-pink-400 px-2 py-0.5 rounded-full">約3分</span>
            <span className="text-xs bg-orange-50 text-orange-400 px-2 py-0.5 rounded-full">5軸分析</span>
          </div>
        </motion.div>

        {/* Insight */}
        <motion.p
          className="text-xs text-gray-400 mb-5 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          「理想」と「本当に合う人」は、<br />
          意外と違うかもしれない——。
        </motion.p>

        {/* Start button */}
        <motion.button
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold text-base shadow-lg shadow-rose-200/60 active:scale-95 transition-transform"
          onClick={onStart}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileTap={{ scale: 0.96 }}
        >
          診断をはじめる 💘
        </motion.button>
      </div>
    </motion.div>
  );
}

// ════════════════════════════════════════════════
// QUIZ SCREEN
// ════════════════════════════════════════════════
function QuizScreen({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({
    initiative: 0,
    expression: 0,
    distance: 0,
    values: 0,
    communication: 0,
  });
  const [direction, setDirection] = useState(1);

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  const handleAnswer = (score) => {
    const newScores = { ...scores, [q.axis]: scores[q.axis] + score };

    if (current + 1 >= questions.length) {
      const code = calculateCode(newScores);
      onComplete(code, newScores);
    } else {
      setDirection(1);
      setScores(newScores);
      setCurrent(current + 1);
    }
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center px-5 pt-8 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md w-full">
        {/* Progress */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Q{current + 1} / {questions.length}
          </span>
          <span className="text-xs text-rose-400 font-medium">
            {axisInfo[q.axis]?.icon} {axisInfo[q.axis]?.label}
          </span>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-8 leading-relaxed text-center min-h-[3.5rem]">
              {q.text}
            </h2>

            <div className="space-y-3">
              {/* Choice A */}
              <motion.button
                className="w-full text-left p-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-rose-300 shadow-sm active:scale-[0.98] transition-all text-sm sm:text-base text-gray-700 leading-relaxed"
                onClick={() => handleAnswer(q.a.score)}
                whileTap={{ scale: 0.97 }}
              >
                <span className="inline-block w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 text-white text-xs font-bold text-center leading-7 mr-3 flex-shrink-0">
                  A
                </span>
                {q.a.label}
              </motion.button>

              {/* Choice B */}
              <motion.button
                className="w-full text-left p-4 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-pink-300 shadow-sm active:scale-[0.98] transition-all text-sm sm:text-base text-gray-700 leading-relaxed"
                onClick={() => handleAnswer(q.b.score)}
                whileTap={{ scale: 0.97 }}
              >
                <span className="inline-block w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 text-white text-xs font-bold text-center leading-7 mr-3 flex-shrink-0">
                  B
                </span>
                {q.b.label}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ════════════════════════════════════════════════
// ANALYZING PHASE
// ════════════════════════════════════════════════
function AnalyzingPhase() {
  const messages = [
    'あなたの恋愛パターンを読み取っています...',
    '深層心理を分析中...',
    '相性の良い異性タイプを探しています...',
  ];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setMsgIdx((p) => (p + 1) % messages.length), 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-7xl mb-8"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💗
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.p
          key={msgIdx}
          className="text-sm text-gray-500 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {messages[msgIdx]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

// ════════════════════════════════════════════════
// RESULT SCREEN
// ════════════════════════════════════════════════
function ResultScreen({ userCode, matchCode, scores, onRestart }) {
  const [phase, setPhase] = useState('analyzing');
  const matchData = matchTypes[matchCode];
  const commsCode = scores.communication >= 0 ? 'D' : 'H';

  // Calculate match confidence (80–98%)
  const confidence = useMemo(() => {
    const axes = ['initiative', 'expression', 'distance', 'values', 'communication'];
    const totalAbs = axes.reduce((s, a) => s + Math.abs(scores[a]), 0);
    const maxTotal = 7 + 7 + 6 + 7 + 5; // max possible absolute scores per axis
    return Math.round(80 + (totalAbs / maxTotal) * 18);
  }, [scores]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('reveal'), 3500);
    const t2 = setTimeout(() => setPhase('details'), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === 'analyzing') return <AnalyzingPhase />;

  // Build axis analysis for user
  const userAxes = [
    { key: 'initiative', code: userCode[0] },
    { key: 'expression', code: userCode[1] },
    { key: 'distance', code: userCode[2] },
    { key: 'values', code: userCode[3] },
  ];

  // Share text
  const shareText = `【本当に相性がいい異性タイプ診断】\n私の理想の相手は「${matchData.name}」${matchData.emoji}\n${matchData.catchphrase}\n\n相性度 ${confidence}%\n`;
  const shareUrl = window.location.href;
  const xUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText + shareUrl)}`;
  const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(shareText + shareUrl)}`;

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center px-5 pt-8 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <FloatingHearts count={8} />

      <div className="relative z-10 max-w-md w-full">
        {/* Match reveal card */}
        <AnimatePresence>
          {(phase === 'reveal' || phase === 'details') && (
            <motion.div
              className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl shadow-rose-200/40 text-center mb-6"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.7, type: 'spring' }}
              style={{ perspective: 800 }}
            >
              <p className="text-xs text-gray-400 mb-2 tracking-wider">
                YOUR PERFECT MATCH
              </p>
              <div className="text-5xl mb-3">{matchData.emoji}</div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">
                {matchData.name}
              </h2>
              <p className="text-sm text-gray-500 mb-3">{matchData.catchphrase}</p>

              {/* Confidence badge */}
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-1.5 rounded-full">
                <span className="text-rose-400 text-xs">相性度</span>
                <span className="text-rose-500 font-bold text-lg">{confidence}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detailed sections */}
        {phase === 'details' && (
          <motion.div
            className="space-y-5"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            {/* Description */}
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                💕 このタイプの特徴
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{matchData.description}</p>
            </motion.div>

            {/* Traits */}
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                ✨ 3つの魅力ポイント
              </h3>
              <div className="space-y-2">
                {matchData.traits.map((t, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-600">{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Your analysis */}
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                🔍 あなたの深層分析
              </h3>
              <div className="space-y-3">
                {userAxes.map(({ key, code }) => {
                  const info = axisInfo[key];
                  const isPositive = code === info.positive.code;
                  const score = scores[key];
                  const maxScore = key === 'distance' ? 6 : 7;
                  const pct = Math.round(((Math.abs(score) / maxScore) * 100));
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">
                          {info.icon} {info.label}
                        </span>
                        <span className="text-xs font-medium text-rose-500">
                          {isPositive ? info.positive.label : info.negative.label}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-rose-300 to-pink-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(pct, 15)}%` }}
                          transition={{ duration: 0.8, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Why this match */}
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                💡 なぜこのタイプが最適？
              </h3>
              <div className="space-y-2.5">
                {userAxes.map(({ key, code }) => {
                  const info = axisInfo[key];
                  const reason = info.matchReason[code];
                  return (
                    <p key={key} className="text-xs text-gray-500 leading-relaxed">
                      <span className="text-rose-400 font-medium">{info.icon} {info.label}:</span>{' '}
                      {reason}
                    </p>
                  );
                })}
                <p className="text-xs text-gray-500 leading-relaxed">
                  <span className="text-rose-400 font-medium">
                    {axisInfo.communication.icon} {axisInfo.communication.label}:
                  </span>{' '}
                  {axisInfo.communication.modifier[commsCode]}
                </p>
              </div>
            </motion.div>

            {/* How to find */}
            <motion.div
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-md"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                🔎 この人の見つけ方
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{matchData.howToFind}</p>
            </motion.div>

            {/* Share buttons */}
            <motion.div
              className="space-y-3"
              variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
            >
              <p className="text-xs text-gray-400 text-center">結果をシェアする</p>
              <div className="flex gap-3">
                <a
                  href={xUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-black text-white text-sm font-bold text-center active:scale-95 transition-transform"
                >
                  𝕏 でシェア
                </a>
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl text-white text-sm font-bold text-center active:scale-95 transition-transform"
                  style={{ backgroundColor: '#06C755' }}
                >
                  LINE で送る
                </a>
              </div>

              <button
                onClick={onRestart}
                className="w-full py-3 rounded-xl bg-white/60 backdrop-blur-sm text-gray-500 text-sm border border-gray-200 active:scale-95 transition-transform"
              >
                もう一度診断する
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ════════════════════════════════════════════════
// APP
// ════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState('intro');
  const [userCode, setUserCode] = useState(null);
  const [matchCode, setMatchCode] = useState(null);
  const [scores, setScores] = useState(null);

  const handleQuizComplete = (code, newScores) => {
    const match = getMatchCode(code);
    setUserCode(code);
    setMatchCode(match);
    setScores(newScores);
    setScreen('result');
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setScreen('intro');
    setUserCode(null);
    setMatchCode(null);
    setScores(null);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
      <AnimatePresence mode="wait">
        {screen === 'intro' && <IntroScreen key="intro" onStart={() => setScreen('quiz')} />}
        {screen === 'quiz' && <QuizScreen key="quiz" onComplete={handleQuizComplete} />}
        {screen === 'result' && (
          <ResultScreen
            key="result"
            userCode={userCode}
            matchCode={matchCode}
            scores={scores}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
