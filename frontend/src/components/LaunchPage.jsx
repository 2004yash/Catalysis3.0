import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimer } from 'react-timer-hook';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';

const LaunchPage = () => {
  const [showTimer, setShowTimer] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  // Set expiry time to 15 minutes from now when countdown starts
  const startCountdown = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 15 * 60); // 15 minutes
    restart(time);
    setShowTimer(true);
  };

  // For demo/testing purposes, use a shorter countdown (10 seconds)
  const startDemoCountdown = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 10); // 10 seconds for testing
    restart(time);
    setShowTimer(true);
  };

  // Handle countdown completion
  const onExpire = useCallback(() => {
    setLaunched(true);
    setShowConfetti(true);
    
    // Stop confetti after 6 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 6000);
    
    // Store in localStorage that the site has been revealed
    localStorage.setItem('siteRevealed', 'true');
    localStorage.setItem('registrationOpen', 'true');
  }, []);

  const {
    seconds,
    minutes,
    hours,
    restart,
  } = useTimer({ 
    expiryTimestamp: new Date(), 
    onExpire,
    autoStart: false 
  });

  // Navigate to the main app
const handleExplore = () => {
    // Reload the page instead of navigating to the same route
    window.location.reload();
    // Alternatively, you could navigate to a specific page:
    // navigate('/home');
};

  // Check if we're in the last 3 seconds for special effects
  const isLastThreeSeconds = hours === 0 && minutes === 0 && seconds <= 3 && seconds > 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFC247] overflow-hidden relative">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 z-0"></div>
      
      {/* Decorative elements */}
      <motion.img
        src="/images/chem.png"
        alt="Chemistry"
        className="absolute left-10 bottom-20 w-32 md:w-48 opacity-60 z-0"
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 5,
          ease: "easeInOut" 
        }}
      />
      
      <motion.img
        src="/images/game.png"
        alt="Game"
        className="absolute right-10 top-20 w-32 md:w-48 opacity-60 z-0"
        animate={{
          y: [0, 15, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 5,
          ease: "easeInOut",
          delay: 0.5 
        }}
      />
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <AnimatePresence mode="wait">
          {!showTimer && !launched ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-5xl sm:text-7xl font-stat font-bold relative text-center tracking-wide mb-6">
                {Array.from("CATALYSIS v3.0").map((letter, index) => (
                  <span key={index} className="relative inline-block mx-0.5">
                    <span className="absolute md:top-[7px] top-[4px] right-[7px] text-black">
                      {letter}
                    </span>
                    <span className="relative text-[#ff1f53]">{letter}</span>
                  </span>
                ))}
              </h1>
              
              <p className="text-xl sm:text-2xl font-comic-neue mb-12 text-[#2606AA]">
                Are you ready? Click below to start the countdown!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={startCountdown}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#ff1f53] text-white rounded-xl border-4 border-black shadow-comic text-xl font-comic flex items-center group relative overflow-hidden"
                >
                  <span className="relative z-10">Start 15-Minute Countdown</span>
                  <motion.div
                    className="absolute inset-0 bg-[#ffc247]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                </motion.button>
                
                <motion.button
                  onClick={startDemoCountdown}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#2606AA] text-white rounded-xl border-4 border-black shadow-comic text-xl font-comic flex items-center group relative overflow-hidden"
                >
                  <span className="relative z-10">Quick Demo (10s)</span>
                  <motion.div
                    className="absolute inset-0 bg-[#ff1f53]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                </motion.button>
              </div>
            </motion.div>
          ) : showTimer && !launched ? (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex flex-col items-center"
            >
              <h2 className="text-3xl sm:text-4xl font-comic mb-12 text-[#2606AA]">
                Catalysis v3.0 Launch Countdown
              </h2>
              
              <div className="flex gap-4">
                <TimerBox 
                  value={hours} 
                  label="Hours" 
                  isHighlighted={isLastThreeSeconds} 
                />
                <span className="text-4xl font-comic text-[#ff1f53] self-center">:</span>
                <TimerBox 
                  value={minutes} 
                  label="Minutes" 
                  isHighlighted={isLastThreeSeconds} 
                />
                <span className="text-4xl font-comic text-[#ff1f53] self-center">:</span>
                <TimerBox 
                  value={seconds} 
                  label="Seconds" 
                  isHighlighted={isLastThreeSeconds} 
                />
              </div>
              
              <p className="mt-16 text-xl text-[#ff1f53] font-comic animate-pulse">
                Get ready for an amazing technical fest!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="launched"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                bounce: 0.4
              }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ 
                  backgroundColor: ["#2606AA", "#FFC247", "#2606AA"],
                  transition: { 
                    duration: 2, 
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                    repeat: 0
                  }
                }}
                className="bg-[#2606AA] px-8 py-6 rounded-xl border-4 border-black mb-12"
              >
                <h1 className="text-3xl sm:text-5xl font-stat font-bold text-white mb-4">
                  🚀 CATALYSIS v3.0 HAS LAUNCHED!
                </h1>
                <p className="text-xl sm:text-2xl font-comic-neue text-white">
                  Get ready for an electrifying experience!
                </p>
              </motion.div>
              
              <motion.button
                onClick={handleExplore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#ff1f53] text-white rounded-xl border-4 border-black shadow-comic text-xl font-comic flex items-center group relative overflow-hidden"
              >
                <span className="relative z-10">START EXPLORING</span>
                <motion.div
                  className="absolute inset-0 bg-[#ffc247]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Confetti explosion when timer reaches zero */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          colors={['#ff1f53', '#2606AA', '#FFC247', '#ffffff']}
        />
      )}
    </div>
  );
};

// Timer box component with special effects for the last 3 seconds
const TimerBox = ({ value, label, isHighlighted }) => {
  // Format the value to always be two digits
  const formattedValue = value < 10 ? `0${value}` : value;
  
  return (
    <motion.div
      className="flex flex-col items-center"
      animate={isHighlighted ? {
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }
      } : {}}
    >
      <motion.div 
        className={`
          w-24 h-24 sm:w-32 sm:h-32 
          flex items-center justify-center 
          bg-white border-4 border-black rounded-xl 
          shadow-comic font-comic text
          relative
          overflow-hidden
        `}
        style={{ transform: 'rotate(-2deg)' }}
        whileHover={{ rotate: '2deg' }}
        animate={isHighlighted ? {
          backgroundColor: ['#FFFFFF', '#FFC247', '#FF1F53', '#FFC247', '#FFFFFF'],
          transition: {
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }
        } : {}}
      >
        <span className={`
          text-4xl sm:text-6xl font-bold 
          ${isHighlighted ? 'text-black' : 'text-[#2606AA]'}
        `}>
          {formattedValue}
        </span>
      </motion.div>
      <span className="mt-2 text-sm text-[#2606AA] font-comic uppercase">
        {label}
      </span>
    </motion.div>
  );
};

export default LaunchPage;
