import { useRef, useEffect, useState } from 'react';

const JoinSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-12"
        style={{ background: '#f8fafc' }}
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-8 relative">
          {/* Main rounded container */}
          <div
            className="relative rounded-3xl overflow-hidden text-center"
            style={{
              background: 'linear-gradient(135deg, #64B5F6 0%, #42A5F5 50%, #2196F3 100%)',
              boxShadow: '0 20px 50px rgba(33, 150, 243, 0.25)',
              transition: 'opacity 1s, transform 1s',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.95)',
              paddingTop: '56px',
              paddingBottom: '56px',
              paddingLeft: '32px',
              paddingRight: '32px',
            }}
          >
            {/* Subtle white overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.04)', borderRadius: 'inherit', pointerEvents: 'none' }} />

            <div className="relative" style={{ zIndex: 10, maxWidth: '600px', margin: '0 auto' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                  fontWeight: 700,
                  color: 'white',
                  lineHeight: 1.3,
                  marginBottom: '28px',
                  textShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                Ready to Transform Your Greenhouse into a Smart Farming System?
              </h2>

              <button
                onClick={scrollToContact}
                style={{
                  padding: '12px 36px',
                  background: 'white',
                  color: '#2196F3',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  transition: 'all 0.3s',
                  marginBottom: '0',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)'; }}
              >
                Join with Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JoinSection;