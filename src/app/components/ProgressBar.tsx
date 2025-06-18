import React, { useEffect, useRef, useState } from 'react';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const lastLoggedPercent = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(percent);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const last = lastLoggedPercent.current;
    const diff = Math.abs(progress - last);
    if (progress % 10 === 0 && progress !== last) {
      console.log(`Scroll: ${progress}%`);
      lastLoggedPercent.current = progress;
    } else if (diff >= 10) {
      // Si el usuario salta más de 10% de golpe
      const direction = progress > last ? 10 : -10;
      const nextLogged = last + direction;
      if ((direction > 0 && progress >= nextLogged) || (direction < 0 && progress <= nextLogged)) {
        console.log(`Scroll: ${progress}%`);
        lastLoggedPercent.current = progress;
      }
    }
  }, [progress]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '16px',
      zIndex: 9999,
      background: 'rgba(255,255,255,0.08)',
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: 'var(--color-primary, #F7392F)',
        transition: 'width 0.2s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: '0 0 8px 0 var(--color-primary, #F7392F)',
      }} />
    </div>
  );
};

export default ProgressBar; 