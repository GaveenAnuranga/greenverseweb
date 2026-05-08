import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BgShape from '../componants/BgShape';

const AppViewSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative section-pad overflow-hidden"
      style={{ background: '#fff' }}
    >
      {/* Background Shapes */}
      <BgShape color="rgba(100,181,246,0.18)" size={260} top="-40px" left="-60px" shape="blob" animate="float" blur={35} zIndex={0} />
      <BgShape color="rgba(76,175,80,0.12)" size={180} bottom="5%" right="-30px" shape="leaf" animate="float-reverse" blur={20} zIndex={0} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* App Screenshots */}
          <div
            className={`relative flex-1 transition-all duration-900 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}
          >
            <div className="relative flex items-end justify-center gap-4">
              {/* Tablet image */}
              <div className="relative" style={{ zIndex: 2 }}>
                <img
                  src="/Tab.png"
                  alt="GreenVerse Tablet App"
                  className="w-full max-w-sm rounded-2xl shadow-2xl"
                  style={{ boxShadow: '0 24px 60px rgba(46,125,50,0.2)' }}
                />
              </div>
              {/* Mobile image overlapping */}
              <div className="relative -ml-12 mb-0" style={{ zIndex: 3 }}>
                <img
                  src="/mobite.png"
                  alt="GreenVerse Mobile App"
                  className="w-32 sm:w-44 rounded-2xl shadow-2xl animate-float"
                  style={{ boxShadow: '0 20px 50px rgba(46,125,50,0.25)' }}
                />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`flex-1 transition-all duration-900 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 leading-snug mb-6">
              Your Greenhouse Control at Your{' '}
              <span className="text-gradient">Fingertips</span>,<br />
              Wherever You Go
            </h2>
            <Link to="/demo" className="btn-primary inline-flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
              Try App demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppViewSection;
