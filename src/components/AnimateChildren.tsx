import { ReactNode, Children, isValidElement } from "react";
import StaggeredAnimateIn from "./StaggeredAnimateIn";

interface AnimateChildrenProps {
  children: ReactNode;
  delayBetween?: number;
  initialDelay?: number;
  duration?: number;
}

export const AnimateChildren = ({
  children,
  delayBetween = 0.1,
  initialDelay = 0,
  duration = 0.5,
}: AnimateChildrenProps) => {
  // Razdvajanje dece u niz validnih React elemenata
  const childrenArray = Children.toArray(children).filter(isValidElement);

  return (
    <StaggeredAnimateIn
      delayBetween={delayBetween}
      initialDelay={initialDelay}
      duration={duration}
    >
      {childrenArray}
    </StaggeredAnimateIn>
  );
};

export default AnimateChildren; 