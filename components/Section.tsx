import React, { ReactNode } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  animate?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, id, className = "", animate = true }) => {
  const ref = useScrollAnimation(0.1);

  return (
    <section id={id} className={`py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
      <div ref={animate ? ref : null} className={animate ? "reveal" : ""}>
        {children}
      </div>
    </section>
  );
};

export default Section;