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

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;

  const handleAnswer = (index: number) => {
    if (correct) return;

    if (index === question.correct) {
      setCorrect(true);

      setTimeout(() => {
        if (currentQuestion === totalQuestions - 1) {
          onComplete();
        } else {
          setCurrentQuestion((prev) => prev + 1);
          setCorrect(false);
        }
      }, 800);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      {/* Progress dots */}
      <div className="flex gap-3 mb-8">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index < currentQuestion
                ? "bg-soft-pink"
                : index === currentQuestion
                  ? "bg-red-violet"
                  : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Question container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: 1,
            x: shake ? [0, -10, 10, -10, 10, 0] : 0,
          }}
          exit={{ opacity: 0, x: -50 }}
          transition={{
            duration: shake ? 0.4 : 0.3,
            ease: "easeInOut",
          }}
          className="w-full max-w-md"
        >
          {/* Question text */}
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-white">
            {question.question}
          </h2>

          {/* Options */}
          <div className="flex flex-col gap-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                whileHover={{ scale: correct ? 1 : 1.02 }}
                whileTap={{ scale: correct ? 1 : 0.98 }}
                className={`w-full py-4 px-6 rounded-xl text-lg font-medium transition-all duration-300 ${
                  correct && index === question.correct
                    ? "bg-green-500 text-white"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
                disabled={correct}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Question counter */}
      <p className="mt-8 text-white/50 text-sm">
        {currentQuestion + 1} / {totalQuestions}
      </p>
    </div>
  );
}
