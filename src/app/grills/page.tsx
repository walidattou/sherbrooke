"use client";

import PageWrapper from "@/components/PageWrapper";
import DishTable from "@/components/DishTable";
import { grillsData } from "@/data/grills";
import { motion } from "framer-motion";

export default function Grills() {
  return (
    <PageWrapper>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-16 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🔥 Grills
              </h1>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                Tender grilled meats and vegetables marinated in aromatic spices
                and cooked to perfection
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <DishTable dishes={grillsData} />
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
