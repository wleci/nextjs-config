"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <main className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Analytics Coming Soon
        </h3>
        <p className="text-slate-600 dark:text-slate-400">
          Advanced analytics and reporting features will be available here.
        </p>
      </motion.div>
    </main>
  );
}
