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

      <div className="relative z-10 container">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* App Screenshots */}
          <div
            className={`relative w-full lg:w-2/3 transition-all duration-900 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}
          >
            <div
              className="relative container"
              style={{ paddingRight: '12%' }}
            >
              {/* Tablet image — large base layer */}
              <img
                src="/Tab.png"
                alt="GreenVerse Tablet App"
                className="rounded-2xl block w-full"
                style={{
                  zIndex: 1,
                }}
              />
              {/* Mobile image — portrait, overlapping right edge of tablet */}
              <img
                src="/mobite.png"
                alt="GreenVerse Mobile App"
                className="absolute rounded-2xl"
                style={{
                  width: '24%',
                  right: '-4%',
                  top: '60%',
                  transform: 'translateY(-50%)',
                  zIndex: 2,
                }}
              />
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`w-full lg:w-1/3 border-l-4 border-[#4CAF50] transition-all duration-900 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}
            style={{ paddingLeft: '4rem' }}
          >
            <h2 
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 leading-snug"
              style={{ marginBottom: '1rem' }}
            >
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
