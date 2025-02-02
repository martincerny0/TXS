import React from "react";
import Link from "next/link";

interface FooterProps {
  className?: string;
}
const Footer : React.FC<FooterProps> = ({className}) => {

    const year = new Date().getFullYear();

    return (
        <footer className={`flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6 ${className}`}>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {year} TXS Inc. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto sm:gap-6">
          <Link className="text-xs underline-offset-4 hover:underline" href="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs underline-offset-4 hover:underline" href="/privacy">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    )
};

export default Footer;