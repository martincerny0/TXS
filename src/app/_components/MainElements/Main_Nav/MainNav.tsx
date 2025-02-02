import React from "react";
import Link from "next/link";
import Logo from "../Logo/Logo";
import ScrollToButton from "../../Redirect/ScrollToButton/ScrollToButton";
import RedirectButton from "../../Redirect/Redirect_Button/Redirect_Button";
import UserAvatar from "../User_Avatar/User_Avatar";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "next-auth";

interface ServerNavProps {
  user: User | undefined;
  isMessage?: boolean;
  isBorderBottom?: boolean;
  className?: string;
}
const ServerNav: React.FC<ServerNavProps> = ({
  user,
  isMessage = true,
  className,
  isBorderBottom = false,
}) => {
  const isSignedIn = !!user;

  return (
    <header
      className={`flex h-16 items-center justify-between px-4 lg:px-6 ${className} ${isBorderBottom && "border border-b"}`}
    >
      <Logo height={50} width={50} className="mt-2" />
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
              href="/assets"
            >
              Assets
            </Link>
          </li>
          <li>
            {user ? (
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href={`/settings?tab=payments`}
              >
                Pricing
              </Link>
            ) : (
              <Link
                className="text-sm font-medium underline-offset-4 hover:underline"
                href={"/#pricing"}
              >
                Pricing
              </Link>
            )}
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
      {isSignedIn ? (
        <>
          {isMessage && (
            <Link href={"/chat"}>
              <Button className="mr-5" variant={"outline"}>
                <Send />
              </Button>
            </Link>
          )}
          <UserAvatar user={user} isDropdown={true} />
        </>
      ) : (
        <RedirectButton
          href={`/signup?origin=/`}
          className="text-sm font-medium underline-offset-4 hover:underline"
          variant="outline"
        >
          Sign Up
        </RedirectButton>
      )}
    </header>
  );
};

export default ServerNav;
