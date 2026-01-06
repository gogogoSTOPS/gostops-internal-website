const ChevronDownIcon = ({ isOpen }) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
  >
    <g opacity={isOpen ? "1" : "0.5"}>
      <path d="M4 6L8 10L12 6" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const SearchIcon = () => (
  <svg width="1rem" height="1rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.9995 13.9995L11.1328 11.1328" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ClearIcon = ({ disabled }) => (
  <svg width="1rem" height="1rem" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={disabled ? "opacity-30" : "opacity-100"}>
    <path d="M12 4L4 12" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4L12 12" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.332 2.66602H2.66536C1.92898 2.66602 1.33203 3.26297 1.33203 3.99935V11.9993C1.33203 12.7357 1.92898 13.3327 2.66536 13.3327H13.332C14.0684 13.3327 14.6654 12.7357 14.6654 11.9993V3.99935C14.6654 3.26297 14.0684 2.66602 13.332 2.66602Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.6654 4.66602L8.68536 8.46602C8.47955 8.59497 8.24158 8.66336 7.9987 8.66336C7.75582 8.66336 7.51785 8.59497 7.31203 8.46602L1.33203 4.66602" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M7.9987 12.6673L3.33203 8.00065L7.9987 3.33398" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.6654 8H3.33203" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIconDesktop = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="#0A0A0A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIconMobile = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M14.9908 4.99609L4.99609 14.9908" stroke="#0A0A0A" strokeWidth="1.66579" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4.99609 4.99609L14.9908 14.9908" stroke="#0A0A0A" strokeWidth="1.66579" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReviewsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M16.6667 6.66797H3.33333C2.8731 6.66797 2.5 7.04106 2.5 7.5013V9.16797C2.5 9.62821 2.8731 10.0013 3.33333 10.0013H16.6667C17.1269 10.0013 17.5 9.62821 17.5 9.16797V7.5013C17.5 7.04106 17.1269 6.66797 16.6667 6.66797Z" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 6.66797V17.5013" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15.8346 10V15.8333C15.8346 16.2754 15.659 16.6993 15.3465 17.0118C15.0339 17.3244 14.61 17.5 14.168 17.5H5.83464C5.39261 17.5 4.96868 17.3244 4.65612 17.0118C4.34356 16.6993 4.16797 16.2754 4.16797 15.8333V10" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.2513 6.66703C5.69877 6.66703 5.16886 6.44754 4.77816 6.05684C4.38746 5.66614 4.16797 5.13623 4.16797 4.5837C4.16797 4.03116 4.38746 3.50126 4.77816 3.11056C5.16886 2.71986 5.69877 2.50036 6.2513 2.50036C7.05521 2.48636 7.84299 2.87641 8.51192 3.61966C9.18084 4.36292 9.69987 5.42487 10.0013 6.66703C10.3027 5.42487 10.8218 4.36292 11.4907 3.61966C12.1596 2.87641 12.9474 2.48636 13.7513 2.50036C14.3038 2.50036 14.8337 2.71986 15.2244 3.11056C15.6151 3.50126 15.8346 4.03116 15.8346 4.5837C15.8346 5.13623 15.6151 5.66614 15.2244 6.05684C14.8337 6.44754 14.3038 6.66703 13.7513 6.66703" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M12.6654 14V12.6667C12.6654 11.9594 12.3844 11.2811 11.8843 10.781C11.3842 10.281 10.7059 10 9.9987 10H5.9987C5.29145 10 4.61318 10.281 4.11308 10.781C3.61298 11.2811 3.33203 11.9594 3.33203 12.6667V14" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.9987 7.33333C9.47146 7.33333 10.6654 6.13943 10.6654 4.66667C10.6654 3.19391 9.47146 2 7.9987 2C6.52594 2 5.33203 3.19391 5.33203 4.66667C5.33203 6.13943 6.52594 7.33333 7.9987 7.33333Z" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="#364153" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.668 11.3346L14.0013 8.0013L10.668 4.66797" stroke="#364153" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8H6" stroke="#364153" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M3.99609 11.9922H19.9877" stroke="#0A0A0A" strokeWidth="1.99895" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.99609 5.99609H19.9877" stroke="#0A0A0A" strokeWidth="1.99895" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.99609 17.9922H19.9877" stroke="#0A0A0A" strokeWidth="1.99895" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DropdownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 6L8 10L12 6" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HostelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="shrink-0" fill="none">
    <g clipPath="url(#clip0_9306_68462)">
      <path d="M4 14.6654V2.66536C4 2.31174 4.14048 1.9726 4.39052 1.72256C4.64057 1.47251 4.97971 1.33203 5.33333 1.33203H10.6667C11.0203 1.33203 11.3594 1.47251 11.6095 1.72256C11.8595 1.9726 12 2.31174 12 2.66536V14.6654H4Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.9987 8H2.66536C2.31174 8 1.9726 8.14048 1.72256 8.39052C1.47251 8.64057 1.33203 8.97971 1.33203 9.33333V13.3333C1.33203 13.687 1.47251 14.0261 1.72256 14.2761C1.9726 14.5262 2.31174 14.6667 2.66536 14.6667H3.9987" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6H13.3333C13.687 6 14.0261 6.14048 14.2761 6.39052C14.5262 6.64057 14.6667 6.97971 14.6667 7.33333V13.3333C14.6667 13.687 14.5262 14.0261 14.2761 14.2761C14.0261 14.5262 13.687 14.6667 13.3333 14.6667H12" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66797 4H9.33464" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66797 6.66797H9.33464" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66797 9.33203H9.33464" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66797 12H9.33464" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_9306_68462">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const DateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="shrink-0" fill="none">
    <path d="M5.33203 1.33203V3.9987" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.668 1.33203V3.9987" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12.6667 2.66797H3.33333C2.59695 2.66797 2 3.26492 2 4.0013V13.3346C2 14.071 2.59695 14.668 3.33333 14.668H12.6667C13.403 14.668 14 14.071 14 13.3346V4.0013C14 3.26492 13.403 2.66797 12.6667 2.66797Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2 6.66797H14" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BookingOrderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="shrink-0" fill="none">
    <path d="M10.0013 1.33203H4.0013C3.64768 1.33203 3.30854 1.47251 3.05849 1.72256C2.80844 1.9726 2.66797 2.31174 2.66797 2.66536V13.332C2.66797 13.6857 2.80844 14.0248 3.05849 14.2748C3.30854 14.5249 3.64768 14.6654 4.0013 14.6654H12.0013C12.3549 14.6654 12.6941 14.5249 12.9441 14.2748C13.1942 14.0248 13.3346 13.6857 13.3346 13.332V4.66536L10.0013 1.33203Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9.33203 1.33203V3.9987C9.33203 4.35232 9.47251 4.69146 9.72256 4.94151C9.9726 5.19156 10.3117 5.33203 10.6654 5.33203H13.332" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.66536 6H5.33203" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6654 8.66797H5.33203" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6654 11.332H5.33203" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OTAIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="shrink-0" fill="none">
    <path d="M8.38937 1.7227C8.13937 1.47263 7.80029 1.33211 7.4467 1.33203H2.66536C2.31174 1.33203 1.9726 1.47251 1.72256 1.72256C1.47251 1.9726 1.33203 2.31174 1.33203 2.66536V7.4467C1.33211 7.80029 1.47263 8.13937 1.7227 8.38937L7.52536 14.192C7.82837 14.4931 8.2382 14.6621 8.66536 14.6621C9.09253 14.6621 9.50236 14.4931 9.80536 14.192L14.192 9.80536C14.4931 9.50236 14.6621 9.09253 14.6621 8.66536C14.6621 8.2382 14.4931 7.82837 14.192 7.52536L8.38937 1.7227Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.0013 5.33464C5.1854 5.33464 5.33464 5.1854 5.33464 5.0013C5.33464 4.81721 5.1854 4.66797 5.0013 4.66797C4.81721 4.66797 4.66797 4.81721 4.66797 5.0013C4.66797 5.1854 4.81721 5.33464 5.0013 5.33464Z" fill="#717182" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="shrink-0" fill="none">
    <g clipPath="url(#clip0_9306_68496)">
      <path d="M14.665 11.2788V13.2788C14.6657 13.4644 14.6277 13.6482 14.5533 13.8183C14.479 13.9884 14.3699 14.1412 14.233 14.2667C14.0962 14.3922 13.9347 14.4878 13.7588 14.5472C13.5829 14.6067 13.3966 14.6288 13.2117 14.6121C11.1602 14.3892 9.18966 13.6882 7.45833 12.5654C5.84755 11.5419 4.48189 10.1762 3.45833 8.56543C2.33165 6.82623 1.63049 4.84609 1.41166 2.78543C1.395 2.60107 1.41691 2.41527 1.47599 2.23985C1.53508 2.06442 1.63004 1.90322 1.75484 1.76651C1.87964 1.6298 2.03153 1.52057 2.20086 1.44578C2.37018 1.37099 2.55322 1.33227 2.73833 1.3321H4.73833C5.06187 1.32891 5.37552 1.44348 5.62084 1.65445C5.86615 1.86542 6.02638 2.15839 6.07166 2.47876C6.15608 3.11881 6.31263 3.74725 6.53833 4.3521C6.62802 4.59071 6.64744 4.85004 6.59427 5.09935C6.5411 5.34866 6.41757 5.5775 6.23833 5.75876L5.39166 6.60543C6.3407 8.27446 7.72263 9.65639 9.39166 10.6054L10.2383 9.75876C10.4196 9.57952 10.6484 9.456 10.8977 9.40283C11.1471 9.34965 11.4064 9.36907 11.645 9.45876C12.2498 9.68446 12.8783 9.84101 13.5183 9.92543C13.8422 9.97112 14.1379 10.1342 14.3494 10.3838C14.5608 10.6333 14.6731 10.9518 14.665 11.2788Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    </g>
    <defs>
      <clipPath id="clip0_9306_68496">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CardEmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="shrink-0" fill="none">
    <path d="M13.332 2.66797H2.66536C1.92898 2.66797 1.33203 3.26492 1.33203 4.0013V12.0013C1.33203 12.7377 1.92898 13.3346 2.66536 13.3346H13.332C14.0684 13.3346 14.6654 12.7377 14.6654 12.0013V4.0013C14.6654 3.26492 14.0684 2.66797 13.332 2.66797Z" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.6654 4.66797L8.68536 8.46797C8.47955 8.59692 8.24158 8.66531 7.9987 8.66531C7.75582 8.66531 7.51785 8.59692 7.31203 8.46797L1.33203 4.66797" stroke="#717182" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AcceptIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M13.3346 4L6.0013 11.3333L2.66797 8" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const RejectIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M12 4L4 12" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M4 4L12 12" stroke="white" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full h-full shrink-0">
    <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="white" strokeWidth="1.33333" strokeLinecap="round" />
    <path d="M4.66797 6.66797L8.0013 10.0013L11.3346 6.66797" stroke="white" strokeWidth="1.33333" strokeLinecap="round" />
    <path d="M8 10V2" stroke="white" strokeWidth="1.33333" strokeLinecap="round" />
  </svg>
);

const CloseIcon = ({ stroke = "white" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-full h-full shrink-0">
    <path d="M12 4L4 12" stroke={stroke} strokeWidth="1.33333" strokeLinecap="round" />
    <path d="M4 4L12 12" stroke={stroke} strokeWidth="1.33333" strokeLinecap="round" />
  </svg>
);

export { ChevronDownIcon, SearchIcon, ClearIcon, EmailIcon, BackIcon, CloseIconDesktop, CloseIconMobile, ReviewsIcon, UserIcon, LogoutIcon, HamburgerIcon, DropdownIcon, HostelIcon, DateIcon, BookingOrderIcon, OTAIcon, PhoneIcon, CardEmailIcon, AcceptIcon, RejectIcon, DownloadIcon, CloseIcon };