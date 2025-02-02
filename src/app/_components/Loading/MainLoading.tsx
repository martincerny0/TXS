import Logo from "../MainElements/Logo/Logo";
import RedirectButton from "../Redirect/Redirect_Button/Redirect_Button";

const MainLoading: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 flex min-h-full w-full flex-col items-center justify-center bg-gray-50">
      <Logo className="h-32 w-32 text-gray-500" height={30} width={30} />
      <div className="mt-5 flex w-1/12 justify-between">
        <div className="h-3 w-3 animate-bounce rounded-full bg-black text-2xl font-semibold delay-75 duration-1000"></div>
        <div className="h-3 w-3 animate-bounce rounded-full bg-black text-2xl font-semibold delay-150 duration-1000"></div>
        <div className="h-3 w-3 animate-bounce rounded-full bg-black text-2xl font-semibold delay-200 duration-1000"></div>
      </div>

      <RedirectButton href="/" variant={"default"} className="mt-10">
        Go to Home
      </RedirectButton>
    </div>
  );
};

export default MainLoading;
