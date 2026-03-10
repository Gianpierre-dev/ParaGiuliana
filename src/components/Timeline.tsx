import { motion } from "framer-motion";
import { timelineSections } from "../data/content";
import TimelineSection from "./TimelineSection";

interface TimelineProps {
  onComplete: () => void;
}

export default function Timeline({ onComplete }: TimelineProps) {
  return (
    <section
      className="min-h-screen bg-deep-black py-16 px-4"
      aria-label="Timeline de momentos especiales"
    >
      <div className="max-w-6xl mx-auto">
        {/* Animated heartbeat SVG line at top */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg
            width="200"
            height="60"
            viewBox="0 0 200 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-heartbeat"
            aria-hidden="true"
          >
            {/* Heartbeat line */}
            <motion.path
              d="M0 30 L40 30 L50 30 L60 10 L70 50 L80 20 L90 40 L100 30 L110 30 L120 10 L130 50 L140 20 L150 40 L160 30 L200 30"
              stroke="url(#heartbeat-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient
                id="heartbeat-gradient"
                x1="0"
                y1="0"
                x2="200"
                y2="0"
              >
                <stop offset="0%" stopColor="#c41e5c" />
                <stop offset="50%" stopColor="#ff6b9d" />
                <stop offset="100%" stopColor="#c41e5c" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-3xl md:text-4xl font-light text-center mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Momentos que definen a alguien{" "}
          <span className="text-soft-pink font-medium">especial</span>
        </motion.h2>

        {/* Timeline sections */}
        <div className="relative">
          {/* Main vertical line for mobile */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-violet via-soft-pink to-red-violet -translate-x-1/2 hidden md:block"
            aria-hidden="true"
          />

          {/* Timeline items */}
          {timelineSections.map((section, index) => (
            <TimelineSection
              key={index}
              image={section.image}
              message={section.message}
              alt={section.alt}
              index={index}
            />
          ))}
        </div>

        {/* Continue button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={onComplete}
            className="btn-primary text-lg"
            type="button"
            aria-label="Continuar a la siguiente seccion"
          >
            Continuar
          </button>
        </motion.div>
      </div>
    </section>
  );
}
