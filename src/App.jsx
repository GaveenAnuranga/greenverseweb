import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Navbar from './componants/Navbar';
import HeroSection from './sections/hero';
import GreenhouseSection from './sections/greenhouse';
import FeaturesSection from './sections/features';
import AppViewSection from './sections/appview';
import BenefitsSection from './sections/benefits';
import JoinSection from './sections/join';
import ContactFooter from './sections/contact';
import UnderConstruction from './sections/underconstruction';

const LandingPage = () => (
  <>
    <Navbar />
    <HeroSection />
    <GreenhouseSection />
    <FeaturesSection />
    <AppViewSection />
    <BenefitsSection />
    <JoinSection />
    <ContactFooter />
  </>
);

/* ── PageLayout ──────────────────────────────────────────────────────────────
   Wraps every route in a centred column with decorative side borders so the
   content never touches the screen edges — matching the Figma design.
   ─────────────────────────────────────────────────────────────────────────── */
const PageLayout = ({ children }) => (
  <div className="page-shell">
    {/* Left side border */}
    <aside className="side-border side-border--left" aria-hidden="true">
      <div className="side-border__line" />
    </aside>

    {/* Main centred content column */}
    <div className="page-content">
      {children}
    </div>

    {/* Right side border */}
    <aside className="side-border side-border--right" aria-hidden="true">
      <div className="side-border__line" />
    </aside>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<UnderConstruction />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
