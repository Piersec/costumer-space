"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export default function SplashScreen() {
  const [show, setShow] = useState(true);
  const [videoSrc, setVideoSrc] = useState("/videos/splashW.mp4");

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setVideoSrc("/videos/splashB.mp4");
    } else {
      setVideoSrc("/videos/splashW.mp4");
    }

    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [resolvedTheme]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-white dark:bg-black flex items-center justify-center"
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