"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          className="flex-grow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Layout;
