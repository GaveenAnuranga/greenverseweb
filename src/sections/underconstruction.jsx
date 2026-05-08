import { Link } from 'react-router-dom';
import BgShape from '../componants/BgShape';

const UnderConstruction = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1B5E20 0%, #0D1117 70%)' }}
    >
      {/* Background Shapes */}
      <BgShape color="rgba(76,175,80,0.2)" size={350} top="-80px" right="-80px" shape="blob" animate="float" blur={40} zIndex={0} />
      <BgShape color="rgba(100,181,246,0.15)" size={250} bottom="-60px" left="-60px" shape="circle" animate="float-reverse" blur={30} zIndex={0} />
      <BgShape color="rgba(205,220,57,0.1)" size={180} top="30%" left="5%" shape="leaf" animate="pulse-soft" blur={20} zIndex={0} />
      <BgShape color="rgba(38,166,154,0.12)" size={140} bottom="20%" right="10%" shape="hexagon" animate="float" blur={20} zIndex={0} />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo */}
        <div className="mb-8 animate-float">
          <img src="/greenlogo.png" alt="GreenVerse" className="w-20 h-20 object-contain" />
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-4">
          🚧
        </h1>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
          Under Construction
        </h2>
        <p className="text-green-300 text-lg mb-2 font-semibold">GreenVerse App Demo</p>
        <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-10">
          We're working hard to bring you the GreenVerse demo experience. Check back soon!
        </p>

        {/* Progress bar */}
        <div className="w-64 h-2 rounded-full mb-10" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: '68%',
              background: 'linear-gradient(90deg, #2E7D32, #4CAF50)',
              animation: 'shimmer 2s infinite',
              backgroundSize: '200% auto',
            }}
          />
        </div>

        <Link
          to="/"
          className="btn-primary"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UnderConstruction;
