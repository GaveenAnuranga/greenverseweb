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
   Simple full-width wrapper — centering is handled per-section via
   max-w-7xl mx-auto with consistent horizontal padding.
   ─────────────────────────────────────────────────────────────────────────── */
const PageLayout = ({ children }) => (
  <div className="page-root">
    {children}
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
