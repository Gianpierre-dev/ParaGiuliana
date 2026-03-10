import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineSectionProps {
  image: string;
  message: string;
  alt: string;
  index: number;
  total: number;
}

export default function TimelineSection({
  image,
  message,
  alt,
  index,
  total,
}: TimelineSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative">
      {/* Mobile: Card layout */}
      <motion.div
        className="md:hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="relative rounded-3xl overflow-hidden card-glow">
          {/* Image */}
          <div className="relative aspect-square">
            <img
              src={image}
              alt={alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black via-deep-black/20 to-transparent" />

            {/* Number badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
              style={{
                background: 'linear-gradient(135deg, #c41e5c, #ff6b9d)',
                boxShadow: '0 0 20px rgba(196, 30, 92, 0.5)',
              }}
            >
              {index + 1}
            </motion.div>

            {/* Message overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-xl sm:text-2xl font-light text-white leading-relaxed text-glow"
              >
                "{message}"
              </motion.p>
            </div>
          </div>
        </div>

        {/* Connector line to next */}
        {index < total - 1 && (
          <div className="flex justify-center py-6">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: 40 } : {}}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="w-0.5 rounded-full"
              style={{
                background: 'linear-gradient(180deg, #c41e5c, transparent)',
              }}
            />
          </div>
        )}
      </motion.div>

      {/* Desktop: Side by side layout */}
      <div className="hidden md:block">
        <div
          className={`flex items-center gap-8 lg:gap-16 ${
            isEven ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {/* Image side */}
          <motion.div
            className="w-1/2"
            initial={{ opacity: 0, x: isEven ? -80 : 80, rotateY: isEven ? -10 : 10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative rounded-3xl overflow-hidden card-glow group">
              <img
                src={image}
                alt={alt}
                className="w-full h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-black/60 to-transparent" />

              {/* Number badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.4, type: "spring" }}
                className="absolute top-5 left-5 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                style={{
                  background: 'linear-gradient(135deg, #c41e5c, #ff6b9d)',
                  boxShadow: '0 0 25px rgba(196, 30, 92, 0.6)',
                }}
              >
                {index + 1}
              </motion.div>
            </div>
          </motion.div>

          {/* Message side */}
          <motion.div
            className={`w-1/2 ${isEven ? "text-left" : "text-right"}`}
            initial={{ opacity: 0, x: isEven ? 80 : -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-2xl lg:text-3xl xl:text-4xl font-light text-white/90 leading-relaxed">
              <span className="text-soft-pink text-4xl lg:text-5xl">"</span>
              {message}
              <span className="text-soft-pink text-4xl lg:text-5xl">"</span>
            </p>
          </motion.div>
        </div>

        {/* Connector */}
        {index < total - 1 && (
          <div className="flex justify-center py-8">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="w-0.5 h-16 origin-top"
              style={{
                background: 'linear-gradient(180deg, #c41e5c, #ff6b9d, transparent)',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
