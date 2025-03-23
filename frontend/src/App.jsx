import './App.css'
import { Hero } from './components/Hero'
import { Schedule } from './components/Schedule'
import { About } from './components/About'
import Gallery from './components/Gallery'
import { Events } from './components/Events'
import { FAQSection } from './components/FAQ'
import { Contact } from './components/Contact'
import { Admin } from './components/Admin'
import '@fontsource/bangers';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom'
import { Register } from './components/Register'
import Navbar from './components/Navbar'
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { useState, useEffect } from 'react';
import RegClosed from './components/RegClosed'
import Footer from './components/Footer'
import confetti from 'canvas-confetti';
import ConfettiHint from './components/ConfettiHint';
import LaunchOverlay from './components/LaunchOverlay';


const AdminRoute = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      Loading...
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <Admin />;
};

function App() {
  const [isRevealed, setIsRevealed] = useState(() => {
    return localStorage.getItem('siteRevealed') === 'true' || false;
  });
  const [registrationOpen, setRegistrationOpen] = useState(() => {
    return localStorage.getItem('registrationOpen') === 'true' || false;
  });

  // Add inauguration function that can be triggered by HOD
  const inaugurateWebsite = () => {
    setIsRevealed(true);
    localStorage.setItem('siteRevealed', 'true');
    
    // Launch grand confetti celebration for inauguration
    confetti({
      particleCount: 500,
      spread: 180,
      origin: { y: 0.6, x: 0.5 },
      colors: ['#ff1f53', '#4D21FF', '#ffc247', '#ffffff'],
      startVelocity: 45,
      gravity: 1,
    });
    
    // Enable registrations
    setRegistrationOpen(true);
    localStorage.setItem('registrationOpen', 'true');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Special key combination for HOD to inaugurate (Ctrl+Alt+I)
      if (event.ctrlKey && event.altKey && event.key === 'i') {
        event.preventDefault();
        inaugurateWebsite();
      }
      
      // Keep space for regular confetti
      if (event.code === 'Space' || event.key === ' ') {
        event.preventDefault();
        
        if (isRevealed) {
          // Just show confetti if site is already revealed
          confetti({
            particleCount: 200,
            spread: 160,
            origin: { y: 0.6 },
            colors: ['#ff1f53', '#4D21FF', '#ffc247', '#ffffff'],
            startVelocity: 45,
          });
        }
      }
    };
    
    // Add the event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isRevealed]);

  return (
    <LaunchOverlay isRevealed={isRevealed} onReveal={inaugurateWebsite}>
      <div className='bg-[#FFC247]'>
        {isRevealed && <ConfettiHint />}
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Events />
              <Schedule />
              <Gallery />
              <FAQSection />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/register" element={
            <>
              <Navbar />
              {registrationOpen ? (
                <Register />
              ) : (
                <RegClosed />
              )}
            </>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminRoute />} />
        </Routes>
      </div>
    </LaunchOverlay>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
}