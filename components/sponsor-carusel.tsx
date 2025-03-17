"use client";

import { getSponsor } from "@/lib/actions";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SponsorCarousel() {
  const [sponsors, setSponsor] = useState<any[]>([]);
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
    <div className="flex absolute top-0 w-full bg-gray-100">
      <p className="px-4 font-bold">TOP SUPPORTER</p>

      <div className="overflow-hidden w-full bg-gray-100 py-2 ">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          }}
        >
          {sponsors &&
            sponsors.map((sponsor, index) => (
              <span key={index} className="text-lg font-semibold">
                {sponsor.supporter_name}
              </span>
            ))}
        </motion.div>
      </div>
    </div>
  );
}
