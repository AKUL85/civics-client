import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = false,
  onClick = null,
  ...props 
}) => {
  const baseClasses = "bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg";
  const hoverClasses = hover ? "hover:bg-white/20 hover:scale-105 cursor-pointer" : "";
  const combinedClasses = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <motion.div
      className={combinedClasses}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;