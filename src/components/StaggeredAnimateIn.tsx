import { ReactNode } from "react";

interface StaggeredAnimateInProps {
  children: ReactNode[];
  delayBetween?: number;
  initialDelay?: number;
  duration?: number;
  className?: string;
}

export const StaggeredAnimateIn = ({
  children,
  delayBetween = 0.1,
  initialDelay = 0,
  duration = 0.5,
  className = "",
}: StaggeredAnimateInProps) => {
  return (
    <>
      {children.map((child, index) => {
        // Računamo delay za svaki element
        const delay = initialDelay + (index * delayBetween);
        // Pretvaramo delay u broj koji odgovara našim CSS klasama (1-10)
        const delayNum = Math.min(Math.ceil(delay * 10), 10);
        
        return (
          <div key={index} className={`animate-entrance animate-entrance-delay-${delayNum} ${className}`}>
            {child}
          </div>
        );
      })}
    </>
  );
};

export default StaggeredAnimateIn; 