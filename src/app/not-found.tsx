import Logo from "./_components/MainElements/Logo/Logo";
import RedirectButton from "./_components/Redirect/Redirect_Button/Redirect_Button";


export default function NotFoundPage() {
  return (
    <div className="absolute left-0 top-0 flex min-h-full w-full flex-col items-center justify-center bg-gray-50">
      <Logo className="h-32 w-32 text-gray-500" height={30} width={30} />
      <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Page Not Found!
      </h1>
      <p className="mt-2 text-center text-gray-500 dark:text-gray-400 max-w-md">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <RedirectButton href="/" variant="default" className="mt-8">
        Go to Home
      </RedirectButton>
    </div>
  );
}

