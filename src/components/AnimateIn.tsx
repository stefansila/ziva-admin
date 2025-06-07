import { ReactNode } from "react";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}

export const AnimateIn = ({
  children,
  delay = 0,
  className = "",
  duration = 0.5,
}: AnimateInProps) => {
  // Pretvaramo delay u broj koji odgovara našim CSS klasama
  const delayClass = `animate-entrance-delay-${Math.ceil(delay * 10)}`;

  return (
    <div className={`animate-entrance ${delayClass} ${className}`}>
      {children}
    </div>
  );
};

export default AnimateIn; 