import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = ({
  labelMarginBottom = '', // e.g., '24px' or '1.5rem'
  headingMarginBottom = '2rem',
  subtitleMarginBottom = '2rem',
  buttonMarginTop = '0px',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative lg:h-screen min-h-[400px] lg:max-h-[700px] flex items-center justify-center overflow-hidden bg-white pb-16 lg:pb-0"
      style={{ paddingTop: '68px' }}
    >
      {/* Background Image Layer — hidden on mobile, visible on lg+ */}
      <div className="hidden lg:block absolute top-[88px] bottom-0 inset-x-2 z-0 container px-8 sm:px-8 lg:px-12">
        <div className="relative w-full h-full">
          <img
            src="/greenhome.png"
            alt="GreenVerse Smart Greenhouse"
            className="absolute inset-0 w-full h-full object-cover object-right lg:object-center rounded-3xl lg:rounded-[40px]"
          />
          <div className="absolute inset-0 lg:w-[65%] bg-linear-to-b lg:bg-linear-to-r from-white via-white/95 lg:via-white to-transparent z-10"></div>
        </div>
      </div>

      <div className="relative z-20 container py-16 md:py-0 h-full">
        <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center pt-8 lg:pt-0 h-full">

          {/* Left Content */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}
          >
            {/* Label */}
            <p className="text-blue-600 text-sm font-medium tracking-wide" style={{ marginBottom: labelMarginBottom }}>
              Greenhouse Automation
            </p>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900" style={{ marginBottom: headingMarginBottom }}>
              <span className="text-green-600">GreenVerse</span>
              <span style={{ color: '#0D1117' }}>:</span><br />
              <span className="text-gray-900">
                Automating<br />Your Growth
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-md" style={{ marginBottom: subtitleMarginBottom }}>
              monitoring and intelligent automation<br />giving you complete control
            </p>

            {/* Button */}
            <Link
              to="/demo"
              className="btn-primary text-base inline-flex items-center gap-2"
              style={{ marginTop: buttonMarginTop }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
              </svg>
              view App-demo
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;