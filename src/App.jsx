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
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-700 ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 border-4 border-transparent border-t-white/20 border-r-white/20 rounded-full animate-spin"></div>
        </div>
        
        {/* Inner rotating ring - opposite direction */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-transparent border-b-white/40 border-l-white/40 rounded-full animate-spin-reverse"></div>
        </div>
        
        {/* Center dot pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse-scale"></div>
        </div>
        
        {/* Loading text */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <p className="text-white/60 text-sm tracking-[0.3em] font-light animate-pulse">
            LOADING
          </p>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (adjust as needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds - adjust this value

    return () => clearTimeout(timer);
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

      <style jsx>{`
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
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

        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }

        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

export default App;