"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

export default function Settings() {


  return (
    <div>
      <a href="/admin/dashboard/config">
      <button
        className="
                h-15 w-15 items-center justify-between rounded-full border
            "
      >
        <FontAwesomeIcon icon={faGear}
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
      </a>
    </div>
  );
}
