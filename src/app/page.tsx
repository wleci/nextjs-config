"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Github,
  ExternalLink,
  Menu,
  X,
  Zap,
  Code,
  Palette,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  const switchLanguage = (lang: string) => {
    document.cookie = `lang=${lang}; path=/; max-age=31536000`;
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-xl">Wleci</span>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div
              className="hidden md:flex items-center gap-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a
                href="#home"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t("nav.home")}
              </a>
              <a
                href="#features"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t("nav.features")}
              </a>
              <a
                href="#docs"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {t("nav.docs")}
              </a>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => switchLanguage("en")}
                  className="px-2"
                >
                  EN
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => switchLanguage("pl")}
                  className="px-2"
                >
                  PL
                </Button>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Github className="h-4 w-4" />
                {t("nav.github")}
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col gap-4">
                <a href="#home" className="text-slate-600 dark:text-slate-300">
                  {t("nav.home")}
                </a>
                <a
                  href="#features"
                  className="text-slate-600 dark:text-slate-300"
                >
                  {t("nav.features")}
                </a>
                <a href="#docs" className="text-slate-600 dark:text-slate-300">
                  {t("nav.docs")}
                </a>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => switchLanguage("en")}
                    className="px-2"
                  >
                    EN
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => switchLanguage("pl")}
                    className="px-2"
                  >
                    PL
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="gap-2 w-fit">
                  <Github className="h-4 w-4" />
                  {t("nav.github")}
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t("hero.title")}
              </span>
              <br />
              {t("hero.subtitle")}
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center flex-wrap mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <ExternalLink className="h-5 w-5" />
              {t("hero.getStarted")}
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Github className="h-5 w-5" />
              {t("hero.viewSource")}
            </Button>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[
              {
                icon: Zap,
                title: t("features.fast.title"),
                description: t("features.fast.description"),
              },
              {
                icon: Code,
                title: t("features.developer.title"),
                description: t("features.developer.description"),
              },
              {
                icon: Palette,
                title: t("features.design.title"),
                description: t("features.design.description"),
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
