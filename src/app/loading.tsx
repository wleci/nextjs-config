"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const dotVariants = {
    hidden: { opacity: 0.3, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
      <motion.div
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Spinning Loader */}
        <motion.div
          className="mb-6"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Loader2 className="h-12 w-12 text-blue-600 mx-auto" />
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-xl font-semibold text-slate-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Ładowanie...
        </motion.h2>

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center space-x-2"
          variants={containerVariants}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-blue-600 rounded-full"
              variants={dotVariants}
              transition={{
                delay: index * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mt-8 w-64 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
