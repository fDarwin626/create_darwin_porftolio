import React, { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AboutServices = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const servicesRef = useRef([])
  
  const services = [
    {
      number: "01",
      title: "Brand Identity",
      description: "Professional logos, colors, typography, and complete brand strategy to establish your unique presence.",
      categoryId: "brand" 
    },
    {
      number: "02",
      title: "Social Media Design",
      description: "Consistent, branded content across all platforms to keep your audience engaged and growing.",
      categoryId: "social" 
    },
    {
      number: "03",
      title: "Video Editing",
      description: "Professional video edits with motion graphics, transitions, and effects that boost engagement.",
      categoryId: "video" 
    },
    {
      number: "04",
      title: "Full Management",
      description: "Complete social media management from content creation to posting and community engagement.",
      categoryId: "bundle" 
    }
  ]

  // Optimized click handler with useCallback
  const handleCardClick = useCallback((categoryId) => {
    window.location.hash = categoryId
    
    setTimeout(() => {
      const pricingSection = document.getElementById('pricing')
      if (pricingSection) {
        pricingSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    }, 100)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal animation with scale
      gsap.from(sectionRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'top 60%',
          scrub: 1,
        }
      })

      // Header animation
      gsap.from(headerRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      })

      // Services cards stagger animation
      servicesRef.current.forEach((card, index) => {
        if (!card) return
        
        gsap.from(card, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 0.8,
          delay: 0.3 + (index * 0.1),
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        })

        // Hover animation
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -12,
            scale: 1.02,
            duration: 0.5,
            ease: 'power2.out'
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          })
        }

        card.addEventListener('mouseenter', handleMouseEnter)
        card.addEventListener('mouseleave', handleMouseLeave)

        // Cleanup event listeners
        return () => {
          card.removeEventListener('mouseenter', handleMouseEnter)
          card.removeEventListener('mouseleave', handleMouseLeave)
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id='services'
      ref={sectionRef}
      style={{ 
        backgroundColor: '#000000',
        paddingTop: '120px',
        paddingBottom: '120px',
        position: 'relative',
        zIndex: 10,
        marginTop: '-5vh',
        boxShadow: '0 -50px 100px rgba(0, 0, 0, 1)',
        willChange: 'transform, opacity'
      }}
      className="min-h-screen w-full px-8 sm:px-12 md:px-16 lg:px-24 xl:px-40"
    >
      {/* Decorative top glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        filter: 'blur(1px)'
      }} />

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: '100px', willChange: 'transform, opacity' }}>
          <div className="flex items-end justify-between gap-12 flex-wrap header-wrapper">
            <div className="flex-1 min-w-[300px] header-left">
              <div className="badge-wrapper" style={{
                display: 'inline-block',
                marginBottom: '32px',
                padding: '8px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50px',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  letterSpacing: '0.15em',
                  fontSize: '12px'
                }} 
                   className="uppercase font-light">
                  What We Do
                </p>
              </div>
              <h1 style={{ color: '#ffffff' }} 
                  className="font-bold leading-[1.1] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl main-heading">
                Evolution Starts
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Here
                </span>
              </h1>
            </div>
            
            <div className="flex-1 min-w-[300px] header-right">
              <p style={{ color: 'rgba(255, 255, 255, 0.65)' }} 
                 className="leading-relaxed font-light text-base md:text-lg lg:text-xl">
                  We help brands and startups gain an unfair advantage in their market through
                  cutting-edge design and social media strategies that captivate and convert.
                  Branding, social media, and video editing services tailored to your unique needs.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          padding: '1px',
          borderRadius: '12px',
          overflow: 'hidden'
        }}
        className="services-grid">
          {services.map((service, index) => (
            <div
              key={service.categoryId}
              ref={(el) => (servicesRef.current[index] = el)}
              onClick={() => handleCardClick(service.categoryId)}
              style={{ 
                backgroundColor: '#000000',
                padding: '48px 32px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: index === 0 ? '12px 0 0 0' : 
                             index === 1 ? '0 12px 0 0' :
                             index === 2 ? '0 0 0 12px' :
                             index === 3 ? '0 0 12px 0' : '0',
                willChange: 'transform, opacity'
              }}
              className="group relative cursor-pointer transition-all duration-700 service-card"
            >
              {/* Animated background gradient */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
                  opacity: 0,
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                  transform: 'scale(0.8)',
                  willChange: 'opacity, transform'
                }}
                className="group-hover:opacity-100 group-hover:scale-100"
              />

              {/* Glow effect on hover */}
              <div 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  opacity: 0,
                  filter: 'blur(40px)',
                  transition: 'opacity 0.7s ease',
                  willChange: 'opacity'
                }}
                className="group-hover:opacity-100"
              />

              <div style={{ position: 'relative', zIndex: 1 }} className="card-content">
                {/* Number with gradient */}
                <span style={{ 
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.2em',
                  display: 'block',
                  marginBottom: '24px'
                }} 
                      className="transition-all duration-500 group-hover:tracking-[0.3em] card-number">
                  {service.number}
                </span>

                {/* Title */}
                <h3 style={{ 
                  color: '#ffffff',
                  marginBottom: '20px',
                  fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: '600',
                  lineHeight: '1.2'
                }} 
                    className="transition-all duration-500 group-hover:translate-x-2 card-title">
                  {service.title}
                </h3>

                {/* Description */}
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.55)',
                  lineHeight: '1.8',
                  fontSize: '15px'
                }} 
                   className="transition-colors duration-500 group-hover:text-white/75 card-description">
                  {service.description}
                </p>

                {/* Explore button */}
                <div style={{
                  marginTop: '40px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 24px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '50px',
                  opacity: 0,
                  transform: 'translateY(10px)',
                  transition: 'all 0.5s ease',
                  willChange: 'opacity, transform'
                }}
                className="group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-white/5 explore-btn">
                  <span style={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: '500'
                  }}>
                    Explore
                  </span>
                  <svg 
                    style={{ 
                      stroke: 'rgba(255, 255, 255, 0.8)',
                      transition: 'transform 0.3s ease'
                    }}
                    className="group-hover:translate-x-1"
                    width="16" 
                    height="16" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>

              {/* Bottom shimmer line */}
              <div style={{ 
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '1px',
                width: '0%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                transition: 'width 0.8s ease',
                filter: 'blur(0.5px)',
                willChange: 'width'
              }} 
              className="group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Mobile: 2x2 grid with EXACT desktop styling, just centered text */
        @media (max-width: 767px) {
          /* Header centering on mobile */
          .header-wrapper {
            flex-direction: column;
            align-items: center !important;
            text-align: center;
          }

          .header-left,
          .header-right {
            min-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .badge-wrapper {
            margin-left: auto;
            margin-right: auto;
          }

          .main-heading {
            text-align: center;
          }

          .header-right p {
            text-align: center;
          }

          /* Services grid: 2x2 layout, smaller cards */
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 600px;
            margin: 0 auto;
          }

          /* Cards keep EXACT same styling, just smaller padding */
          .service-card {
            padding: 32px 20px !important;
          }

          /* Center all card content on mobile */
          .card-content {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .card-number,
          .card-title,
          .card-description {
            text-align: center;
          }

          .card-title {
            font-size: clamp(20px, 5vw, 28px) !important;
          }

          .card-description {
            font-size: 14px !important;
          }

          .explore-btn {
            margin-top: 32px !important;
          }

          /* Disable hover translate on mobile for title */
          .group:hover .card-title {
            transform: translateX(0) !important;
          }
        }

        /* Extra small mobile */
        @media (max-width: 480px) {
          .services-grid {
            max-width: 100%;
          }

          .service-card {
            padding: 28px 16px !important;
          }

          .card-title {
            font-size: 20px !important;
            margin-bottom: 16px !important;
          }

          .card-description {
            font-size: 13px !important;
            line-height: 1.6 !important;
          }

          .explore-btn {
            padding: 10px 20px !important;
            margin-top: 28px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default AboutServices