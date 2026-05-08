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
    highlighted: true,
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

const BenefitsSection = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const CARD_WIDTH = 300; // px

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * (CARD_WIDTH + 24), behavior: 'smooth' });
    }
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseLeave = () => setIsDragging(false);
  const onMouseUp = () => setIsDragging(false);
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

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-widest mb-2">Why Choose Us</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
            Choose Us: Your Path to modernization and{' '}
            <span className="text-gradient font-extrabold">Success</span>
          </h2>
        </div>

        {/* Scrollable Cards */}
        <div
          ref={scrollRef}
          className="scroll-container"
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
        >
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className={`green-hover-card rounded-2xl p-6 bg-white group ${b.highlighted ? 'ring-2 ring-green-500' : ''} transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  border: b.highlighted ? '2px solid #4CAF50' : '1px solid #e8f5e9',
                  boxShadow: b.highlighted
                    ? '0 8px 32px rgba(76,175,80,0.25)'
                    : '0 4px 20px rgba(0,0,0,0.05)',
                  width: `${CARD_WIDTH}px`,
                  minWidth: `${CARD_WIDTH}px`,
                  background: b.highlighted
                    ? 'linear-gradient(135deg, #2E7D32, #4CAF50)'
                    : 'white',
                  transitionDelay: `${(i % 5) * 80}ms`,
                  flexShrink: 0,
                }}
              >
                <h3
                  className="text-base font-bold mb-3 group-hover:text-white transition-colors"
                  style={{ color: b.highlighted ? 'white' : '#1a1a2e' }}
                >
                  {b.title}
                </h3>
                <p
                  className="text-sm leading-relaxed group-hover:text-white transition-colors"
                  style={{ color: b.highlighted ? 'rgba(255,255,255,0.88)' : '#6B7280' }}
                >
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8">
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
