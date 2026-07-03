"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 bg-white flex items-center justify-center"
        >
          <video
  autoPlay
  loop
  muted
  playsInline
  controls={false}
  disablePictureInPicture
  controlsList="nodownload noplaybackrate noremoteplayback"
  className="w-60 h-auto pointer-events-none select-none"
>
  <source src="/videos/loading.mp4" type="video/mp4" />
</video>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}