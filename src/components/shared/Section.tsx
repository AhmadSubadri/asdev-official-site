"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export default function Section({
  children,
  className = "",
  id,
  containerClassName = "",
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      id={id}
      className={`py-20 lg:py-32 relative overflow-hidden ${containerClassName}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`container mx-auto px-4 ${className}`}
      >
        {children}
      </motion.div>
    </section>
  );
}
