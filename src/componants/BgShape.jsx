/**
 * BgShape - Reusable decorative background shape component.
 * Used across every section with different color, size, position, and animation.
 *
 * Props:
 *  color     - CSS color string (rgba recommended)
 *  size      - number (px)
 *  top/left/right/bottom - CSS position string
 *  shape     - 'blob' | 'circle' | 'leaf' | 'teardrop' | 'hexagon' (default: 'blob')
 *  animate   - 'float' | 'float-reverse' | 'pulse-soft' | 'rotate' | 'none'
 *  opacity   - number 0-1
 *  zIndex    - number (default: 0)
 *  blur      - number px (default: 0)
 */
const BgShape = ({
  color = 'rgba(76,175,80,0.18)',
  size = 180,
  top,
  left,
  right,
  bottom,
  shape = 'blob',
  animate = 'float',
  opacity = 1,
  zIndex = 0,
  blur = 0,
  className = '',
}) => {
  const style = {
    position: 'absolute',
    width: size,
    height: size,
    top,
    left,
    right,
    bottom,
    opacity,
    zIndex,
    pointerEvents: 'none',
    filter: blur ? `blur(${blur}px)` : undefined,
  };

  const animClass =
    animate === 'float' ? 'animate-float'
    : animate === 'float-reverse' ? 'animate-float-reverse'
    : animate === 'pulse-soft' ? 'animate-pulse-soft'
    : animate === 'rotate' ? 'animate-rotate'
    : '';

  const getPath = () => {
    switch (shape) {
      case 'circle':
        return (
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: color,
            }}
          />
        );
      case 'leaf':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <path
              fill={color}
              d="M53.2,-57.8C66.6,-42.2,73.2,-21.1,70.8,-2.4C68.4,16.3,57,32.6,43.6,46.4C30.2,60.2,15.1,71.5,-2.7,74.2C-20.5,76.9,-41,71,-54.9,57.2C-68.8,43.4,-76.1,21.7,-72.3,3.8C-68.5,-14.1,-53.6,-28.2,-39.7,-43.8C-25.8,-59.4,-12.9,-76.5,4.5,-81C21.9,-85.5,39.8,-73.4,53.2,-57.8Z"
              transform="translate(100 100)"
            />
          </svg>
        );
      case 'teardrop':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <path
              fill={color}
              d="M100,20 C140,20 170,60 170,100 C170,155 100,180 100,180 C100,180 30,155 30,100 C30,60 60,20 100,20 Z"
            />
          </svg>
        );
      case 'hexagon':
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <polygon
              fill={color}
              points="100,10 185,55 185,145 100,190 15,145 15,55"
            />
          </svg>
        );
      case 'blob':
      default:
        return (
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <path
              fill={color}
              d="M44.9,-52.3C57.5,-40.3,66.4,-24.7,67.5,-8.7C68.6,7.3,62,23.7,51.8,36.5C41.6,49.3,27.8,58.5,11.5,63.2C-4.8,67.9,-23.6,68.1,-37.1,59.5C-50.6,50.9,-58.8,33.5,-62.2,15C-65.6,-3.5,-64.2,-23.1,-54.9,-36.5C-45.6,-49.9,-28.4,-57.1,-11.5,-59.9C5.4,-62.7,32.3,-64.3,44.9,-52.3Z"
              transform="translate(100 100)"
            />
          </svg>
        );
    }
  };

  return (
    <div style={style} className={`${animClass} ${className}`} aria-hidden="true">
      {getPath()}
    </div>
  );
};

export default BgShape;
