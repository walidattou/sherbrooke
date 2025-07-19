"use client";

import PageWrapper from "@/components/PageWrapper";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLanguage();

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
              {t("aboutTitle")}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("aboutSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="relative bg-gray-200 rounded-lg h-80 overflow-hidden">
                <Image
                  src="/About.png"
                  alt="About Us"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">{t("ourStory")}</h2>
              <p className="text-lg text-gray-600">
                {t("aboutDescription1")}
              </p>
              <p className="text-lg text-gray-600">
                {t("aboutDescription2")}
              </p>
              <p className="text-lg text-gray-600">
                {t("aboutDescription3")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
