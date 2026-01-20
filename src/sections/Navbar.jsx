import React from 'react';
import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { useWindowScroll } from "react-use";
import gsap from "gsap";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navContainerRef = useRef(null);  
  const { y: currentScrollY }= useWindowScroll(); 
  const [lastScrollY, setlastScrollY] = useState(0);
  const [isNavVisible, setisNavVisible] = useState(true);
  const [isFloating, setIsFloating] = useState(false);

  // Memoize nav items to prevent recreation
  const navItems = useMemo(() => ['Home', 'Services', 'Pricing', 'Contact'], []);

  // Optimize scroll handling with useCallback
  useEffect(() => {
    if (currentScrollY === 0) {
      setisNavVisible(true);
      setIsFloating(false);
      navContainerRef.current?.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down
      setisNavVisible(false);
      navContainerRef.current?.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up
      setisNavVisible(true);
      setIsFloating(true);
      navContainerRef.current?.classList.add('floating-nav');
    }
    
    setlastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]); 

  // GSAP animation optimization
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavVisible])

  // Handle mobile menu toggle - NO body scroll lock (menu doesn't cover screen)
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <style>{`
        .floating-nav {
          background: rgba(0, 0, 0, 0.95) !important;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px); /* Safari support */
          padding: 18px 22px !important;
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
          gap: 5px;
          z-index: 1001;
          padding: 8px;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .hamburger span {
          width: 24px;
          height: 2.5px;
          background: currentColor;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 2px;
          will-change: transform, opacity;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        .mobile-menu {
          position: fixed;
          top: 80px; /* Start below navbar */
          right: 12px;
          width: calc(100% - 24px);
          max-width: 340px;
          background: rgba(0, 0, 0, 0.98);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 24px 20px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .mobile-menu-item {
          font-size: 16px;
          font-weight: 600;
          color: white;
          text-decoration: none;
          padding: 14px 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-tap-highlight-color: transparent;
          border-radius: 12px;
          min-height: 48px;
          display: flex;
          align-items: center;
          text-align: left;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-menu-item:active {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(0.98);
          border-color: rgba(255, 255, 255, 0.2);
        }

        /* Desktop navigation optimization */
        .desktop-nav {
          display: flex;
          align-items: center;
        }

        .nav-hover-btn {
          -webkit-tap-highlight-color: transparent;
        }

        /* Mobile-specific styles */
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }

          .hamburger {
            display: flex;
            position: relative;
            right: 10px;
          }

          /* Optimize logo size for mobile */
          nav header img {
            width: 50px !important;
            max-width: 50px !important;
          }

          /* Adjust nav positioning for mobile */
          nav {
            padding: 8px 12px !important;
            top: 10px !important;
            left: 0 !important;
            right: 0 !important;
            width: calc(100% - 24px) !important;
            margin: 0 12px !important;
            padding-bottom: 12px !important;
          }

          nav header {
            left: 12px !important;
          }

          .floating-nav {
            padding: 8px 12px !important;
            border-radius: 16px;
          }
        }

        /* Tablet optimization */
        @media (min-width: 769px) and (max-width: 1024px) {
          nav {
            padding: 16px 24px !important;
          }
        }

        /* Performance optimization - reduce animations on low-end devices */
        @media (prefers-reduced-motion: reduce) {
          .hamburger span,
          .mobile-menu-item,
          .floating-nav {
            transition: none !important;
            animation: none !important;
          }
        }

        /* Animation with GPU acceleration */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px) translateZ(0);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateZ(0);
          }
        }

        /* Prevent text selection on interactive elements */
        .hamburger,
        .mobile-menu-item {
          user-select: none;
          -webkit-user-select: none;
        }
      `}</style>

      <nav 
        ref={navContainerRef}
        className="fixed top-[20px] left-[-2px] w-full z-50 py-6 px-8"
      >
        <div className="flex justify-end items-center">
          <header className="absolute top-1/2 left-[50px] -translate-y-1/2">
            <div className="flex items-center gap-7">
              <img 
                src={isFloating ? "/images/Asset 8.png" : "/images/Asset 11.png"}
                alt="Create Darwin Logo" 
                className="w-[8%] sm:w-20 md:w-24 transition-all duration-300"
                loading="eager" // Load logo immediately
                decoding="async"
              />
            </div>
          </header>

          {/* Desktop Navigation - UNCHANGED */}
          <div className="desktop-nav flex items-center">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="nav-hover-btn no-underline left-[-20px]"
                style={{ color: isFloating ? 'white' : 'black', transition: 'color 0.3s ease' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Hamburger Menu - OPTIMIZED */}
          <div 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            style={{ color: isFloating ? 'white' : 'black' }}
            role="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - OPTIMIZED */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu" 
          style={{ animation: 'fadeIn 0.3s ease-in-out' }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="mobile-menu-item"
              onClick={closeMobileMenu}
              style={{ 
                animation: `fadeIn 0.3s ease-in-out ${index * 0.05}s both`,
                willChange: 'transform, opacity'
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}