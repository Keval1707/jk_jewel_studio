import React, { useEffect, useRef, useState } from 'react';

const FadeIn = ({ children, className = '', threshold = 0.1, ...props }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Remove to animate only once
        }
      },
      {
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`fadein ${isVisible ? 'show' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeIn;
