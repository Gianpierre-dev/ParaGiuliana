import { useState } from 'react';
import { motion } from 'framer-motion';

interface FlipCardProps {
  image: string;
  message: string;
  alt: string;
  index: number;
}

export default function FlipCard({ image, message, alt, index }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="perspective-1000 w-full h-80"
    >
      <div
        onClick={handleFlip}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Flip card: ${alt}`}
        className={`
          relative w-full h-full cursor-pointer
          preserve-3d transition-transform duration-700
          ${isFlipped ? 'rotate-y-180' : ''}
        `}
      >
        {/* Back - shown first (with heart) */}
        <div
          className="
            absolute inset-0 backface-hidden rotate-y-180
            rounded-2xl overflow-hidden
            bg-gradient-to-br from-red-violet to-deep-black
            flex flex-col
          "
        >
          {/* Image (3/4 height) */}
          <div className="h-3/4 overflow-hidden">
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Message (1/4 height) */}
          <div className="h-1/4 flex items-center justify-center p-3 bg-deep-black/80">
            <p className="text-white text-sm text-center font-medium">
              {message}
            </p>
          </div>
        </div>

        {/* Front - initial state (heart symbol) */}
        <div
          className="
            absolute inset-0 backface-hidden
            rounded-2xl overflow-hidden
            bg-gradient-to-br from-red-violet to-deep-black
            flex items-center justify-center
            hover:shadow-lg hover:shadow-red-violet/30
            transition-shadow duration-300
          "
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl"
            aria-hidden="true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-20 h-20 text-soft-pink"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
