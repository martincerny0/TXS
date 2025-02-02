import Logo from "../_components/MainElements/Logo/Logo";
import RedirectButton from "../_components/Redirect/Redirect_Button/Redirect_Button";

export default function Signout() {
  return (
    <div className="absolute left-0 top-0 flex min-h-full w-full flex-col items-center justify-center bg-gray-50">
      <Logo className="h-32 w-32 text-gray-500" height={30} width={30} />
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        You have been signed out
      </h1>
      <p className="text-gray-500 dark:text-gray-400">
        You may now close this window
      </p>
      <RedirectButton href="/" variant={"default"} className="mt-5">
        Go to Home
      </RedirectButton>
    </div>
  );
}
