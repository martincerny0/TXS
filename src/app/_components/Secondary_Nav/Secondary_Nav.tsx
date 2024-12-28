import React from "react";
import Link from "next/link";
import Logo from "../Logo/Logo";
import RedirectButton from "../Redirect_Button/Redirect_Button";

const SecondaryNav : React.FC = () => {
    return (
        <header className="flex h-14 items-center justify-between px-4 lg:px-6">
        <Logo height={50} width={50} className="mt-2" />
        <nav className="flex flex-1 justify-center">
          <ul className="ml-24 flex space-x-4 sm:space-x-6">
            <li>
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href="/"
              >
                Home
              </Link>
            </li>
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
                href="/chart"
              >
                Chart
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
          </ul>
        </nav>
        {/* sign in / up buttons */}
        <RedirectButton href='/signin' variant="outline" className="m-2">
          Sign In
        </RedirectButton>
        <RedirectButton href='/signup' variant="default" className="m-2">
          Sign Up
        </RedirectButton>
      </header>
    )
}

export default SecondaryNav;