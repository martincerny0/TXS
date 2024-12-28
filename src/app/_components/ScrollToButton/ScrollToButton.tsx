"use client";
import React from "react";
import Link from "next/link";

const ScrollToButton: React.FC = () => {
  return (
    <Link
      className="text-sm font-medium underline-offset-4 hover:underline"
      href="#pricing"
      scroll={false}
      onClick={(e) => {
        e.preventDefault();
        document
          .querySelector("#pricing")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Pricing
    </Link>
  );
};
export default ScrollToButton;
