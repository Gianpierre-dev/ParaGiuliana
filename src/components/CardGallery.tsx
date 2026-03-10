import { motion } from 'framer-motion';
import FlipCard from './FlipCard';
import { cards } from '../data/content';

interface CardGalleryProps {
  onComplete: () => void;
}

export default function CardGallery({ onComplete }: CardGalleryProps) {
  return (
    <section className="min-h-screen py-16 px-4 bg-deep-black">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-soft-pink"
        >
          Momentos que guardo
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <button
            onClick={onComplete}
            className="btn-primary"
            aria-label="Continuar al quiz"
          >
            Continuar al quiz
          </button>
        </motion.div>
      </div>
    </section>
  );
}
