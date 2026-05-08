import { useRef, useEffect, useState } from 'react';
import BgShape from '../componants/BgShape';

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
    <section
      ref={sectionRef}
      className="relative section-pad overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a6b3a 0%, #2196F3 100%)',
      }}
    >
      {/* Background Shapes */}
      <BgShape color="rgba(255,255,255,0.08)" size={300} top="-60px" right="-60px" shape="blob" animate="float" blur={20} zIndex={0} />
      <BgShape color="rgba(255,255,255,0.06)" size={200} bottom="-40px" left="-40px" shape="circle" animate="float-reverse" blur={15} zIndex={0} />
      <BgShape color="rgba(255,255,255,0.05)" size={150} top="30%" left="30%" shape="hexagon" animate="pulse-soft" blur={10} zIndex={0} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className={`transition-all duration-800 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-snug mb-6">
              Ready to Transform Your Greenhouse into a Smart Farming System?
            </h2>
            <button
              onClick={scrollToContact}
              className="btn-primary"
              style={{
                background: 'white',
                color: 'var(--color-primary)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            >
              Join with Us
            </button>
          </div>

          {/* Right: Polygon-shaped image */}
          <div className={`relative flex justify-center transition-all duration-800 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {/* Decorative polygon frame */}
            <div
              className="relative"
              style={{ width: '340px', maxWidth: '100%' }}
            >
              {/* Polygon clipped image container */}
              <div
                className="join-shape overflow-hidden"
                style={{
                  width: '100%',
                  height: '300px',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <img
                  src="/join-team.jpg"
                  alt="GreenVerse Team"
                  className="w-full h-full object-cover object-center"
                  style={{ filter: 'brightness(0.9)' }}
                  onError={(e) => {
                    // Fallback if image not found
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = 'rgba(255,255,255,0.15)';
                  }}
                />
              </div>

              {/* Floating decorative elements */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center animate-float"
                style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
              >
                <span className="text-2xl">🌱</span>
              </div>
              <div
                className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center animate-float-reverse"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
              >
                <span className="text-xl">🌿</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
