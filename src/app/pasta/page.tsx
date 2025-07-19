"use client";

import PageWrapper from "@/components/PageWrapper";
import MenuContainer from "@/components/MenuContainer";
import { pastaData } from "@/data/pasta";
import { motion } from "framer-motion";

export default function Pasta() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative">
        <div className="relative overflow-hidden h-[500px] flex items-center justify-center bg-gradient-to-br from-amber-600 via-orange-600 to-red-600">
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
          </div>
          
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-8xl md:text-9xl mb-6"
            >
              🍝
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white tracking-wide">
              Pasta
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-medium leading-relaxed">
              Fusion pasta dishes with Indian flavors and fresh ingredients for a unique culinary experience
            </p>
            
            {/* Scroll indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-12"
            >
              <div className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-3 bg-white/70 rounded-full mt-2"
                />
              </div>
              <p className="text-white/70 text-sm mt-2">Scroll to explore menu</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Menu Section */}
      <MenuContainer dishes={pastaData} title="Pasta" />
    </PageWrapper>
  );
}
