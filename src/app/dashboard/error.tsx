"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle, Settings } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6">
      <motion.div
        className="max-w-md mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Error Icon */}
        <motion.div
          className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6"
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
        >
          <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Błąd dashboardu
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
            Wystąpił problem podczas ładowania dashboardu. Spróbuj odświeżyć
            stronę.
          </p>

          {process.env.NODE_ENV === "development" && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-left">
              <p className="text-xs text-red-700 dark:text-red-300 font-mono">
                {error.message}
              </p>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div className="flex flex-col gap-3" variants={itemVariants}>
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Odśwież dashboard
          </Button>

          <div className="flex gap-2">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <Settings className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full gap-2">
                <Home className="h-4 w-4" />
                Główna
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
