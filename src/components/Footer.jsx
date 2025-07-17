"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Restaurant Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <h3 className="text-xl font-bold mb-4">
              Resto <span className="text-[#BF9040]">Cabasyl</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Experience the perfect fusion of Indian cuisine, grilled
              specialties, and fresh seafood in Montreal.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <MapPin size={18} className="mr-2 text-[#BF9040]" />
                <span>5868 rue Sherbrooke O, Montreal, QC H4A 1X5</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-2 text-[#BF9040]" />
                <span>514.434.4466</span>
              </div>
              <div className="flex items-center">
                <Mail size={18} className="mr-2 text-[#BF9040]" />
                <span>info@restocabasyl.ca</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-[#BF9040]" />
                <span>11:00 AM – 12:00 PM</span>
              </div>
            </div>
          </motion.div>

          {/* Order Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}>
            <h3 className="text-xl font-bold mb-4">Order Online</h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#BF9040] hover:bg-[#A67A35] text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                Order on Uber Eats
                <ExternalLink size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-transparent border-2 border-[#BF9040] text-[#BF9040] hover:bg-[#BF9040] hover:text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2">
                Order on DoorDash
                <ExternalLink size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Resto Cabasyl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
