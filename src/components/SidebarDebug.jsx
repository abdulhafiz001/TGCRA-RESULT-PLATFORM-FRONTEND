import { useState, useEffect } from 'react';

const SidebarDebug = () => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateScreenInfo = () => {
      const width = window.innerWidth;
      setScreenWidth(width);
      setIsDesktop(width >= 768);
    };

    updateScreenInfo();
    window.addEventListener('resize', updateScreenInfo);

    return () => window.removeEventListener('resize', updateScreenInfo);
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-sm z-50">
      <div>Screen: {screenWidth}px</div>
      <div>Desktop: {isDesktop ? 'Yes' : 'No'}</div>
      <div>Breakpoint: {screenWidth >= 768 ? '≥md' : '<md'}</div>
    </div>
  );
};

export default SidebarDebug;
