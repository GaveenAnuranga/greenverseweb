import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);
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
    Company: ['Home', 'Features', 'benefits'],
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
      className="relative overflow-hidden bg-white"
    >
      {/* Main Footer Content */}
      <div className={`container py-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-gray-900 font-medium text-[15px] mb-5">{heading}</h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link}>
                      <button
                        onClick={() => {
                          const idMap = { Home: 'home', Features: 'features', benefits: 'benefits' };
                          if (idMap[link]) scrollTo(idMap[link]);
                        }}
                        className="text-gray-400 text-[14px] hover:text-gray-900 transition-colors"
                      >
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Subscribe */}
          <div className="lg:col-span-2 bg-[#F8FAFC] rounded-[24px] p-8">
            <h4 className="text-gray-900 font-medium text-[15px] mb-6">Subscribe</h4>

            <form ref={formRef} onSubmit={handleSend} className="space-y-4 mb-6">
              <div className="flex items-center bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 bg-transparent px-4 py-2 outline-none text-[14px] text-gray-700 placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: status === 'success'
                      ? '#10B981'
                      : '#3B82F6',
                    flexShrink: 0,
                  }}
                  aria-label="Send"
                >
                  {status === 'sending' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <ArrowRight size={18} color="white" />
                  )}
                </button>
              </div>
              {status === 'success' && (
                <p className="text-emerald-500 text-xs px-4">✓ Email sent successfully!</p>
              )}
              {status === 'error' && (
                <p className="text-red-500 text-xs px-4">✕ Failed to send. Please try again.</p>
              )}
            </form>

            <p className="text-gray-400 text-[13px] leading-relaxed pr-4">
              Hello, we are GreenVerse. Our goal is to translate the positive effects from revolutionizing how companies engage with their clients & their team.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="/greenlogo.png" alt="GreenVerse" className="h-10 w-auto" />
          </div>

          {/* Legal Links */}
          <div className="flex items-center justify-center gap-8 flex-1">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <button key={item} className="text-[#334155] text-[13px] font-medium hover:text-gray-900 transition-colors">
                {item}
              </button>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { Icon: LinkedinIcon, label: 'LinkedIn' },
              { Icon: FacebookIcon, label: 'Facebook' },
              { Icon: TwitterIcon, label: 'Twitter' },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-200 transition-all duration-200 hover:scale-105"
                style={{ color: '#0F172A' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3B82F6';
                  e.currentTarget.style.color = '#3B82F6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.color = '#0F172A';
                }}
              >
                <Icon size={16} strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
