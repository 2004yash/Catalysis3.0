import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import PropTypes from 'prop-types';

const LaunchOverlay = ({ isRevealed, onReveal, children }) => {
  const [showCountdown, setShowCountdown] = useState(false);
  const [count, setCount] = useState(3);
  
  // Start countdown when button is pressed
  const startCountdown = () => {
    setShowCountdown(true);
    
    // Play countdown animation
    const timer = setInterval(() => {
      setCount(prevCount => {
        if (prevCount <= 1) {
          clearInterval(timer);
          
          // Reveal site after countdown finishes
          setTimeout(() => {
            onReveal();
            
            // Trigger confetti celebration
            confetti({
              particleCount: 300,
              spread: 180,
              origin: { y: 0.6 },
              colors: ['#ff1f53', '#4D21FF', '#ffc247', '#ffffff'],
              startVelocity: 45,
            });
          }, 500);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };
  
  if (isRevealed) {
    return <>{children}</>;
  }
  
  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#ffc247] text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffc247] to-[#ff9c47] opacity-50"></div>
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10"></div>
      
      <AnimatePresence>
        {showCountdown ? (
          <motion.div 
            key="countdown"
            className="z-20 flex items-center justify-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
          >
            {count > 0 ? (
              <motion.div
                key={count}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[200px] md:text-[300px] font-stat font-bold text-[#ff1f53] drop-shadow-[0_5px_0px_rgba(0,0,0,0.5)]"
              >
                {count}
              </motion.div>
            ) : (
              <motion.div
                key="go"
                initial={{ scale: 0, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="text-7xl md:text-9xl font-stat font-bold text-[#ff1f53] drop-shadow-[0_5px_0px_rgba(0,0,0,0.5)]"
              >
                GO!
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="welcome"
            className="z-10 text-center px-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
          >
            <motion.div 
              className="mb-12"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, -2, 0, 2, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut" 
              }}
            >
              <h1 className="text-6xl md:text-8xl font-stat font-bold relative text-center tracking-wide mb-6">
                {Array.from("CATALYSIS").map((letter, index) => (
                  <span key={index} className="relative inline-block mx-0.5">
                    <span className="absolute md:top-[7px] top-[4px] right-[7px] text-black">
                      {letter}
                    </span>
                    <span className="relative text-[#ff1f53]">{letter}</span>
                  </span>
                ))}
              </h1>
              <p className="text-2xl md:text-3xl text-black font-comic mt-4">ISE Department&apos;s Technical Festival</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block"
            >
              <button 
                onClick={startCountdown}
                className="bg-[#ff1f53] border-3 border-black text-white font-comic py-4 px-8 rounded-xl shadow-lg text-xl md:text-2xl relative overflow-hidden group"
              >
                <span className="relative z-10">Launch Website</span>
                <motion.div
                  className="absolute inset-0 bg-[#4D21FF]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative elements */}
      <div className="absolute -left-20 top-40 w-40 h-40 bg-[#ff1f53] rounded-full opacity-20 blur-xl"></div>
      <div className="absolute -right-20 bottom-40 w-60 h-60 bg-[#4D21FF] rounded-full opacity-20 blur-xl"></div>
      
      <motion.div 
        className="absolute bottom-4 left-0 right-0 text-center text-black font-comic text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
      >
        © 2025 Genesis Club - ISE Department
      </motion.div>
    </motion.div>
  );
};

// Add prop validations
LaunchOverlay.propTypes = {
  isRevealed: PropTypes.bool.isRequired,
  onReveal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default LaunchOverlay;
