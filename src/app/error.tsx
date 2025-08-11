"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, AlertTriangle, Bug } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Application error:", error);
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

  const shakeVariants = {
    animate: {
      x: [-2, 2, -2, 2, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  const errorId = error.digest || Math.random().toString(36).substring(7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-slate-900 dark:via-orange-900/20 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        className="max-w-xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Error Icon */}
        <motion.div
          className="relative mb-8"
          variants={shakeVariants}
          animate="animate"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-white" />
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Wystąpił błąd
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Przepraszamy, ale coś poszło nie tak podczas ładowania tej strony.
          </p>

          {/* Error ID */}
          <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 mb-4 text-sm">
            <p className="text-slate-600 dark:text-slate-400 mb-1">ID błędu:</p>
            <code className="font-mono text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
              {errorId}
            </code>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center mb-8"
          variants={itemVariants}
        >
          <Button
            onClick={reset}
            size="lg"
            className="gap-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:scale-105 transition-transform"
          >
            <RefreshCw className="h-5 w-5" />
            Spróbuj ponownie
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 hover:scale-105 transition-transform"
            >
              <Home className="h-5 w-5" />
              Strona główna
            </Button>
          </Link>
        </motion.div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === "development" && (
          <motion.div
            className="mt-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-left"
            variants={itemVariants}
          >
            <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
              <Bug className="h-4 w-4" />
              Szczegóły błędu (tryb deweloperski)
            </h3>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
              <div>
                <strong>Wiadomość:</strong> {error.message}
              </div>
              {error.stack && (
                <div>
                  <strong>Stack trace:</strong>
                  <pre className="mt-1 overflow-auto max-h-32 bg-slate-200 dark:bg-slate-700 p-2 rounded">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Help Text */}
        <motion.div
          className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700"
          variants={itemVariants}
        >
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Jeśli problem będzie się powtarzał, skontaktuj się z
            administratorem.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
