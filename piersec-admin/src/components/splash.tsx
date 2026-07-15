"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // espera não só montar, mas o tema já estar resolvido
  if (!mounted || !resolvedTheme) return null;

  const videoSrc =
    resolvedTheme === "dark" ? "/videos/splashB.mp4" : "/videos/splashW.mp4";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-100 bg-white dark:bg-black flex items-center justify-center"
        >
          <div className="w-60 h-60 overflow-hidden rounded-md">
            <video
              key={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              controlsList="nodownload noplaybackrate noremoteplayback"
              className="object-cover pointer-events-none select-none"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}