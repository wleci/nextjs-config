"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  const router = useRouter();

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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating 404 Animation */}
        <motion.div
          className="relative mb-8"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            404
          </div>
          <motion.div
            className="absolute -top-4 -right-4 text-yellow-500"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <AlertTriangle className="h-8 w-8" />
          </motion.div>
        </motion.div>

        {/* Error Message */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Strona nie została znaleziona
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
            Ups! Wygląda na to, że zabłądziłeś w cyfrowej przestrzeni.
          </p>
          <p className="text-slate-500 dark:text-slate-400">
            Strona, której szukasz, mogła zostać przeniesiona, usunięta lub po
            prostu nie istnieje.
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="flex justify-center mb-8"
          variants={itemVariants}
        >
          <div className="relative">
            <motion.div
              className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
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
              className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-30"
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
              <Search className="h-12 w-12 text-slate-400 dark:text-slate-500" />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            size="lg"
            className="gap-2 hover:scale-105 transition-transform"
          >
            <ArrowLeft className="h-5 w-5" />
            Wróć
          </Button>

          <Link href="/">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-transform"
            >
              <Home className="h-5 w-5" />
              Strona główna
            </Button>
          </Link>
        </motion.div>

        {/* Help Links */}
        <motion.div
          className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700"
          variants={itemVariants}
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Potrzebujesz pomocy? Sprawdź te linki:
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/dashboard"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
            >
              Dashboard
            </Link>
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
            >
              Logowanie
            </Link>
            <Link
              href="/health"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
            >
              Status systemu
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
