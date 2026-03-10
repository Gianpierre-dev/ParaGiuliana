import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { quizQuestions } from "../data/content";

interface QuizProps {
  onComplete: () => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [shake, setShake] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [selectedWrong, setSelectedWrong] = useState<number | null>(null);

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;

  const handleAnswer = (index: number) => {
    if (correct) return;

    if (index === question.correct) {
      setCorrect(true);
      setSelectedWrong(null);

      setTimeout(() => {
        if (currentQuestion === totalQuestions - 1) {
          onComplete();
        } else {
          setCurrentQuestion((prev) => prev + 1);
          setCorrect(false);
        }
      }, 1000);
    } else {
      setShake(true);
      setSelectedWrong(index);
      setTimeout(() => {
        setShake(false);
        setSelectedWrong(null);
      }, 600);
    }
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0f0a0d 0%, #050505 100%)',
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-48 h-48 bg-red-violet/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-soft-pink/5 rounded-full blur-3xl animate-float-slow" />
        {/* Floating question marks */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-violet/10 text-4xl sm:text-6xl font-bold"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [-5, 5, -5],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            ?
          </motion.div>
        ))}
      </div>

      {/* Quiz title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h1 className="text-xl sm:text-2xl font-light text-white/80">
          ¿Qué tanto me conoces?
        </h1>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-md mb-8 px-4">
        <div className="flex items-center gap-2 mb-2">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex-1 h-2 rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: index < currentQuestion ? '100%' : index === currentQuestion ? '50%' : '0%',
                }}
                style={{
                  background: index < currentQuestion
                    ? 'linear-gradient(90deg, #c41e5c, #ff6b9d)'
                    : index === currentQuestion
                      ? 'linear-gradient(90deg, #c41e5c, #ff6b9d)'
                      : 'transparent',
                }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>
        <p className="text-center text-white/40 text-xs">
          Pregunta {currentQuestion + 1} de {totalQuestions}
        </p>
      </div>

      {/* Question container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{
            opacity: 1,
            x: shake ? [0, -15, 15, -15, 15, 0] : 0,
            scale: 1,
          }}
          exit={{ opacity: 0, x: -50, scale: 0.95 }}
          transition={{
            duration: shake ? 0.5 : 0.4,
            ease: "easeOut",
          }}
          className="w-full max-w-md px-4 relative z-10"
        >
          {/* Question card */}
          <motion.div
            className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(196, 30, 92, 0.15) 0%, rgba(10, 10, 10, 0.9) 100%)',
              boxShadow: '0 0 40px rgba(196, 30, 92, 0.2), 0 20px 40px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(196, 30, 92, 0.2)',
            }}
          >
            <motion.span
              className="block text-3xl sm:text-4xl mb-4 text-center"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🤔
            </motion.span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-center text-white leading-relaxed">
              {question.question}
            </h2>
          </motion.div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: correct ? 1 : 1.02, x: correct ? 0 : 5 }}
                whileTap={{ scale: correct ? 1 : 0.98 }}
                disabled={correct}
                className="w-full py-4 px-6 rounded-xl sm:rounded-2xl text-base sm:text-lg font-medium transition-all duration-300 text-left"
                style={{
                  background:
                    correct && index === question.correct
                      ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                      : selectedWrong === index
                        ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                        : 'rgba(255, 255, 255, 0.05)',
                  border:
                    correct && index === question.correct
                      ? '2px solid #22c55e'
                      : selectedWrong === index
                        ? '2px solid #ef4444'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow:
                    correct && index === question.correct
                      ? '0 0 30px rgba(34, 197, 94, 0.4)'
                      : selectedWrong === index
                        ? '0 0 20px rgba(239, 68, 68, 0.3)'
                        : 'none',
                }}
              >
                <span className="flex items-center gap-3">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background:
                        correct && index === question.correct
                          ? 'rgba(255,255,255,0.3)'
                          : selectedWrong === index
                            ? 'rgba(255,255,255,0.3)'
                            : 'linear-gradient(135deg, #c41e5c, #ff6b9d)',
                    }}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-white">{option}</span>
                  {correct && index === question.correct && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-xl"
                    >
                      ✓
                    </motion.span>
                  )}
                  {selectedWrong === index && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto text-xl"
                    >
                      ✗
                    </motion.span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Correct answer celebration */}
      <AnimatePresence>
        {correct && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], rotate: [0, 360] }}
              transition={{ duration: 0.8 }}
              className="text-6xl sm:text-8xl"
            >
              💖
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
