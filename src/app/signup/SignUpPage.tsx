"use client";
import { ArrowLeftIcon,  Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Logo from "../_components/Logo/Logo";
import CandlestickBackground from "../_components/Candlestick_Background/Candlestick_Background";
import BasicDetails from "./BasicDetails";
import InvestmentProfile from "./InvestmentProfile";
import AgeVerification from "./AgeVerification";
import type UserData from "../types/userData";

export default function SignUp() {

  // get the url queries/params
  const searchParams = useSearchParams();
  const predefinedEmail = searchParams.get("email");
  const affiliateCode = searchParams.get("affiliate");
  const origin = searchParams.get("origin");

  const [currentStep, setCurrentStep] = useState<number>(0);


  // handle steps (next/previous buttons)
  const handleNextStep = async () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // registration
  const handleRegistration = async () => {
    // remove strings from phone number
    userData.phone.phone = userData.phone.phone.replace(/\s/g, "");

    console.log(userData, affiliateCode);
  };
  

  const [userData, setUserData] = useState<UserData>({
    email: {
      email: predefinedEmail ?? "",
      isValid: false,
    },
    name: {
      name: "",
      isValid: false,
    },
    phone: {
      phone: "",
      isValid: false,
    },
    country: {
      code: "+420",
      country: "CZ",
      flag: "/flags/cz.webp",
      placeholder: "733 184 857",
      regEx: /^[0-9]{9}$/, 
    },
    dateOfBirth: {
      dateOfBirth: null,
      isValid: null,
    },
    investingReason: "Saving_for_retirement",
    investingExperience: "beginner",
  });

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-50">
      <CandlestickBackground />
      <div className="container relative z-10 mx-auto flex flex-grow items-center justify-center px-4 py-8">
        <div className="relative flex w-full max-w-5xl flex-col items-center gap-8 md:flex-row">
          <Link
            href={origin ?? "/"}
            className="absolute -top-16 left-0 flex items-center text-gray-600 transition-colors hover:text-gray-900 md:-left-4 md:top-0"
            aria-label="Go back to previous page"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Link>
          <div className="flex flex-col justify-center bg-gray-50 md:w-1/2">
            <Logo height={40} width={40} className="h-20 w-20" />
            <p className="mb-6 text-xl text-gray-600">
              Join our community of investors and unlock these features:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Check className="mr-2 h-6 w-6 text-primary" />
                <span>Real-time Market Data</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-6 w-6 text-primary" />
                <span>Collaborative Investment Community</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-6 w-6 text-primary" />
                <span>Secure and user-friendly platform</span>
              </li>
            </ul>
          </div>

          {currentStep === 0 && (
            <BasicDetails
              handleNextStep={handleNextStep}
              setUserData={setUserData}
              userData={userData}
            />
          )}
          {currentStep === 1 && (
            <InvestmentProfile
              handleNextStep={handleNextStep}
              handlePreviousStep={handlePreviousStep}
              setUserData={setUserData}
              userData={userData}
            />
          )}
          {currentStep === 2 && (
            <AgeVerification
              handlePreviousStep={handlePreviousStep}
              handleRegistration={handleRegistration}
              setUserData={setUserData}
              userData={userData}
            />
          )}
        </div>
      </div>
    </div>
  );
}
