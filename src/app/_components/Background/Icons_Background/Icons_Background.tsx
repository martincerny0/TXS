import React from "react";

interface IconData {
  left: string;
  top: string;
  icon: "dollar" | "ethereum" | "bitcoin" | "chart" | "stock";
}

const staticIcons: IconData[] = [
  { left: "10%", top: "10%", icon: "dollar" },
  { left: "20%", top: "20%", icon: "ethereum" },
  { left: "30%", top: "10%", icon: "bitcoin" },
  { left: "40%", top: "30%", icon: "chart" },
  { left: "50%", top: "10%", icon: "stock" },
  { left: "60%", top: "20%", icon: "dollar" },
  { left: "70%", top: "10%", icon: "ethereum" },
  { left: "80%", top: "30%", icon: "bitcoin" },
  { left: "10%", top: "40%", icon: "chart" },
  { left: "20%", top: "50%", icon: "stock" },
  { left: "30%", top: "40%", icon: "dollar" },
  { left: "40%", top: "50%", icon: "ethereum" },
  { left: "50%", top: "40%", icon: "bitcoin" },
  { left: "60%", top: "50%", icon: "chart" },
  { left: "70%", top: "40%", icon: "stock" },
  { left: "80%", top: "50%", icon: "dollar" },
  { left: "10%", top: "70%", icon: "ethereum" },
  { left: "20%", top: "80%", icon: "bitcoin" },
  { left: "30%", top: "70%", icon: "chart" },
  { left: "40%", top: "80%", icon: "stock" },
  { left: "50%", top: "70%", icon: "dollar" },
  { left: "60%", top: "80%", icon: "ethereum" },
  { left: "70%", top: "70%", icon: "bitcoin" },
  { left: "80%", top: "80%", icon: "chart" },
];



const icons = {
  dollar: (
    <path
      d="M12 1V23M17 5H9.5C7.01472 5 5 7.01472 5 9.5C5 11.9853 7.01472 14 9.5 14H14.5C16.9853 14 19 16.0147 19 18.5C19 20.9853 16.9853 23 14.5 23H6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  ethereum: (
    <>
      <path
        d="M12 1L3 12L12 16L21 12L12 1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16V23M3 12L12 23L21 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  bitcoin: (
    <path
      d="M9 1V3M15 1V3M9 21V23M15 21V23M6 12H14C15.6569 12 17 10.6569 17 9V7C17 5.34315 15.6569 4 14 4H6V12ZM6 12V20H14C15.6569 20 17 18.6569 17 17V15C17 13.3431 15.6569 12 14 12H6Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  chart: (
    <path
      d="M3 3V21H21M7 15L11 11L15 15L21 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  stock: (
    <path
      d="M3 3V21H21M7 11L11 7L15 11L21 5M21 5V10M21 5H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
};

const BackgroundIcons: React.FC = () => (
  <div className="absolute inset-0 opacity-5 overflow-hidden">
    {staticIcons.map((icon, index) => (
      <svg
        key={index}
        className="absolute"
        style={{
          left: icon.left,
          top: icon.top,
          width: "24px",
          height: "24px",
          transform: `rotate(0deg)`,
        }}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {icons[icon.icon]}
      </svg>
    ))}
  </div>
);

export default BackgroundIcons;
