"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function DashboardLoading() {
  const skeletonVariants = {
    hidden: { opacity: 0.3 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded"
              variants={skeletonVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.div
              className="w-32 h-6 bg-slate-200 dark:bg-slate-700 rounded"
              variants={skeletonVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Skeleton */}
        <div className="w-64 bg-white dark:bg-slate-800 shadow-lg min-h-screen">
          <div className="p-6">
            <motion.div
              className="w-24 h-8 bg-slate-200 dark:bg-slate-700 rounded mb-6"
              variants={skeletonVariants}
              initial="hidden"
              animate="visible"
            />

            {/* Navigation Items */}
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                className="flex items-center gap-3 mb-4"
                variants={skeletonVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: item * 0.1 }}
              >
                <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="w-20 h-4 bg-slate-200 dark:bg-slate-700 rounded" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 p-6">
          <div className="text-center py-12">
            {/* Loading Icon */}
            <motion.div
              className="mb-6"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <BarChart3 className="h-12 w-12 text-blue-600 mx-auto" />
            </motion.div>

            {/* Loading Text */}
            <motion.h2
              className="text-lg font-semibold text-slate-900 dark:text-white mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Ładowanie dashboardu...
            </motion.h2>

            <motion.p
              className="text-slate-600 dark:text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Przygotowujemy Twoje dane
            </motion.p>

            {/* Progress Dots */}
            <motion.div
              className="flex justify-center space-x-2 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-blue-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Content Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3].map((card) => (
              <motion.div
                key={card}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
                variants={skeletonVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: card * 0.1 }}
              >
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4" />
                <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="w-16 h-6 bg-slate-200 dark:bg-slate-700 rounded" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
