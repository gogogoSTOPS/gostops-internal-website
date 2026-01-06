import React, { useEffect } from "react";
import { DownloadIcon, CloseIcon } from "../icons/svgIcons";

const ImageViewer = ({ setShowImage, showImageURL, setShowImageURL }) => {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setShowImage(false);
    setShowImageURL("");
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(showImageURL, {
        mode: "cors",
      });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;

      // Extract filename if possible
      const filename =
        showImageURL.split("/").pop()?.split("?")[0] || "image.jpg";

      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Image download failed", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 md:px-0">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Viewer */}
      <div
        className="
          relative z-10 w-full md:max-w-[50%]
          h-[80vh] md:h-[90vh]
          bg-black rounded-2xl
          grid grid-rows-[auto_1fr_1fr_1fr_auto]
        "
      >
        {/* Buttons */}
        <div className="flex justify-end items-center gap-4 px-4 py-4 mt-2">
          <button onClick={downloadImage} className="w-6 h-6 cursor-pointer items-center justify-center flex">
            <DownloadIcon />
          </button>

          <button onClick={handleClose} className="w-6 h-6 cursor-pointer flex items-center justify-center">
            <CloseIcon />
          </button>
        </div>

        {/* Image */}
        <div className="row-span-3 flex items-center justify-center">
          <img
            src={showImageURL}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* DOwnload Text */}
        <div
          onClick={downloadImage}
          className="flex items-center justify-center py-2 px-3 gap-4 cursor-pointer mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.66797 6.66797L8.0013 10.0013L11.3346 6.66797" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 10V2" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span className="text-white text-[0.875rem] font-medium leading-[1.25rem]">
            Download Image
          </span>
        </div>

      </div>
    </div>
  );
};

export default ImageViewer;
