"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, RefreshCw, AlertCircle, Bug, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to monitoring service (Sentry, LogRocket, etc.)
    console.error("Global error:", error);
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

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const errorId = error.digest || Math.random().toString(36).substring(7);

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-red-900/20 dark:to-slate-900 flex items-center justify-center p-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Error Icon Animation */}
            <motion.div
              className="relative mb-8"
              variants={pulseVariants}
              animate="animate"
            >
              <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                500
              </div>
              <motion.div
                className="absolute -top-4 -right-4 text-red-500"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertCircle className="h-8 w-8" />
              </motion.div>
            </motion.div>

            {/* Error Message */}
            <motion.div variants={itemVariants} className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Błąd serwera
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
                Ups! Coś poszło nie tak po naszej stronie.
              </p>
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                Nasz zespół został automatycznie powiadomiony o tym problemie.
              </p>

              {/* Error ID */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                  ID błędu:
                </p>
                <code className="text-sm font-mono text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">
                  {errorId}
                </code>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <motion.div
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <div className="relative">
                <motion.div
                  className="w-32 h-32 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  }}
                />
                <motion.div
                  className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full opacity-30"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Bug className="h-12 w-12 text-slate-400 dark:text-slate-500" />
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
              variants={itemVariants}
            >
              <Button
                onClick={reset}
                variant="outline"
                size="lg"
                className="gap-2 hover:scale-105 transition-transform"
              >
                <RefreshCw className="h-5 w-5" />
                Spróbuj ponownie
              </Button>

              <Link href="/">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:scale-105 transition-transform"
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
                  Szczegóły błędu (tylko w trybie deweloperskim)
                </h3>
                <pre className="text-xs text-slate-600 dark:text-slate-400 overflow-auto max-h-32">
                  {error.message}
                  {error.stack && `\n\n${error.stack}`}
                </pre>
              </motion.div>
            )}

            {/* Contact Support */}
            <motion.div
              className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700"
              variants={itemVariants}
            >
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                Problem nadal występuje? Skontaktuj się z nami:
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a
                  href="mailto:support@wleci.com"
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:underline flex items-center gap-1"
                >
                  <Mail className="h-4 w-4" />
                  support@wleci.com
                </a>
                <Link
                  href="/health"
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:underline"
                >
                  Status systemu
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
