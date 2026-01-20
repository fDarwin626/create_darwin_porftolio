import { useState, useEffect } from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import AboutServices from './sections/Services';
import PricingPreview from './sections/PricingPreview';
import Pricing from './sections/Pricing';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Loading Screen Component
const LoadingScreen = ({ isLoading }) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        opacity: isLoading ? 1 : 0,
        pointerEvents: isLoading ? 'auto' : 'none',
        transition: 'opacity 700ms ease'
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Outer rotating ring */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            border: '4px solid transparent',
            borderTopColor: 'rgba(255, 255, 255, 0.2)',
            borderRightColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            animation: 'spin 2s linear infinite'
          }}></div>
        </div>
        
        {/* Inner rotating ring - opposite direction */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid transparent',
            borderBottomColor: 'rgba(255, 255, 255, 0.4)',
            borderLeftColor: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '50%',
            animation: 'spin-reverse 2s linear infinite'
          }}></div>
        </div>
        
        {/* Center dot pulse */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            animation: 'pulse-scale 2s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Loading text */}
        <div style={{
          position: 'absolute',
          bottom: '-64px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap'
        }}>
          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '14px',
            letterSpacing: '0.3em',
            fontWeight: '300',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            LOADING
          </p>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for window to load
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <AboutServices />
        <PricingPreview />
        <Pricing />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;