import type { Variants, Transition } from 'framer-motion';

// Type-safe easing functions
export const easings = {
  easeOut: [0.25, 0.1, 0.25, 1] as const,
  easeIn: [0.42, 0, 1, 1] as const,
  easeInOut: [0.42, 0, 0.58, 1] as const,
  linear: [0, 0, 1, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
} satisfies Record<string, readonly [number, number, number, number]>;

// Standard transition configurations
export const transitions = {
  fast: { duration: 0.2 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
  slower: { duration: 0.6 },
} satisfies Record<string, Transition>;

// Common animation variants
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.easeOut
    }
  }
};

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easings.easeOut
    }
  }
};

export const slideInFromBottom: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.easeOut
    }
  }
};

// Container variants for staggered animations
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      ease: easings.easeOut
    }
  }
};

export const staggerContainerFast: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
      ease: easings.easeOut
    }
  }
};

// Page-specific variants
export const pageContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
      ease: easings.easeOut
    }
  }
};

export const pageItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.easeOut
    }
  }
};

// Special animation variants
export const celebratory: Variants = {
  initial: { 
    scale: 1, 
    rotate: 0 
  },
  celebrate: {
    scale: [1, 1.1, 1],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 2,
      repeat: 2,
      ease: easings.bounce
    }
  }
};

export const floatingAnimation: Variants = {
  initial: { 
    y: 0 
  },
  animate: {
    y: [-8, 0, -8],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easings.easeInOut
    }
  }
};

// Button and interactive element variants
export const buttonHover = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: easings.easeOut
  }
};

export const buttonTap = {
  scale: 0.98,
  transition: {
    duration: 0.1,
    ease: easings.easeOut
  }
};

// Modal and overlay variants
export const modalBackdrop: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: easings.easeOut
    }
  }
};

export const modalContent: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95, 
    y: -10 
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: easings.easeOut
    }
  }
};

// Dropdown and select variants
export const dropdownContainer: Variants = {
  hidden: { 
    opacity: 0, 
    y: -10, 
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: easings.easeOut
    }
  }
};

// Error and success message variants
export const messageSlideIn: Variants = {
  hidden: { 
    opacity: 0, 
    y: -10 
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: easings.easeOut
    }
  }
};

// Loading and spinner variants
export const spinnerContainer: Variants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const spinnerCircle: Variants = {
  start: {
    y: '0%',
  },
  end: {
    y: '100%',
  },
};

export const spinnerTransition: Transition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  ease: easings.easeInOut,
};

// Utility functions for creating custom variants
export const createFadeInVariant = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration,
      delay,
      ease: easings.easeOut
    }
  }
});

export const createSlideInVariant = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance = 30,
  duration = 0.5
): Variants => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: distance };
      case 'right': return { x: -distance };
    }
  };

  const getFinalPosition = () => {
    switch (direction) {
      case 'up':
      case 'down': return { y: 0 };
      case 'left':
      case 'right': return { x: 0 };
    }
  };

  return {
    hidden: { 
      opacity: 0, 
      ...getInitialPosition() 
    },
    visible: {
      opacity: 1,
      ...getFinalPosition(),
      transition: {
        duration,
        ease: easings.easeOut
      }
    }
  };
};
