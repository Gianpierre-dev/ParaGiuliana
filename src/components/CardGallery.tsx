import { motion } from 'framer-motion';
import FlipCard from './FlipCard';
import { cards } from '../data/content';

interface CardGalleryProps {
  onComplete: () => void;
}

export default function CardGallery({ onComplete }: CardGalleryProps) {
  return (
    <section
      className="min-h-screen py-12 sm:py-16 px-4"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 30%, #0f0808 70%, #050505 100%)',
      }}
    >
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-red-violet/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-soft-pink/5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="text-4xl sm:text-5xl" style={{ filter: 'drop-shadow(0 0 10px rgba(255, 107, 157, 0.5))' }}>
              💝
            </span>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light">
            <span className="text-white/90">Momentos que </span>
            <span className="text-gradient text-glow font-medium">guardo en el corazón</span>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="text-white/50 mt-3 text-sm sm:text-base"
          >
            Toca cada carta para revelar un recuerdo
          </motion.p>
        </motion.div>

        {/* Cards grid - responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-12">
          {cards.map((card, index) => (
            <FlipCard
              key={index}
              image={card.image}
              message={card.message}
              alt={card.alt}
              index={index}
            />
          ))}
        </div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4"
            aria-label="Continuar al quiz"
          >
            <span className="flex items-center gap-3">
              Continuar al quiz
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
