import { useRef, useState, useEffect } from 'react';
import BgShape from '../componants/BgShape';

const TECH_ITEMS = [
  {
    title: 'Measure Physical Parameters',
    titleHighlight: 'Measure Physical\nParameters',
    isHighlighted: true,
    highlightWords: ['Measure Physical', 'Parameters'],
    description:
      'Monitor critical greenhouse conditions including temperature, humidity, soil moisture, light intensity, CO₂ levels, and pH values using connected smart sensors.',
  },
  {
    title: 'Real-Time Monitoring',
    titleHighlight: 'Real-Time\nMonitoring',
    isHighlighted: true,
    highlightWords: ['Real-Time', 'Monitoring'],
    description:
      'View live sensor readings and system status instantly through the GreenVerse dashboard with continuously updated charts, device health tracking, and zone-based monitoring.',
  },
  {
    title: 'Automate Actions',
    titleHighlight: 'Automate\nActions',
    isHighlighted: true,
    highlightWords: ['Automate', 'Actions'],
    description:
      'Create smart automation rules and schedules to control fans, pumps, lights, valves, and other devices automatically based on environmental conditions.',
  }
];

const GreenhouseSection = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
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
    <section ref={sectionRef} className="bg-white mb-1">
      {/* Structural space before heading */}
      <div className="h-6 sm:h-16 w-full"></div>

      {/* Heading (outside the background shape section) */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className={`text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl sm:text-2xl lg:text-3xl font-normal text-gray-800">
            Intelligent greenhouse technology built for{' '}
            <span className="text-blue-500 font-normal ">smarter</span>{' '}
            <span className="text-green-500 font-normal ">farming.</span>
          </h2>
        </div>
      </div>

      {/* Structural space after heading */}
      <div className="h-10 sm:h-24 w-full"></div>

      {/* Cards Section with Background Shapes */}
      <div className="relative py-8 overflow-hidden">
        <BgShape color="rgba(100,181,246,0.15)" size={200} top="-20px" left="-50px" shape="blob" animate="float-reverse" blur={25} zIndex={0} />
        <BgShape color="rgba(76,175,80,0.10)" size={150} bottom="0" right="-40px" shape="leaf" animate="float" blur={20} zIndex={0} />
        <BgShape color="rgba(38,166,154,0.10)" size={100} top="50%" left="50%" shape="circle" animate="pulse-soft" blur={30} zIndex={0} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div
            className="rounded-3xl bg-transparent  shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] px-8 sm:px-16 lg:px-20"
            style={{ border: '2px solid #e8f5e9' }}
          >
            {/* Top gap */}
            <div className="h-8 sm:h-8 lg:h-8 w-full"></div>

            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {TECH_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={`py-8 px-4 text-center transition-all duration-300 hover:-translate-y-2 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{
                    width: '250px',
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <h3 className="text-xl font-normal mb-2" style={{ lineHeight: 1.3 }}>
                    {item.title.split(' ').map((word, wi) => {
                      const blueWords = ['Measure', 'Monitoring', 'Automate', 'Notifications'];
                      return (
                        <span key={wi} className={blueWords.includes(word) ? 'text-blue-500' : 'text-gray-800'}>
                          {wi > 0 ? ' ' : ''}{word}
                        </span>
                      );
                    })}
                  </h3>
                  <p className="text-black/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Bottom gap */}
            <div className="h-8 sm:h-8 lg:h-8 w-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreenhouseSection;
