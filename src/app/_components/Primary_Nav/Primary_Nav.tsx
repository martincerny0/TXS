import React from "react";
import Link from "next/link";
import Logo from "../Logo/Logo";
import RedirectButton from "../Redirect_Button/Redirect_Button";
import ScrollToButton from "../ScrollToButton/ScrollToButton";

const PrimaryNav : React.FC = () => {

    return (
      <header className="flex h-14 items-center justify-between px-4">
        <Logo height={50} width={50} className="mt-5" />
        <nav className="ml-20 flex flex-1 justify-center">
          <ul className="flex space-x-4 sm:space-x-6">
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="/feed"
              >
                Feed
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="/insights"
              >
                Insights
              </Link>
            </li>
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="#assets"
              >
                Assets
              </Link>
            </li>
            <li>
              <ScrollToButton/>
            </li>
          </ul>
        </nav>
        <RedirectButton
          href="/signup"
          className="text-sm font-medium underline-offset-4 hover:underline"
          variant="outline"
        >
          Sign Up
        </RedirectButton>
      </header>
    );
}

export default PrimaryNav;