"use client";

import PageWrapper from "@/components/PageWrapper";
import DishTable from "@/components/DishTable";
import { grillsData } from "@/data/grills";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function Grills() {
  const { t } = useLanguage();

  return (
    <PageWrapper>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12">
            <div className="rounded-lg relative overflow-hidden h-[400px] flex items-center justify-center">
              <Image
                src="/GrillsPage.png"
                alt="Grills"
                fill
                className="object-cover"
                priority
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              
              <div className="relative z-10 px-6">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-wide">
                  {t("grillsTitle")}
                </h1>
                <p className="text-2xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed">
                  {t("grillsDescription")}
                </p>
              </div>
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
