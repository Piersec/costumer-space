"use client";

interface PiercastModalProps {
  title: string;
  description: string;
  videoUrl: string;
  topics: string[];
  footerText?: string;
  close: () => void;
}

function getYoutubeId(url: string): string {
  if (!url) return "";

  const regExp =
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;

  const match = url.match(regExp);

  return match && match[1].length === 11 ? match[1] : "";
}

export default function PiercastModal({
  title,
  description,
  videoUrl,
  topics,
  footerText,
  close,
}: PiercastModalProps) {
  const videoId = getYoutubeId(videoUrl);

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        backdrop-blur
        flex
        items-center
        justify-center
        z-50
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          w-[90%]
          max-w-5xl
          max-h-[90vh]
          overflow-auto
          p-6
          relative
        "
      >
        <button
          onClick={close}
          className="
            absolute
            right-5
            top-5
            bg-gray-100
            rounded-full
            w-10
            h-10
          "
        >
          ✕
        </button>

        {videoId && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            className="
              w-full
              h-[450px]
              rounded-xl
            "
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        <div className="mt-6">
          <h2
            className="
              text-3xl
              font-bold
              mb-5
            "
          >
            {title}
          </h2>

          <p
            className="
              text-gray-600
              leading-8
              whitespace-pre-line
            "
          >
            {description}
          </p>

          {topics.length > 0 && (
            <>
              <h3
                className="
                  text-xl
                  font-bold
                  mt-8
                  mb-5
                "
              >
                Falamos sobre:
              </h3>

              <ul
                className="
                  space-y-3
                "
              >
                {topics.map((topic, index) => (
                  <li key={index}>✓ {topic}</li>
                ))}
              </ul>
            </>
          )}

          {footerText && (
            <div
              className="
                mt-8
                p-5
                bg-blue-50
                rounded-xl
              "
            >
              {footerText}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}