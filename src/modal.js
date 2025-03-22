import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from './lib/utils';

const Modal = ({ onConfirm, onDecline }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show modal after a short delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    onConfirm();
    setVisible(false);
  };

  const handleDecline = () => {
    onDecline();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80"
      />
      
      {/* Modal */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className={cn(
          "relative w-full max-w-md p-6 mx-4 overflow-hidden rounded-2xl",
          "bg-black border-4 border-yellow-400 text-center z-10"
        )}
      >
        <img 
          src="cpfp.jpg" 
          alt="CZ Portrait" 
          className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-yellow-400 object-cover"
        />
        
        <h2 className="text-3xl font-custom text-yellow-400 mb-6" style={{ WebkitTextStroke: '1px black', textStroke: '1px black' }}>
          Are you loyal to CZ?
        </h2>
        
        <p className="text-white mb-8 font-custom">
          BSC6900 is only for true believers in the Binance SuperCycle.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleConfirm}
            className="bg-yellow-400 text-black border-2 border-black px-8 py-3 rounded-full font-custom text-lg w-full sm:w-auto"
          >
            YES, ALWAYS
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDecline}
            className="bg-black text-yellow-400 border-2 border-yellow-400 px-8 py-3 rounded-full font-custom text-lg w-full sm:w-auto"
          >
            NO, I'M NGMI
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;