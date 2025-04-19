import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export const HeroAnimation: React.FC = () => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animationContainer.current) return;

    // Load the animation JSON
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/animations/loading.json', // Path to your animation JSON
    });

    // Cleanup on component unmount
    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <div ref={animationContainer} className="w-full h-80"></div>
    </div>
  );
};