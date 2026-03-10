import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TimelineSectionProps {
  image: string;
  message: string;
  alt: string;
  index: number;
}

export default function TimelineSection({
  image,
  message,
  alt,
  index,
}: TimelineSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative py-8">
      {/* Vertical connector line */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-violet to-soft-pink -translate-x-1/2 md:block hidden"
        aria-hidden="true"
      />

      {/* Timeline dot */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-soft-pink rounded-full z-10 hidden md:block"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        aria-hidden="true"
      />

      {/* Content container */}
      <div
        className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Image side */}
        <motion.div
          className={`w-full md:w-5/12 ${isEven ? "md:text-right" : "md:text-left"}`}
          initial={{ opacity: 0, x: isEven ? -100 : 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img
              src={image}
              alt={alt}
              className="w-full h-64 md:h-80 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-black/50 to-transparent" />
          </div>
        </motion.div>

        {/* Spacer for timeline in center */}
        <div className="hidden md:block md:w-2/12" aria-hidden="true" />

        {/* Message side */}
        <motion.div
          className={`w-full md:w-5/12 ${isEven ? "md:text-left" : "md:text-right"}`}
          initial={{ opacity: 0, x: isEven ? 100 : -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 100 : -100 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed text-center md:text-inherit">
            {message}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
