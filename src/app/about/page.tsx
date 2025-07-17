"use client";

import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";

export default function About() {
  return (
    <PageWrapper>
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-[#BF9040]">Resto Cabasyl</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A culinary journey that bridges cultures and flavors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                <span className="text-6xl">🍽️</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-600">
                At Resto Cabasyl, we believe that food is a universal language
                that brings people together. Our restaurant was born from a
                passion for creating unique culinary experiences that celebrate
                the rich traditions of Indian cuisine while embracing modern
                culinary techniques.
              </p>
              <p className="text-lg text-gray-600">
                Located in the heart of Montreal, we specialize in Indian fusion
                cuisine that combines traditional spices and cooking methods
                with contemporary presentations. Our menu features expertly
                grilled meats, fresh seafood preparations, innovative pasta
                dishes, and authentic Indian specialties.
              </p>
              <p className="text-lg text-gray-600">
                Every dish at Resto Cabasyl is prepared with fresh, high-quality
                ingredients and a dedication to authenticity that honors both
                traditional Indian flavors and the diverse culinary landscape of
                Montreal. We invite you to join us for an unforgettable dining
                experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
