import { useRef, useEffect, useState } from 'react';
import { Send, Share2, AtSign, Mail as MailIcon } from 'lucide-react';
import emailjs from '@emailjs/browser';

// ===== Email credentials - replace these with environment variables in production =====
const EMAIL_SERVICE_ID = 'your_service_id';
const EMAIL_TEMPLATE_ID = 'your_template_id';
const EMAIL_PUBLIC_KEY = 'your_public_key';
// ====================================================================================

const ContactFooter = () => {
  const formRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');

    try {
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        { user_email: email, message: message || 'Subscription request from GreenVerse website.' },
        EMAIL_PUBLIC_KEY
      );
      setStatus('success');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const footerLinks = {
    Product: ['Smart Monitoring System'],
    Information: ['FAQ'],
    Company: ['Home', 'Features', 'Benefits'],
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#0D1117', color: 'white' }}
    >
      {/* Main Footer Content */}
      <div className={`container py-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Links Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-bold text-sm mb-4 tracking-wide">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button
                      onClick={() => {
                        const idMap = { Home: 'home', Features: 'features', Benefits: 'benefits' };
                        if (idMap[link]) scrollTo(idMap[link]);
                      }}
                      className="text-gray-400 text-sm hover:text-green-400 transition-colors"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Subscribe */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">Subscribe</h4>
            <p className="text-gray-400 text-xs mb-4 leading-relaxed">
              Hello, we are GreenVerse. Our goal is to revolutionize how companies engage with smart farming technologies.
            </p>
            <form ref={formRef} onSubmit={handleSend} className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="footer-input flex-1"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: status === 'success'
                      ? '#4CAF50'
                      : 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                    flexShrink: 0,
                  }}
                  aria-label="Send"
                >
                  {status === 'sending' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={16} color="white" />
                  )}
                </button>
              </div>
              {status === 'success' && (
                <p className="text-green-400 text-xs">✓ Email sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-xs">✕ Failed to send. Please try again.</p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/greenlogo.png" alt="GreenVerse" className="h-6 w-auto" />
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-5">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <button key={item} className="text-gray-500 text-xs hover:text-gray-300 transition-colors">
                {item}
              </button>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
            { Icon: MailIcon, label: 'Email' },
            { Icon: Share2, label: 'Share' },
            { Icon: AtSign, label: 'Social' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.08)', color: '#9CA3AF' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(76,175,80,0.3)';
                  e.currentTarget.style.color = '#4CAF50';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = '#9CA3AF';
                }}
              >
                <Icon size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
