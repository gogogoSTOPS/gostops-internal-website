const ChevronDownIcon = ({ isOpen }) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 ${isOpen ? "rotate-180 opacity-100" : "opacity-50"}`}
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

export { ChevronDownIcon, SearchIcon, ClearIcon, EmailIcon, BackIcon, CloseIconDesktop, CloseIconMobile, ReviewsIcon, UserIcon, LogoutIcon, HamburgerIcon, DropdownIcon };