"use client";

import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

export default function ColorMode() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <button title="Mudar Tema"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="
                h-15 w-15 items-center justify-between rounded-full border
            "
      >
        <FontAwesomeIcon
          icon={theme === "dark" ? faSun : faMoon}
          className="
                flex
                justify-center
                items-center
                text-[16px]
                    text-black
                    dark:text-white
                "
        />
      </button>
    </div>
  );
}
