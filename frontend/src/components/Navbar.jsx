"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Home", "Booking", "Account"];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full flex justify-center fixed top-6 z-50">
      {/* Floating Glass Navbar */}
      <motion.div
        initial={{ opacity: 0, y: -20, width: "80%" }}
        animate={{
          opacity: 1,
          y: 0,
          width: isScrolled ? "65%" : "80%",
          backgroundColor: isScrolled
            ? "rgba(255,245,245,0.7)" // light red tint
            : "rgba(255,255,255,0.85)",
          boxShadow: isScrolled
            ? "0 8px 30px rgba(0,0,0,0.1)"
            : "0 4px 20px rgba(0,0,0,0.05)",
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        className="backdrop-blur-xl border border-white/30 rounded-full px-6 py-3"
      >
        <motion.div
          animate={{ scale: isScrolled ? 0.92 : 1 }}
          transition={{ type: "spring", stiffness: 150 }}
          className="flex items-center justify-between w-full"
        >
          {/* Logo */}
          <div className="text-2xl font-extrabold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent cursor-pointer">
            RedBus
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={`#${item.toLowerCase()}`}
                whileHover={{ y: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative cursor-pointer transition"
              >
                {item}
                <motion.span
                  className="absolute left-0 bottom-[-4px] h-[2px] w-full bg-gradient-to-r from-red-600 to-red-500 origin-left scale-x-0"
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.08, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-gradient-to-r from-red-600 to-red-500 
                       text-white px-5 py-2 rounded-full font-medium shadow-md 
                       hover:shadow-lg transition"
          >
            Developer Info
          </motion.button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </motion.div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-24 w-[90%] bg-white/95 backdrop-blur-xl 
                       border border-red-100 rounded-2xl shadow-xl p-6 md:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="flex flex-col space-y-6 text-gray-800 font-medium"
            >
              {navItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={`#${item.toLowerCase()}`}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  whileHover={{ x: 5, color: "#dc2626" }} // red hover
                  transition={{ type: "spring", stiffness: 200 }}
                  className="cursor-pointer"
                >
                  {item}
                </motion.a>
              ))}

              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-600 to-red-500 
                           text-white px-5 py-2 rounded-full font-medium shadow-md 
                           hover:shadow-lg transition"
              >
                Developer Info
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
