import { motion } from "framer-motion";
import { timelineSections } from "../data/content";
import TimelineSection from "./TimelineSection";

interface TimelineProps {
  onComplete: () => void;
}

export default function Timeline({ onComplete }: TimelineProps) {
  return (
    <section
      className="min-h-screen py-12 sm:py-16 px-4"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 50%, #050505 100%)',
      }}
      aria-label="Timeline de momentos especiales"
    >
      <div className="max-w-5xl mx-auto">
        {/* Animated heartbeat SVG */}
        <motion.div
          className="flex justify-center mb-8 sm:mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <svg
            width="280"
            height="60"
            viewBox="0 0 280 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-48 sm:w-64 md:w-72"
            aria-hidden="true"
          >
            <motion.path
              d="M0 30 L60 30 L80 30 L95 5 L110 55 L125 15 L140 45 L155 30 L170 30 L185 5 L200 55 L215 15 L230 45 L245 30 L280 30"
              stroke="url(#heartbeat-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="heartbeat-gradient" x1="0" y1="0" x2="280" y2="0">
                <stop offset="0%" stopColor="#c41e5c" />
                <stop offset="25%" stopColor="#ff6b9d" />
                <stop offset="50%" stopColor="#ff2d75" />
                <stop offset="75%" stopColor="#ff6b9d" />
                <stop offset="100%" stopColor="#c41e5c" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-center mb-10 sm:mb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="text-white/90">Momentos que definen a alguien</span>
          <br className="sm:hidden" />
          <span className="text-gradient text-glow font-medium"> especial</span>
        </motion.h2>

        {/* Timeline sections */}
        <div className="space-y-12 sm:space-y-20 md:space-y-24">
          {timelineSections.map((section, index) => (
            <TimelineSection
              key={index}
              image={section.image}
              message={section.message}
              alt={section.alt}
              index={index}
              total={timelineSections.length}
            />
          ))}
        </div>

        {/* Continue button */}
        <motion.div
          className="flex justify-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-10 py-4"
            type="button"
            aria-label="Continuar a la siguiente seccion"
          >
            <span className="flex items-center gap-3">
              Continuar
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
