import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
  distance?: number;
}

const directionVariants = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: -60 },
  right: { x: 60 },
  none: { x: 0, y: 0 },
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
  once = true,
  distance = 60,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  const dirVar = directionVariants[direction];

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={{ opacity: 0, ...dirVar }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...dirVar }}
        transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
