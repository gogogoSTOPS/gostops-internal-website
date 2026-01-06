import React, { useEffect } from "react";

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

  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = showImageURL;
    link.download = "image.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 md:px-0">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Viewer */}
      <div
        className="
          relative z-10 w-full max-w-[50%]
          h-[80vh] md:h-[90vh]
          bg-black rounded-2xl
          grid grid-rows-[auto_1fr_1fr_1fr_auto]
        "
      >
        {/* Buttons */}
        <div className="flex justify-end items-center gap-4 px-4 py-4 mt-2 mr-2">
          <button onClick={downloadImage} className="w-6 h-6 cursor-pointer items-center justify-center flex">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full h-full shrink-0">
              <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="white" strokeWidth="1.33333" strokeLinecap="round" />
              <path d="M4.66797 6.66797L8.0013 10.0013L11.3346 6.66797" stroke="white" strokeWidth="1.33333" strokeLinecap="round" />
              <path d="M8 10V2" stroke="white" strokeWidth="1.33333" strokeLinecap="round" />
            </svg>
          </button>

          <button onClick={handleClose} className="w-6 h-6 cursor-pointer flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full h-full shrink-0">
              <path d="M12 4L4 12" stroke="white" strokeWidth="1.33333" strokeLinecap="round" />
              <path d="M4 4L12 12" stroke="white" strokeWidth="1.33333" strokeLinecap="round" />
            </svg>
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
