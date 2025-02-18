'use client';

import { motion } from "framer-motion";

const Spinner = () => (
  <motion.div
    className="h-10 w-10 border-4 border-t-green-500 border-r-green-500 border-b-green-200 border-l-green-200 rounded-full"
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

const LoadingState = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900"
    >
      <Spinner />
    </motion.div>
  );
};

export default LoadingState;