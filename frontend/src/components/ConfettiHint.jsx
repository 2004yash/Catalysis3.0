import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const ConfettiHint = () => {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Hide the hint after 10 seconds
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 10000);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center"
        >
          <Sparkles className="w-5 h-5 mr-2 text-[#ffc247]" />
          <span className="font-comic text-sm">Press <kbd className="bg-white text-black px-2 py-1 rounded font-mono text-xs mx-1">SPACE</kbd> for confetti magic!</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiHint;
