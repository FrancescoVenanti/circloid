"use client";

import { getSponsor } from "@/lib/actions";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Trophy, Heart, Coffee } from "lucide-react";

export default function SponsorCarousel() {
  const [sponsors, setSponsor] = useState<any[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    getSponsor().then((data) => {
      setSponsor(
        data
          .filter((e) => !e.is_refunded)
          .toSorted((a, b) => b.support_coffees - a.support_coffees)
      );
    });
  }, []);

  return (
    <div
      className=" absolute top-0 w-full overflow-hidden bg-gradient-to-r from-gray-800 to-gray-500 shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className=" inset-0 opacity-10 bg-repeat-x mix-blend-overlay" />

      <div className="flex items-center h-12">
        <div className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-r-full">
          <Trophy className="w-4 h-4 text-amber-300" />
          <p className="font-bold text-white tracking-wider text-sm">
            TOP SUPPORTERS
          </p>
        </div>

        <div className="overflow-hidden w-full py-2">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: isHovered ? 30 : 15,
              ease: "linear",
            }}
          >
            {sponsors &&
              sponsors.map((sponsor, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {index === 0 && <Trophy className="w-4 h-4 text-amber-300" />}
                  {index === 1 && <Trophy className="w-4 h-4 text-gray-300" />}
                  {index === 2 && <Trophy className="w-4 h-4 text-amber-700" />}
                  {index > 2 && <Heart className="w-4 h-4 text-pink-400" />}

                  <span className="text-sm font-medium text-white">
                    {sponsor.supporter_name}
                  </span>

                  <div className="flex items-center gap-1 text-xs bg-black/20 px-2 py-0.5 rounded-full">
                    <Coffee className="w-3 h-3 text-amber-300" />
                    <span className="text-amber-200">
                      {sponsor.support_coffees}
                    </span>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
