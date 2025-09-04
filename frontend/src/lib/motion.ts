
export type TransitionStyles = {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit?: Record<string, any>;
  transition?: Record<string, any>;
};

export const defaultTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  duration: 0.3,
};

export const fadeIn: TransitionStyles = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: defaultTransition,
};

export const slideInRight: TransitionStyles = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 },
  transition: defaultTransition,
};

export const slideInLeft: TransitionStyles = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -100, opacity: 0 },
  transition: defaultTransition,
};

export const slideInUp: TransitionStyles = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 },
  transition: defaultTransition,
};

export const scaleIn: TransitionStyles = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: defaultTransition,
};

export const staggerContainer = (staggerChildren?: number, delayChildren?: number) => {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerChildren || 0.05,
        delayChildren: delayChildren || 0,
      },
    },
  };
};
