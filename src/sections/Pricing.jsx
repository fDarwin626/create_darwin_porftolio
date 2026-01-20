import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Icon } from '@iconify/react';
import { projects } from '../constants/projects';
import { categories } from '../constants/pricing';

gsap.registerPlugin(ScrollTrigger)

// Hide scrollbar CSS

const scrollbarHideStyle = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* MOBILE RESPONSIVE STYLES */
  @media (max-width: 767px) {
    /* Header text smaller */
    .pricing-main-title {
      font-size: clamp(32px, 8vw, 42px) !important;
    }
    
    .pricing-subtitle {
      font-size: 14px !important;
    }

    /* Category header smaller */
    .category-title {
      font-size: clamp(24px, 6vw, 32px) !important;
    }

    .category-subtitle {
      font-size: 14px !important;
    }

    /* Tab buttons stack better WITH TEXT */
    .pricing-tabs {
      gap: 8px !important;
      padding: 0 16px;
    }

    .tab-button {
      padding: 10px 16px !important;
      font-size: 11px !important;
      min-width: calc(50% - 4px) !important;
      flex: 0 0 calc(50% - 4px) !important;
    }

    .tab-label {
      font-size: 11px !important;
    }

    .tab-icon {
      margin-right: 6px !important;
    }

    /* HORIZONTAL SCROLL FOR PRICING CARDS */
    .pricing-cards-wrapper {
      display: flex !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      scroll-snap-type: x mandatory !important;
      -webkit-overflow-scrolling: touch !important;
      gap: 20px !important;
      padding: 20px 24px !important;
      margin: 0 !important;
    }

    .pricing-cards-wrapper::after {
      content: '';
      flex: 0 0 1px;
    }

    .pricing-card {
      flex: 0 0 85% !important;
      min-width: 280px !important;
      max-width: 320px !important;
      scroll-snap-align: center !important;
      transform: scale(1) !important;
      padding: 32px 24px !important;
    }

    .package-name {
      font-size: 24px !important;
    }

    .package-tagline {
      font-size: 13px !important;
    }

    .price-amount {
      font-size: 40px !important;
    }

    .price-period {
      font-size: 16px !important;
    }

    .package-features li {
      font-size: 13px !important;
    }

    /* ===== FEATURED PROJECTS SECTION ===== */
    .featured-projects-header {
      margin-top: 80px !important;
      margin-bottom: 60px !important;
    }

    .featured-projects-header h2 {
      font-size: clamp(28px, 7vw, 40px) !important;
    }

    .featured-projects-header p {
      font-size: 14px !important;
      padding: 0 10px !important;
    }

    /* ===== STACKED COLUMN LAYOUT (1 CARD PER ROW) ===== */
    .featured-projects-grid {
      grid-template-columns: 1fr !important;
      gap: 40px !important;
      padding: 0 20px !important;
      margin-bottom: 80px !important;
    }

    .project-image-container {
      height: 280px !important;
    }

    .project-info {
      padding: 24px 20px !important;
    }

    .project-name {
      font-size: 22px !important;
    }

    .project-arrow {
      width: 40px !important;
      height: 40px !important;
    }

    .project-arrow span {
      font-size: 20px !important;
    }

  }
`


const Pricing = () => {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const tabsRef = useRef(null)
  const cardsRef = useRef([])
  const projectsSectionRef = useRef(null)
  const projectCardsRef = useRef([])
  const [activeTab, setActiveTab] = useState('brand')
  const [hoveredProject, setHoveredProject] = useState(null)

  const tabs = [
    { id: 'brand', label: 'Brand Identity', icon: <Icon icon="streamline-freehand-color:design-tool-pen-brush-cup"
         width="24" height="24" /> },
    { id: 'social', label: 'Social Media', icon: <Icon icon="wpf:iphone" width="26" height="26"  className="color: #acc68c" /> },
    { id: 'video', label: 'Video Content', icon: <Icon icon="streamline-pixel:video-movies-set-equipment" width="22" height="22" 
         className="color: #acc68c" /> },
    { id: 'bundle', label: 'Full Management', icon: <Icon icon="streamline-freehand-color:settings-cog-double-1" width="24" height="24" /> }
  ]

  // WHATSAPP INTEGRATION - Professional inquiry system
  const handlePackageClick = (pkg, categoryName) => {
    const phoneNumber = '2349137416269' // WhatsApp number format: country code + number (no + or spaces)
    
    // Professional message template
    const message = `Hello Create Darwin,

I am interested in the *${pkg.name}* package from your ${categoryName} services.

*Package Details:*
Price: ${pkg.price}${pkg.period || ''}
Category: ${categoryName}

*Key Features Include:*
${pkg.features.slice(0, 4).map((feature, i) => `${i + 1}. ${feature}`).join('\n')}
${pkg.features.length > 4 ? `\n... plus ${pkg.features.length - 4} more features` : ''}

I would like to discuss this package further and explore how we can work together.

Please let me know your availability for a consultation.

Thank you.`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal
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

      // Tabs animation
      gsap.from(tabsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse'
        }
      })

      // Featured Projects Section Animation
      if (projectsSectionRef.current) {
        gsap.from(projectsSectionRef.current.children[0], {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        })

        gsap.from(projectsSectionRef.current.children[1], {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: projectsSectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        })
      }

      // STAGGERED 3D REVEAL FOR PROJECT CARDS
      projectCardsRef.current.forEach((card, index) => {
        if (!card) return

        // Initial state
        gsap.set(card, {
          rotationY: -90,
          rotationX: 20,
          scale: 0.7,
          opacity: 0,
          z: -300
        })

        // Reveal animation on scroll
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          opacity: 1,
          z: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        })

        // Parallax effect on scroll
        gsap.to(card, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Check for hash in URL on mount and hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && categories[hash]) {
        setActiveTab(hash)
      }
    }

    // Check on mount
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    // Animate cards when tab changes
    cardsRef.current.forEach((card, index) => {
      if (!card) return
      
      gsap.fromTo(card,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'back.out(1.2)'
        }
      )
    })
  }, [activeTab])

  const currentCategory = categories[activeTab]

  return (
    <>
      <style>{scrollbarHideStyle}</style>
      <section 
        id='pricing'
        ref={sectionRef}
        style={{ 
          backgroundColor: '#000000',
          paddingTop: '120px',
          paddingBottom: '120px',
          position: 'relative',
          zIndex: 10,
          marginTop: '-5vh',
          boxShadow: '0 -50px 100px rgba(0, 0, 0, 1)'
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
          <div ref={headerRef} style={{ marginBottom: '80px', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              marginBottom: '24px',
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
                Our Packages
              </p>
            </div>
            
          <h1 style={{ 
            color: '#ffffff',
            marginBottom: '24px'
          }} 
              className="font-bold leading-[1.1] tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl pricing-main-title">
              Choose Your
              <br />
              <span style={{
                background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.5) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Evolution Path
              </span>
            </h1>

            <p style={{ 
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: '600px',
              margin: '0 auto'
            }} 
               className="text-base md:text-lg leading-relaxed pricing-subtitle">

              From starter packages to complete brand management, we have the perfect solution for your growth journey.
            </p>
          </div>

          {/* Tabs */}
<div ref={tabsRef} style={{ 
  marginBottom: '60px',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '12px'
}}
className="pricing-tabs">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      style={{
        padding: '14px 28px',
        background: activeTab === tab.id ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${activeTab === tab.id ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: '50px',
        color: activeTab === tab.id ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
        fontSize: '14px',
        fontWeight: '500',
        letterSpacing: '0.05em',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)'
      }}
      className="hover:bg-white/10 hover:border-white/30 tab-button"
    >
      <span style={{ marginRight: '8px' }} className="tab-icon">{tab.icon}</span>
      <span className="tab-label">{tab.label}</span>
    </button>
  ))}
</div>
          {/* Category Header */}
          <div style={{ 
            textAlign: 'center',
            marginBottom: '60px'
          }}
          className="category-header">
            <h2 style={{ 
              color: '#ffffff',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: '700',
              marginBottom: '16px'
            }}>
              {currentCategory.title}
            </h2>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '16px',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              {currentCategory.subtitle}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-cards-wrapper" style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
            {currentCategory.packages.map((pkg, index) => (
              <div
                key={pkg.name}
                ref={(el) => (cardsRef.current[index] = el)}
                style={{
                  background: pkg.popular 
                    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: pkg.popular 
                    ? '2px solid rgba(255, 255, 255, 0.2)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '40px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                  transform: pkg.popular ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.5s ease'
                }}
                className="group hover:border-white/30 hover:shadow-2xl pricing-card"
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '6px 16px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50px',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#ffffff'
                  }}>
                    Most Popular
                  </div>
                )}

                {/* Glow effect */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                  opacity: 0,
                  filter: 'blur(60px)',
                  transition: 'opacity 0.5s ease',
                  pointerEvents: 'none'
                }}
                className="group-hover:opacity-100" />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Package name */}
                  <h3 style={{
                    color: '#ffffff',
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '8px'
                  }}
                  className="package-name">
                    {pkg.name}
                  </h3>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      fontSize: '14px',
                      marginBottom: '24px'
                    }}
                    className="package-tagline">
                    {pkg.tagline}
                  </p>

                  {/* Price */}
                  <div style={{ marginBottom: '32px' }} className="package-price">
                    <span style={{
                      fontSize: '48px',
                      fontWeight: '700',
                      color: '#ffffff',
                      lineHeight: '1'
                    }}
                    className="price-amount">
                      {pkg.price}
                    </span>
                    {pkg.period && (
                    <span style={{
                      fontSize: '18px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      marginLeft: '4px'
                    }}
                    className="price-period">
                        {pkg.period}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: '0 0 32px 0'
                    }}
                    className="package-features">
                    {pkg.features.map((feature, i) => (
                      <li key={i} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        marginBottom: '12px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '14px',
                        lineHeight: '1.6'
                      }}>
                        <span style={{
                          color: 'rgba(255, 255, 255, 0.4)',
                          marginRight: '12px',
                          fontSize: '18px',
                          flexShrink: 0
                        }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button - WHATSAPP ONCLICK */}
                  <button 
                      onClick={() => handlePackageClick(pkg, currentCategory.title)}
                      style={{
                        width: '100%',
                        padding: '16px 32px',
                        background: pkg.popular 
                          ? 'rgba(255, 255, 255, 0.15)'
                          : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '50px',
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: '600',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      className="hover:bg-white/20 hover:border-white/40 hover:scale-105 package-cta">
                    Get {pkg.name} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Projects - DRAMATIC 3D STACKED REVEAL */}
        <div
        id='featured-projects'
          ref={projectsSectionRef}
          style={{
            marginTop: '120px',
            textAlign: 'center',
            marginBottom: '100px'
          }}
          className="featured-projects-header"
>
          <h2 style={{
            color: '#ffffff',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '700',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            Featured Projects
          </h2>

          <p style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '16px',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Meticulously crafted and handpicked by Create Darwin Agency. 
            Each project represents our commitment to excellence, innovation, 
            and transforming brands into unforgettable experiences.
          </p>
        </div>
      {/* 3D Stacked Card Grid with Parallax */}
        <div className="featured-projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '60px',
          padding: '0 40px',
          marginBottom: '120px',
          perspective: '2000px',
          perspectiveOrigin: '50% 50%'
        }}>
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.projectLink}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (projectCardsRef.current[index] = el)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                display: 'block',
                textDecoration: 'none',
                position: 'relative',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                cursor: 'pointer'
              }}
            >
              {/* Floating Background Glow */}
              <div style={{
                position: 'absolute',
                inset: '-40px',
                background: `radial-gradient(circle at center, ${
                  hoveredProject === project.id 
                    ? 'rgba(255, 255, 255, 0.15)' 
                    : 'rgba(255, 255, 255, 0.05)'
                }, transparent 70%)`,
                borderRadius: '50%',
                filter: 'blur(60px)',
                opacity: hoveredProject === project.id ? 1 : 0.5,
                transition: 'all 0.6s ease',
                pointerEvents: 'none',
                zIndex: 0
              }} />

              {/* Main Card Container */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: '24px',
                overflow: 'hidden',
                border: `2px solid ${
                  hoveredProject === project.id 
                    ? 'rgba(255, 255, 255, 0.3)' 
                    : 'rgba(255, 255, 255, 0.1)'
                }`,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                boxShadow: hoveredProject === project.id
                  ? `0 40px 100px rgba(0, 0, 0, 0.6), 
                     0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                     0 20px 60px rgba(255, 255, 255, 0.1)`
                  : '0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
                backdropFilter: 'blur(20px)',
                transform: hoveredProject === project.id 
                  ? 'translateY(-20px) scale(1.02)' 
                  : 'translateY(0) scale(1)',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                {/* Image Container */}
                <div className="project-image-container" style={{
                  width: '100%',
                  height: '400px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
                    opacity: hoveredProject === project.id ? 0.8 : 0.4,
                    transition: 'opacity 0.4s ease',
                    zIndex: 1
                  }} />

                  {/* Image */}
                  <img 
                    src={project.image}
                    alt={project.projectName}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: hoveredProject === project.id 
                        ? 'scale(1.15)' 
                        : 'scale(1)',
                      transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      filter: hoveredProject === project.id 
                        ? 'brightness(1.1) contrast(1.1)' 
                        : 'brightness(1) contrast(1)'
                    }}
                  />

                  {/* Scan Line Effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: hoveredProject === project.id ? 'translateX(200%)' : 'translateX(0)',
                    transition: 'transform 0.8s ease',
                    pointerEvents: 'none',
                    zIndex: 2
                  }} />
                </div>

                {/* Project Info */}
                <div className="project-info" style={{
                  padding: '32px',
                  position: 'relative',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)'
                }}>
                  <div className="project-name" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={{
                      color: '#ffffff',
                      fontSize: '28px',
                      fontWeight: '700',
                      letterSpacing: '0.02em',
                      margin: 0,
                      textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                      transform: hoveredProject === project.id 
                        ? 'translateX(8px)' 
                        : 'translateX(0)',
                      transition: 'transform 0.4s ease'
                    }}>
                      {project.projectName}
                    </h3>
                    <div className="project-arrow" style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: hoveredProject === project.id
                        ? 'rgba(255, 255, 255, 0.2)'
                        : 'rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      transform: hoveredProject === project.id 
                        ? 'translateX(0) rotate(0deg)' 
                        : 'translateX(-8px) rotate(-45deg)',
                      transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}>
                      <span style={{
                        color: '#ffffff',
                        fontSize: '24px',
                        fontWeight: '300'
                      }}>→</span>
                    </div>
                  </div>

                  {/* Animated underline */}
                  <div style={{
                    height: '2px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)',
                    marginTop: '16px',
                    transform: hoveredProject === project.id 
                      ? 'scaleX(1)' 
                      : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }} />
                </div>
              </div>

              {/* Corner Accents */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderTop: '2px solid rgba(255, 255, 255, 0.3)',
                borderRight: '2px solid rgba(255, 255, 255, 0.3)',
                opacity: hoveredProject === project.id ? 1 : 0,
                transform: hoveredProject === project.id 
                  ? 'translate(0, 0)' 
                  : 'translate(10px, -10px)',
                transition: 'all 0.4s ease',
                pointerEvents: 'none',
                zIndex: 3
              }} />

              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                width: '40px',
                height: '40px',
                borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                borderLeft: '2px solid rgba(255, 255, 255, 0.3)',
                opacity: hoveredProject === project.id ? 1 : 0,
                transform: hoveredProject === project.id 
                  ? 'translate(0, 0)' 
                  : 'translate(-10px, 10px)',
                transition: 'all 0.4s ease',
                pointerEvents: 'none',
                zIndex: 3
              }} />
            </a>
          ))}
        </div>
      </section>
    </>
  )
}

export default Pricing