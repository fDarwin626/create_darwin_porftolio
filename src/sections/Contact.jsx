import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const images = [
    '/images/butler.png',
    '/images/life.png',
    '/images/olympic.png',
    '/images/gritcraft.png',
    '/images/cocktail.png',
    '/images/woodbase.png',
    '/images/black.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          message: formData.message,
          to_email: 'createdarwin223@gmail.com'
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setSubmitStatus(null);
        setIsFormOpen(false);
      }, 3000);
      
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.95);
          }
        }

        .form-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .image-fade-out {
          animation: fadeOut 0.3s ease-out forwards;
        }

        @media (max-width: 767px) {
          .desktop-layout {
            display: none !important;
          }
          .mobile-layout {
            display: flex !important;
          }
        }

        @media (min-width: 768px) {
          .desktop-layout {
            display: grid !important;
          }
          .mobile-layout {
            display: none !important;
          }
        }

        input:focus, textarea:focus {
          border-color: rgba(255, 255, 255, 0.4) !important;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1) !important;
        }
      `}</style>

      <div 
        id='contact'
        style={{
          minHeight: '100vh',
          width: '100%',
          background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px 8px'
        }}
      >
        {/* 🖥️ DESKTOP LAYOUT - COMPLETELY UNCHANGED */}
        <div className="desktop-layout" style={{
          maxWidth: '1400px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '32px'
        }}>
          
          <div style={{
            position: 'relative',
            height: '700px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            backgroundColor: '#e5e7eb'
          }}>
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Contact ${index + 1}`}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: currentImage === index ? 1 : 0,
                  transition: 'opacity 1s ease-in-out'
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ))}
            
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              padding: '48px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)'
            }}>
              <div>
                <h2 style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '16px'
                }}>Let's Create Together</h2>
                <p style={{
                  fontSize: '20px',
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>We'd love to hear about your project</p>
              </div>
            </div>

            <div style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              display: 'flex',
              gap: '8px'
            }}>
              {images.map((_, index) => (
                <div
                  key={index}
                  style={{
                    height: '8px',
                    width: currentImage === index ? '32px' : '8px',
                    borderRadius: '9999px',
                    backgroundColor: currentImage === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.5s'
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{
            borderRadius: '24px',
            padding: '40px',
            height: '700px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h3 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '12px'
            }}>Get In Touch</h3>
            <p style={{
              color: '#6b7280',
              marginBottom: '32px'
            }}>Fill out the form and we'll get back to you soon.</p>
            
            {submitStatus === 'success' && (
              <div style={{
                padding: '12px 20px',
                background: '#10b981',
                color: 'white',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                Message sent successfully! We'll get back to you soon.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div style={{
                padding: '12px 20px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: '500'
              }}>
                Please fill in all required fields.
              </div>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setIsHovered('name')}
                  onBlur={() => setIsHovered(null)}
                  required
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontSize: '16px',
                    color: '#111827'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '2px',
                  width: isHovered === 'name' ? '100%' : '0%',
                  background: 'linear-gradient(to right, #fb923c, #eab308)',
                  transition: 'width 0.3s'
                }} />
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setIsHovered('email')}
                  onBlur={() => setIsHovered(null)}
                  required
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontSize: '16px',
                    color: '#111827'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '2px',
                  width: isHovered === 'email' ? '100%' : '0%',
                  background: 'linear-gradient(to right, #fb923c, #eab308)',
                  transition: 'width 0.3s'
                }} />
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setIsHovered('phone')}
                  onBlur={() => setIsHovered(null)}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontSize: '16px',
                    color: '#111827'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '2px',
                  width: isHovered === 'phone' ? '100%' : '0%',
                  background: 'linear-gradient(to right, #fb923c, #eab308)',
                  transition: 'width 0.3s'
                }} />
              </div>

              <div style={{ position: 'relative' }}>
                <textarea
                  name="message"
                  placeholder="Tell us about your project... *"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setIsHovered('message')}
                  onBlur={() => setIsHovered(null)}
                  required
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    outline: 'none',
                    transition: 'all 0.3s',
                    fontSize: '16px',
                    color: '#111827',
                    resize: 'none',
                    fontFamily: 'inherit'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '2px',
                  width: isHovered === 'message' ? '100%' : '0%',
                  background: 'linear-gradient(to right, #fb923c, #eab308)',
                  transition: 'width 0.3s'
                }} />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(251, 146, 60, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(251, 146, 60, 0.3)';
                }}
                style={{
                  width: '100%',
                  padding: '16px 32px',
                  background: isSubmitting ? '#6b7280' : 'black',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 10px 30px rgba(251, 146, 60, 0.3)'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>

        {/* 📱 MOBILE LAYOUT - FULL WIDTH 🔥 */}
        <div className="mobile-layout" style={{
          width: '100%',
          maxWidth: '100%',
          display: 'none',
          flexDirection: 'column',
          padding: '0'
        }}>
          {/* Image Section or Form - Same Position */}
          {!isFormOpen ? (
            <div className={isFormOpen ? 'image-fade-out' : ''} style={{
              position: 'relative',
              width: '100%',
              height: '640px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)'
            }}>
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Portfolio ${index + 1}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: currentImage === index ? 1 : 0,
                    transition: 'opacity 1s ease-in-out'
                  }}
                  onError={(e) => e.currentTarget.style.display = 'none'}
                />
              ))}
              
              {/* Professional Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '32px 24px'
              }}>
                {/* Header */}
                <h2 style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '194px',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em'
                }}>
                  Ignite, Elevate, and Grow Your Presence
                </h2>

                {/* Subheader */}
                <h3 style={{
                  fontSize: '17px',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: '14px',
                  lineHeight: '1.4',
                  fontWeight: '500'
                }}>
                  Professional Brand Identity & Social Media Excellence
                </h3>

                {/* Description */}
                <p style={{
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.75)',
                  marginBottom: '30px',
                  lineHeight: '1.6'
                }}>
                  From professional logos and typography to complete social media management—we take your brand from simple to powerful.
                </p>

                {/* Black Glassy Button */}
                <button
                  onClick={() => setIsFormOpen(true)}
                  style={{
                    width: '100%',
                    padding: '18px 32px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '17px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  Contact Us
                </button>
              </div>

              {/* Slide Indicators */}
              <div style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                display: 'flex',
                gap: '6px',
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '8px 12px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}>
                {images.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      height: '6px',
                      width: currentImage === index ? '24px' : '6px',
                      borderRadius: '9999px',
                      backgroundColor: currentImage === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                      transition: 'all 0.5s'
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Contact Form - Same Position, Slides Up */
            <div className="form-slide-up" style={{
              position: 'relative',
              width: '100%',
              minHeight: '640px',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderRadius: '16px',
              padding: '36px 24px',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              {/* Close Button */}
              <button
                onClick={() => setIsFormOpen(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s'
                }}
              >
                ✕
              </button>

              <h3 style={{
                fontSize: '30px',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '10px',
                marginTop: '16px'
              }}>Let's Talk</h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '30px',
                fontSize: '15px'
              }}>Fill out the form and we'll respond within 24 hours.</p>
              
              {submitStatus === 'success' && (
                <div style={{
                  padding: '14px 20px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  color: '#10b981',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '15px',
                  backdropFilter: 'blur(10px)'
                }}>
                  ✓ Message sent successfully!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div style={{
                  padding: '14px 20px',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  fontWeight: '600',
                  fontSize: '15px',
                  backdropFilter: 'blur(10px)'
                }}>
                  ⚠ Please fill all required fields
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px 22px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '16px',
                    color: 'white',
                    transition: 'all 0.3s'
                  }}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px 22px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '16px',
                    color: 'white',
                    transition: 'all 0.3s'
                  }}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '16px 22px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '16px',
                    color: 'white',
                    transition: 'all 0.3s'
                  }}
                />

                <textarea
                  name="message"
                  placeholder="Tell us about your project... *"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '16px 22px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '12px',
                    outline: 'none',
                    fontSize: '16px',
                    color: 'white',
                    resize: 'none',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s'
                  }}
                />

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '18px 32px',
                    background: isSubmitting 
                      ? 'rgba(156, 163, 175, 0.3)' 
                      : 'rgba(255, 255, 255, 0.95)',
                    color: isSubmitting ? 'rgba(255, 255, 255, 0.5)' : '#000',
                    fontWeight: '600',
                    fontSize: '17px',
                    borderRadius: '12px',
                    border: 'none',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;