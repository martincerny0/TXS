import SignUpPage from './SignUpPage';
import { Suspense } from "react";

export const metadata = {
  title: 'Sign Up | TXS',
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpPage />
    </Suspense>
  );
}
