"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {


  return (
    <div className="h-15 w-15 items-center flex justify-center rounded-full border">
      <a href="/admin/dashboard/config">
      <button
        className="
                
            "
      >
        <FontAwesomeIcon icon={faGear}
          className="
                
                animation
                transition hover:scale-125
                flex
                justify-center
                items-center
                text-[16px]
                text-black
                dark:text-white
                "
        />
      </button>
      </a>
    </div>
  );
}
