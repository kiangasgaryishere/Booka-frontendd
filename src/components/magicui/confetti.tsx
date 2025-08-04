import { useCallback, useEffect, useRef } from "react";

interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  x?: number;
  y?: number;
  shapes?: string[];
  zIndex?: number;
  colors?: string[];
  disableForReducedMotion?: boolean;
  scalar?: number;
}

interface ConfettiInstance {
  (options?: ConfettiOptions): Promise<null>;
  reset(): void;
}

declare global {
  interface Window {
    confetti: ConfettiInstance;
  }
}

interface ConfettiProps {
  children?: React.ReactNode;
  className?: string;
  manualstart?: boolean;
  options?: ConfettiOptions;
  globalOptions?: ConfettiOptions;
  onMouseEnter?: () => void;
  [key: string]: any;
}

const Confetti = ({
  children,
  className,
  manualstart = false,
  options = {},
  globalOptions = {},
  onMouseEnter,
  ...props
}: ConfettiProps) => {
  const refAnimationInstance = useRef<number | null>(null);
  const refContainer = useRef<HTMLDivElement>(null);

  const normalizedOptions = {
    particleCount: 50,
    angle: 90,
    spread: 45,
    startVelocity: 45,
    decay: 0.9,
    gravity: 1,
    drift: 0,
    ticks: 200,
    x: 0.5,
    y: 0.5,
    shapes: ["square", "circle"],
    zIndex: 100,
    colors: [
      "#6E61FF", // Primary Booka color
      "#38a169", // Success green
      "#d69e2e", // Warning yellow
      "#9688ff", // Light purple
      "#e8e6ff", // Very light purple
      "#ffffff", // White
    ],
    disableForReducedMotion: true,
    ...globalOptions,
    ...options,
  };

  const fire = useCallback(() => {
    if (!window.confetti) {
      console.warn("Confetti library not loaded");
      return;
    }

    const makeShot = (particleRatio: number, opts: Partial<ConfettiOptions>) => {
      window.confetti({
        ...normalizedOptions,
        ...opts,
        particleCount: Math.floor(normalizedOptions.particleCount! * particleRatio),
      });
    };

    // Create multiple bursts for a more dramatic effect
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [normalizedOptions]);

  const startAnimation = useCallback(() => {
    if (!manualstart) {
      fire();
    }
  }, [fire, manualstart]);

  const stopAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      cancelAnimationFrame(refAnimationInstance.current);
      refAnimationInstance.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (onMouseEnter) {
      onMouseEnter();
    }
    if (manualstart) {
      fire();
    }
  }, [fire, manualstart, onMouseEnter]);

  useEffect(() => {
    // Load confetti library dynamically
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js";
    script.async = true;
    script.onload = () => {
      if (!manualstart) {
        // Auto-trigger confetti after a short delay
        setTimeout(startAnimation, 500);
      }
    };
    document.head.appendChild(script);

    return () => {
      stopAnimation();
      // Clean up script if component unmounts quickly
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [startAnimation, stopAnimation, manualstart]);

  return (
    <div
      ref={refContainer}
      className={className}
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </div>
  );
};

export default Confetti;
