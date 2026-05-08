import { useRef, useEffect, useState } from 'react';
import BgShape from '../componants/BgShape';
import {
  Cpu, Smartphone, Globe, BarChart2, Zap, Bell,
} from 'lucide-react';

const FEATURES = [
  {
    icon: <Cpu size={24} />,
    title: 'Industrial Sensors',
    description:
      'High-precision industrial sensors continuously collect environmental data including temperature, humidity, soil moisture, CO₂, light intensity, and pH levels.',
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Mobile App',
    description:
      'Access the GreenVerse platform through a modern mobile application with live monitoring, alerts, device control, and automation management.',
  },
  {
    icon: <Globe size={24} />,
    title: 'Control From Anywhere',
    description:
      'Manage greenhouse equipment remotely using the web dashboard or mobile app with secure real-time device control and monitoring.',
  },
  {
    icon: <BarChart2 size={24} />,
    title: 'Real-Time Data',
    description:
      'Track live sensor readings, system performance, and environmental changes instantly with interactive dashboards and real-time updates.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Smart Automations',
    description:
      'Automate greenhouse operations using schedules, condition-based triggers, and intelligent control rules for fans, pumps, lights, and valves.',
  },
  {
    icon: <Bell size={24} />,
    title: 'Notifications & Alerts',
    description:
      'Receive instant notifications for critical environmental changes, device failures, and warning conditions to maintain stable greenhouse operations.',
  },
];

const FeaturesSection = () => {
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
      id="features"
      ref={sectionRef}
      className="relative section-pad overflow-hidden"
      style={{ background: '#f8faf9' }}
    >
      {/* Background Shapes */}
      <BgShape color="rgba(205,220,57,0.14)" size={240} top="0" right="5%" shape="leaf" animate="float" blur={20} zIndex={0} />
      <BgShape color="rgba(76,175,80,0.12)" size={180} bottom="5%" left="-30px" shape="blob" animate="float-reverse" blur={25} zIndex={0} />
      <BgShape color="rgba(100,181,246,0.12)" size={130} top="40%" right="20%" shape="circle" animate="pulse-soft" blur={30} zIndex={0} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
            Smart Features Designed for<br />
            Modern{' '}
            <span className="text-gradient font-extrabold">Greenhouse</span> Management:
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`green-hover-card rounded-2xl p-6 bg-white group transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{
                border: '1px solid #e8f5e9',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Icon */}
              <div
                className="card-icon-wrapper w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                style={{ background: 'rgba(76,175,80,0.1)', color: 'var(--color-primary)' }}
              >
                {f.icon}
              </div>
              <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-white transition-colors">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed group-hover:text-white transition-colors">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
