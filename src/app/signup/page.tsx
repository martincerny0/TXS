import { Suspense } from "react";
import SignUpPage from "./SignUpPage";
import MainLoading from "../_components/Loading/MainLoading";

export const metadata = {
  title: "Sign Up | TXS",
};

export default function Page() {
  return (
    <Suspense fallback={<MainLoading />}>
      <SignUpPage />
    </Suspense>
  );
}
