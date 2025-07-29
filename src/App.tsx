// In your App.tsx
import { useState, useEffect } from 'react';
import Portfolio from './Portfolio'; // Desktop version
import ResponsiveMobilePortfolio from './Responsive'; // Mobile version

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1028);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className="App">
      {isMobile ? <ResponsiveMobilePortfolio /> : <Portfolio />}
    </div>
  );
}

export default App;