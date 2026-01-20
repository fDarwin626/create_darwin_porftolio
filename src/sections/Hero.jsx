import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const sectionRef = useRef(null)
    const contentRef = useRef(null)
    const imageRef = useRef(null)
    const gradientRef = useRef(null)
    const overlayRef = useRef(null)
    const cardRef = useRef(null)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
      const ctx = gsap.context(() => {
        // Initial timeline for page load
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        
        // Set initial states
        gsap.set(imageRef.current, { scale: 1.2, opacity: 0 })
        gsap.set(contentRef.current, { y: 80, opacity: 0 })
        gsap.set(gradientRef.current, { opacity: 0 })
        gsap.set(cardRef.current, { y: 100, opacity: 0, scale: 0.9 })
        
        // Animate on load
        tl.to(imageRef.current, {
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: 'power4.out'
          })
          .to(gradientRef.current, {
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
          }, '-=1')
          .to(contentRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out'
          }, '-=0.8')
          .to(cardRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            ease: 'elastic.out(1, 0.75)'
          }, '-=0.6')

        // Subtle parallax on scroll - DISABLED ON MOBILE for performance
        if (!isMobile) {
          gsap.to(imageRef.current, {
            y: 150,
            scale: 1.1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            }
          })
        }

        // Content fade on scroll (removed blur for smooth reversal)
        gsap.fromTo(contentRef.current, 
          {
            y: 0,
            opacity: 1,
          },
          {
            y: -100,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'center top',
              scrub: 1,
            }
          }
        )

        // Card scroll animation (removed blur for smooth reversal)
        gsap.fromTo(cardRef.current,
          {
            y: 0,
            opacity: 1,
          },
          {
            y: -80,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'center top',
              scrub: 1,
            }
          }
        )

        // Overlay darkening on scroll
        gsap.to(overlayRef.current, {
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        })
      }, sectionRef)

      return () => ctx.revert()
    }, [isMobile])

    return (
      <section 
        ref={sectionRef}
        id="home" 
        style={{ 
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
    {/* Background Image */}
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      display: 'flex',           
      justifyContent: isMobile ? 'center' : 'flex-end',
      alignItems: isMobile ? 'flex-start' : 'center'
    }}>
      <img 
        ref={imageRef}
        src='/images/Client (1).png' 
        alt="hero background" 
        loading="eager"
        decoding="async"
        style={{
          width: isMobile ? '100%' : '50%',
          height: isMobile ? '50%' : '80%',
          objectFit: isMobile ? 'cover' : 'contain',
          objectPosition: isMobile ? 'top center' : 'center',
          willChange: isMobile ? 'auto' : 'transform',
          marginRight: isMobile ? '0' : '100px',
          marginTop: isMobile ? '0' : '0',
          transform: isMobile ? 'translateZ(0)' : 'none'
        }}
      />
    </div>

        {/* Dark Overlay */}
        <div 
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            background: isMobile 
              ? 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.8) 100%)'
              : 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
            opacity: isMobile ? 0.6 : 0.4,
            zIndex: 1
          }}
        />

        {/* Bottom Gradient */}
        <div 
          ref={gradientRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: isMobile ? '40%' : '20%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />

        {/* Content Container */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          alignItems: isMobile ? 'flex-end' : 'center',
          padding: isMobile ? '0 20px 80px 20px' : '0 60px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div 
            ref={contentRef}
            style={{
              maxWidth: isMobile ? '100%' : '800px',
              marginTop: '0',
              width: '100%'
            }}
          >
            {/* Subtitle */}
            <p style={{
              fontSize: isMobile ? '11px' : '16px',
              letterSpacing: isMobile ? '2px' : '3px',
              textTransform: 'uppercase',
              color: 'black',
              marginBottom: isMobile ? '16px' : '20px',
              fontWeight: '500'
            }}>
              Build, Evolve, and grow Your Brand
            </p>

            {/* Main Title */}
            <h1 style={{
              fontSize: isMobile ? '36px' : '80px',
              fontWeight: '700',
              color: 'black',
              marginBottom: isMobile ? '20px' : '30px',
              lineHeight: '1.1',
              letterSpacing: isMobile ? '-1px' : '-2px'
            }}>
              CREATE DARWIN
            </h1>

            {/* Description Text */}
            <p style={{
              fontSize: isMobile ? '14px' : '18px',
              color: 'black',
              lineHeight: isMobile ? '1.5' : '1.6',
              marginBottom: isMobile ? '32px' : '50px',
              maxWidth: isMobile ? '100%' : '600px'
            }}>
              Professional brand identity, Social media, Video editing, and full management to take your brand from simple to Powerful.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: isMobile ? '12px' : '20px',
              flexDirection: isMobile ? 'column' : 'row',
              flexWrap: 'wrap'
            }}>
              <button
              onClick={() => { window.location.href = '#featured-projects' }}
               style={{
                padding: isMobile ? '16px 32px' : '18px 45px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1))',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '50px',
                color: 'black',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                position: 'relative',
                overflow: 'hidden',
                width: isMobile ? '100%' : 'auto',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
              className="glossy-btn hover:scale-105">
                View Our Work →
              </button>

              <button 
              onClick={() => { window.location.href = '#pricing' }}
              style={{
                padding: isMobile ? '16px 32px' : '18px 45px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50px',
                color: 'black',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                width: isMobile ? '100%' : 'auto',
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation'
              }}
              className="glossy-btn-secondary hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
           </div>

        {/* Scroll Indicator - HIDDEN ON MOBILE */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            opacity: 0.8
          }}>
            <span style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              Scroll
            </span>
            <div style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)',
              animation: 'scrollLine 2s ease-in-out infinite'
            }} />
          </div>
        )}

        <style>{`
          @keyframes scrollLine {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(20px);
              opacity: 0;
            }
          }

          .glossy-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s ease;
          }

          .glossy-btn:hover::before {
            left: 100%;
          }

          .glossy-btn:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.15)) !important;
            box-shadow: 0 12px 40px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.7) !important;
            border-color: rgba(255, 255, 255, 0.5) !important;
          }

          .glossy-btn-secondary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
          }

          .glossy-btn-secondary:hover::before {
            left: 100%;
          }

          .glossy-btn-secondary:hover {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1)) !important;
            box-shadow: 0 12px 40px rgba(255, 255, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
            border-color: rgba(255, 255, 255, 0.4) !important;
          }

          .hover\\:scale-105:hover {
            transform: scale(1.05);
          }

          /* Mobile active states for better touch feedback */
          @media (max-width: 768px) {
            .glossy-btn:active,
            .glossy-btn-secondary:active {
              transform: scale(0.98) !important;
              opacity: 0.9;
            }
          }

          /* Performance optimization - reduce animations on low-end devices */
          @media (prefers-reduced-motion: reduce) {
            .glossy-btn,
            .glossy-btn-secondary,
            .glossy-btn::before,
            .glossy-btn-secondary::before {
              transition: none !important;
              animation: none !important;
            }
          }
        `}</style>
      </section>
    )
}

export default Hero