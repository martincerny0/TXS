"use client";
import React from "react";
import Link from "next/link";

interface ScrollToButtonProps {
  className?: string;
  href: string;
  children?: React.ReactNode;
}

const ScrollToButton: React.FC<ScrollToButtonProps> = ({className, href, children}) => {
  return (
    <Link
    className={className}	
    href={href}
      scroll={false}
      onClick={(e) => {
        e.preventDefault();
        document
          .querySelector(href)
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      {children}
    </Link>
  );
};
export default ScrollToButton;
