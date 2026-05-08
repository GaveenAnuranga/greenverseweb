import { useRef, useEffect, useState } from 'react';
import BgShape from '../componants/BgShape';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BENEFITS = [
  {
    title: 'Smarter Greenhouse Management',
    description:
      'Manage monitoring, automation, and device control from one centralized platform designed for modern greenhouse operations.',
  },
  {
    title: 'Increase Crop Productivity',
    description:
      'Maintain optimal environmental conditions with real-time monitoring and automated control systems that support healthier plant growth.',
  },
  {
    title: 'Save Time with Automation',
    description:
      'Reduce manual work by automating irrigation, ventilation, lighting, and other greenhouse operations using smart schedules and trigger-based actions.',
  },
  {
    title: 'Access Anywhere, Anytime',
    description:
      'Monitor and control your greenhouse remotely through the web dashboard or mobile application from any location.',
  },
  {
    title: 'Real-Time Alerts & Notifications',
    description:
      'Receive instant warnings for critical environmental changes, abnormal readings, or device failures to respond quickly before problems escalate.',
  },
  {
    title: 'Accurate Environmental Monitoring',
    description:
      'Track temperature, humidity, soil moisture, CO₂, light intensity, and pH levels with reliable industrial-grade sensors.',
  },
  {
    title: 'Improve Resource Efficiency',
    description:
      'Optimize water usage, energy consumption, and equipment operation through intelligent automation and data-driven management.',
  },
  {
    title: 'Device Health Monitoring',
    description:
      'Monitor device connectivity, signal quality, and system status in real time to ensure stable and reliable greenhouse operations.',
  },
  {
    title: 'Easy-to-Understand Dashboard',
    description:
      'Visualize live data, trends, alerts, and automation status through a clean and user-friendly dashboard interface.',
  },
  {
    title: 'Scalable for Future Growth',
    description:
      'Designed to support multiple greenhouse sites, zones, sensors, and control devices as your operations expand.',
  },
];

const SET_SIZE = BENEFITS.length;
const MIDDLE_START = SET_SIZE * 2;
const EXTENDED_BENEFITS = [...BENEFITS, ...BENEFITS, ...BENEFITS, ...BENEFITS, ...BENEFITS];

const BenefitsSection = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(MIDDLE_START);
  const [isHovered, setIsHovered] = useState(false);
  const [padding, setPadding] = useState(0);
  const [cardWidth, setCardWidth] = useState(300);
  const cardWidthRef = useRef(300);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (scrollRef.current) {
        const containerWidth = scrollRef.current.clientWidth;
        
        // To show EXACTLY one card on mobile without adjacent cards peeking:
        // We set card width to containerWidth - 48. This gives 24px padding on each side.
        // Since the flex gap is 24px, the next card will start exactly at the edge of the screen!
        let calculatedWidth = window.innerWidth <= 800 ? containerWidth - 48 : 300;
        
        // Safe minimums
        if (calculatedWidth < 240) calculatedWidth = 240;
        if (window.innerWidth > 800) calculatedWidth = 300;
        
        setCardWidth(calculatedWidth);
        cardWidthRef.current = calculatedWidth;
        setPadding(containerWidth / 2 - calculatedWidth / 2);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleScrollEvent = () => {
    if (!scrollRef.current) return;
    const scrollPos = scrollRef.current.scrollLeft;
    const cw = cardWidthRef.current + 24; // 24px gap
    let closestIndex = Math.round(scrollPos / cw);
    if (closestIndex < 0) closestIndex = 0;
    if (closestIndex >= EXTENDED_BENEFITS.length) closestIndex = EXTENDED_BENEFITS.length - 1;
    setActiveIndex(closestIndex);
  };

  // Infinite scroll jump logic
  useEffect(() => {
    if (isDragging) return;
    const tid = setTimeout(() => {
      if (activeIndex < SET_SIZE || activeIndex >= SET_SIZE * 4) {
        const normalizedIndex = (activeIndex % SET_SIZE) + MIDDLE_START;
        if (normalizedIndex !== activeIndex && scrollRef.current) {
          scrollRef.current.scrollLeft = normalizedIndex * (cardWidthRef.current + 24);
          setActiveIndex(normalizedIndex);
        }
      }
    }, 600); // Wait for smooth scroll to finish
    return () => clearTimeout(tid);
  }, [activeIndex, isDragging]);

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScrollEvent);
      setTimeout(() => scrollToIndex(activeIndex), 100);
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', handleScrollEvent);
    };
  }, [padding]); // wait for padding to set

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cw = cardWidthRef.current + 24;
      const scrollPos = index * cw;
      scrollRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered || isDragging) return;
    const timer = setInterval(() => {
      if (activeIndex <= 0 || activeIndex >= EXTENDED_BENEFITS.length - 1) return;
      setActiveIndex((prev) => {
        const next = prev + 1;
        scrollToIndex(next);
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, isDragging, padding, activeIndex]);

  const scroll = (dir) => {
    let next = activeIndex + dir;
    if (next < 0) next = 0;
    if (next >= EXTENDED_BENEFITS.length) next = EXTENDED_BENEFITS.length - 1;
    scrollToIndex(next);
  };

  const snapToClosest = () => {
    if (!scrollRef.current) return;
    const scrollPos = scrollRef.current.scrollLeft;
    const cw = cardWidthRef.current + 24;
    let closestIndex = Math.round(scrollPos / cw);
    if (closestIndex < 0) closestIndex = 0;
    if (closestIndex >= EXTENDED_BENEFITS.length) closestIndex = EXTENDED_BENEFITS.length - 1;
    scrollToIndex(closestIndex);
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseLeave = () => { 
    if (isDragging) {
      setIsDragging(false);
      snapToClosest();
    }
    setIsHovered(false); 
  };
  const onMouseEnter = () => setIsHovered(true);
  const onMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      snapToClosest();
    }
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative section-pad overflow-hidden"
      style={{ background: '#f8faf9' }}
    >
      {/* Background Shapes */}
      <BgShape color="rgba(76,175,80,0.12)" size={220} top="-30px" right="-50px" shape="blob" animate="float" blur={30} zIndex={0} />
      <BgShape color="rgba(205,220,57,0.14)" size={170} bottom="10%" left="-40px" shape="teardrop" animate="float-reverse" blur={20} zIndex={0} />
      <BgShape color="rgba(38,166,154,0.12)" size={120} top="40%" right="10%" shape="hexagon" animate="pulse-soft" blur={20} zIndex={0} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className={`px-5 sm:px-8 lg:px-12 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ marginBottom: '4rem' }}>
          <h2 className="text-normal sm:text-2xl lg:text-3xl font-semibold text-gray-800">
            Choose Us: Your Path to modernization and{' '}
            <span className="text-blue-500 font-semibold">Success</span>
          </h2>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="scroll-container"
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseEnter={onMouseEnter}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <div className="flex gap-6 pb-4" style={{ width: 'max-content', paddingLeft: padding, paddingRight: padding }}>
            {EXTENDED_BENEFITS.map((b, i) => {
              const isHighlighted = i === activeIndex;
              return (
              <div
                key={i}
                className={`relative overflow-hidden green-hover-card rounded-3xl p-6 sm:p-8 bg-white group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  border: 'none',
                  boxShadow: isHighlighted
                    ? '0 12px 32px rgba(102,187,106,0.35)'
                    : '0 4px 24px rgba(0,0,0,0.04)',
                  width: `${cardWidth}px`,
                  minWidth: `${cardWidth}px`,
                  padding: '2.25rem 2rem',
                  transitionDelay: `${(i % 5) * 80}ms`,
                  flexShrink: 0,
                }}
              >
                {/* Smooth Gradient Background Layer */}
                <div
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, #4CAF50 0%, #AED581 100%)',
                    opacity: isHighlighted ? 1 : 0,
                    zIndex: 0,
                  }}
                />
                
                <div className="relative z-10">
                  <h3
                    className="text-lg font-semibold mb-3 group-hover:text-white transition-colors duration-700"
                    style={{ color: isHighlighted ? 'white' : '#1a1a2e' }}
                  >
                    {b.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed group-hover:text-white transition-colors duration-700"
                    style={{ color: isHighlighted ? 'rgba(255,255,255,0.9)' : '#6B7280' }}
                  >
                    {b.description}
                  </p>
                </div>
              </div>
            )})}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="px-5 sm:px-8 lg:px-12 flex items-center justify-center gap-4 mt-8" style={{ marginTop: '3rem' }}>
          <button onClick={() => scroll(-1)} className="carousel-btn" aria-label="Previous">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} className="carousel-btn" aria-label="Next">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
