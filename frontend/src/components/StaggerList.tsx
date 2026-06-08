import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StaggerListProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'none';
}

const containerVariants = (stagger: number) => ({
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: stagger },
  },
});

const childDirections = {
  up: { y: 30 },
  down: { y: -30 },
  none: { y: 0 },
};

export default function StaggerList({
  children,
  className = '',
  staggerDelay = 0.08,
  direction = 'up',
}: StaggerListProps) {
  const dir = childDirections[direction];

  const childVariants = {
    hidden: { opacity: 0, ...dir },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants(staggerDelay)}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={childVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={childVariants}>{children}</motion.div>
      }
    </motion.div>
  );
}
