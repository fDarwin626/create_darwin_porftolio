import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .footer-container {
            padding: 40px 24px !important;
          }
          
          .footer-main-layout {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0 !important;
            margin-bottom: 40px !important;
          }
          
          /* Logo section - centered and prominent */
          .footer-logo-section {
            margin-left: 0 !important;
            width: 100%;
            align-items: center !important;
            text-align: center;
            padding-bottom: 32px;
            border-bottom: 1px solid rgba(75, 85, 99, 0.5);
            margin-bottom: 32px !important;
          }
          
          .footer-logo-section img {
            margin-left: 0 !important;
            margin-bottom: 12px;
          }
          
          .footer-logo-section p {
            margin-left: 0 !important;
            max-width: 100% !important;
            text-align: center;
          }
          
          /* Quick Links and Connect in a 2-column grid */
          .footer-links-connect-wrapper {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
            padding-bottom: 32px;
            border-bottom: 1px solid rgba(75, 85, 99, 0.5);
          }
          
          .footer-quick-links,
          .footer-social-section {
            margin: 0 !important;
          }
          
          /* Bottom bar - centered */
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: center !important;
            gap: 16px !important;
            text-align: center;
          }
          
          .footer-bottom-bar p {
            order: 2;
          }
          
          .footer-bottom-links {
            order: 1;
            justify-content: center !important;
          }
        }
      `}</style>
      
      <footer style={{
        position: 'relative',
        background: 'black',
        color: 'white',
        overflow: 'hidden'
      }}>

        <div style={{
          position: 'relative',
          zIndex: 10,
          padding: '48px 48px',
          maxWidth: '1400px',
          margin: '0 auto'
        }} className="footer-container">
          
          {/* Main horizontal layout */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '48px',
            flexWrap: 'wrap',
            marginBottom: '32px'
          }} className="footer-main-layout">
            
            {/* Logo Section - Far Left */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              flexShrink: 0,
              marginLeft: '40px'
            }} className="footer-logo-section">
              <img 
                src="/images/Asset 10.png" 
                alt="Logo" 
                style={{
                  height: '28px',
                  width: 'auto',
                  maxWidth: '200px',
                  objectFit: 'contain',
                  transition: 'transform 0.3s',
                  marginLeft: '-150px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
              <p style={{
                color: 'rgb(156, 163, 175)',
                fontSize: '14px',
                maxWidth: '250px',
                marginLeft: '-95px'
              }}>
                Build, Evolve, and grow Your Brand.
              </p>
            </div>
            
            {/* Quick Links */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <h3 style={{
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgb(156, 163, 175)',
                fontWeight: '500'
              }}>QUICK LINKS</h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <a 
                  href="#pricing" 
                  style={{
                    color: 'rgb(156, 163, 175)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}
                >Pricing</a>
                <a 
                  href="#services" 
                  style={{
                    color: 'rgb(156, 163, 175)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}
                >Services</a>
                <a 
                  href="#home" 
                  style={{
                    color: 'rgb(156, 163, 175)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156, 163, 175)'}
                >Home</a>
              </div>
            </div>

            {/* Social Icons */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <h3 style={{
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'rgb(156, 163, 175)',
                fontWeight: '500'
              }}>CONNECT</h3>
              <div style={{
                display: 'flex',
                gap: '16px'
              }}>
                <a 
                  href="https://x.com/Weriepere" 
                  style={{
                    display: 'block',
                    color: 'rgb(156, 163, 175)',
                    transition: 'all 0.3s'
                  }}
                  aria-label="Twitter"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgb(156, 163, 175)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Twitter size={20} />
                </a>
                <a 
                  href="https://www.instagram.com/fuoseighasolomon?igsh=MXFyNGh4a2dqcWx0bg==" 
                  style={{
                    display: 'block',
                    color: 'rgb(156, 163, 175)',
                    transition: 'all 0.3s'
                  }}
                  aria-label="Instagram"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgb(156, 163, 175)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Instagram size={20} />
                </a>

                  <a 
                  href="https://www.facebook.com/share/1F588Yuiqk/" 
                  style={{
                    display: 'block',
                    color: 'rgb(156, 163, 175)',
                    transition: 'all 0.3s'
                  }}
                  aria-label="Facebook"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.transform = 'scale(1.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgb(156, 163, 175)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Facebook size={20} />
                </a>

              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            width: '100%',
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgb(75, 85, 99), transparent)',
            marginBottom: '24px'
          }}></div>
          
          {/* Bottom bar - horizontal */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }} className="footer-bottom-bar">
            <p style={{
              color: 'rgb(107, 114, 128)',
              fontSize: '12px'
            }}>
              © {currentYear} CoCoNuTStudios. All rights reserved.
            </p>
            <div style={{
              display: 'flex',
              gap: '24px',
              fontSize: '12px',
              color: 'rgb(107, 114, 128)',
              flexWrap: 'wrap'
            }}>
              <a 
                href="#" 
                style={{
                  color: 'rgb(107, 114, 128)',
                  transition: 'color 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(107, 114, 128)'}
              >Privacy Policy</a>
              <span>•</span>
              <a 
                href="#" 
                style={{
                  color: 'rgb(107, 114, 128)',
                  transition: 'color 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(107, 114, 128)'}
              >Terms of Service</a>
              <span>•</span>
              <a 
                href="#" 
                style={{
                  color: 'rgb(107, 114, 128)',
                  transition: 'color 0.2s',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(107, 114, 128)'}
              >Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;