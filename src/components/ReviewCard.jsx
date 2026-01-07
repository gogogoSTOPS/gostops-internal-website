import React, { useState } from 'react';
import { HostelIcon, DateIcon, BookingOrderIcon, OTAIcon, PhoneIcon, CardEmailIcon, AcceptIcon, RejectIcon } from '../icons/svgIcons';
import ImageViewer from './ImageViewer';
import Popup from './Popup';

const ReviewCard = ({ item, setShowToast, setToastMessage }) => {
  const [showImage, setShowImage] = useState(false);
  const [showImageURL, setShowImageURL] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popUpMode, setPopUpMode] = useState("");

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-[#FF9800]';
      case 'rejected':
        return 'bg-[#FF0000]';
      case 'accepted':
      default:
        return 'bg-[#008000]';
    }
  };

  return (
    <>
      <div className="bg-white rounded-[0.875rem] border-[0.874px] md:border border-[rgba(0,0,0,0.1)] p-4 md:p-6 gap-4 md:gap-6 flex flex-col lg:flex-row">

        {/* Image */}
        <div className="flex flex-col w-full lg:w-1/2 gap-2">
          <div
            className="h-[14.75rem] rounded-lg overflow-hidden cursor-pointer"
            onClick={() => {
              setShowImage(true);
              setShowImageURL(item?.photo || "");
            }}
          >
            <img
              src={item?.photo}
              alt={item?.userName}
              className="bg-gray-100 h-full w-full object-contain rounded-lg"
            />
          </div>
          <span className="text-[#717182] text-[0.75rem] leading-[1rem] font-normal text-center">
            Click to view full screen
          </span>
        </div>

        {/* Content Details */}
        <div className="flex flex-col w-full lg:w-1/2 gap-2 items-start min-w-0">

          {/* Header: Name, ID and Status Tag */}
          <div className="flex w-full justify-between items-start gap-2">
            {/* Name & ID */}
            <div className="flex flex-col gap-[0.125rem] min-w-0 flex-1">
              <span className="text-[1.125rem] leading-[1.6875rem] text-[#0A0A0A] font-bold break-words">
                {item.userName}
              </span>
              <span className="text-[0.875rem] leading-[1.25rem] text-[#717182] font-normal break-words">
                {item.claimId}
              </span>
            </div>

            {/* Status Tag */}
            <div className={`flex px-[8px] py-[2px] justify-center items-center gap-1 rounded-[8px] border-[0.823px] border-transparent ${getStatusColor(item.status)} shrink-0`}>
              <span className="text-white text-[0.75rem] font-medium leading-[1.25rem] capitalize">
                {item.status || 'N/A'}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="flex flex-col gap-2 w-full mt-2">

            <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
              {/* Hostel Name */}
              <div className="flex items-center gap-2 w-full md:basis-1/2 min-w-0">
                <HostelIcon />
                <span className="text-[0.875rem] leading-[1.25rem] text-[#0A0A0A] font-normal break-words whitespace-normal">
                  {item.hostelName}
                </span>
              </div>
              {/* Date */}
              <div className="flex items-center gap-2 w-full md:basis-1/2 min-w-0">
                <DateIcon />
                <span className="text-[0.875rem] leading-[1.25rem] text-[#0A0A0A] font-normal break-words">
                  {new Date(item.checkoutDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
              {/* Booking Order ID */}
              <div className="flex items-center gap-2 w-full md:basis-1/2 min-w-0">
                <BookingOrderIcon />
                <span className="text-[0.875rem] leading-[1.25rem] text-[#0A0A0A] font-normal break-words whitespace-normal">
                  {item.bookingId}
                </span>
              </div>
              {/* OTA ID */}
              <div className="flex items-center gap-2 w-full md:basis-1/2 min-w-0">
                <OTAIcon />
                <span className="text-[0.875rem] leading-[1.25rem] text-[#0A0A0A] font-normal break-words whitespace-normal">
                  {item.otaVoucherId}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-4 w-full">
              {/* Phone */}
              <div className="flex items-center gap-2 w-full md:basis-1/2 min-w-0">
                <PhoneIcon />
                <span className="text-[0.875rem] leading-[1.25rem] text-[#0A0A0A] font-normal break-words">
                  {item.phone}
                </span>
              </div>
              {/* Email */}
              <div className="flex items-center gap-2 w-full md:basis-1/2 min-w-0">
                <CardEmailIcon />
                <span className="text-[0.875rem] leading-[1.25rem] text-[#0A0A0A] font-normal break-words whitespace-normal">
                  {item.email}
                </span>
              </div>
            </div>

            {/* Review Date & Time */}
            <div>
              <span className="text-[#717182] text-[0.75rem] leading-[1rem] font-normal text-center">
                {new Date(item.dateTime).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>

            {item.status == "accepted" &&
              <div className="flex w-full p-2 bg-[#F0FDF4] rounded-[0.5rem] border-[0.823px] md:border border-[#B9F8CF]">
                <span className="text-[#0D542B] text-[0.75rem] leading-[1rem] font-normal">
                  Note: {item?.acceptanceComment || "Accepted without comments."}
                </span>
              </div>
            }
            {item.status == "rejected" &&
              <div className="flex w-full p-2 bg-[#FEF2F2] rounded-[0.5rem] border-[0.823px] md:border border-[#FFC9C9]">
                <span className="text-[#82181A] text-[0.75rem] leading-[1rem] font-normal">
                  Rejected: {item?.rejectionReason || "No reason provided."}
                </span>
              </div>
            }
            {item.status == "pending" &&
              <div className="flex flex-col md:flex-row gap-2">
                <button
                  onClick={() => {
                    setPopUpMode("accept");
                    setShowPopup(true);
                  }}
                  className="flex items-center justify-center cursor-pointer w-full md:w-auto bg-[#008000] px-2.5 py-1.5 rounded-[0.5rem] gap-2.5"
                >
                  <AcceptIcon />
                  <span className="text-white text-[0.875rem] leading-[1.25rem] font-medium">
                    Accept
                  </span>
                </button>
                <button
                  onClick={() => {
                    setPopUpMode("reject");
                    setShowPopup(true);
                  }}
                  className="flex items-center justify-center cursor-pointer w-full md:w-auto bg-[#D4183D] px-2.5 py-1.5 rounded-[0.5rem] gap-2.5"
                >
                  <RejectIcon />
                  <span className="text-white text-[0.875rem] leading-[1.25rem] font-medium">
                    Reject
                  </span>
                </button>
              </div>
            }

          </div>

        </div>

      </div>

      {showImage &&
        <ImageViewer
          setShowImage={setShowImage}
          showImageURL={showImageURL}
          setShowImageURL={setShowImageURL}
        />
      }
      {
        showPopup &&
        <Popup
          mode={popUpMode}
          setShowPopup={setShowPopup}
          claimId={item.claimId}
          setShowToast={setShowToast}
          setToastMessage={setToastMessage}
        />
      }
    </>
  )
}

export default ReviewCard;