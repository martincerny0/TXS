import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Loader2Icon,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import Link from "next/link";
import type UserData from "@/types/userData";

interface AgeVerificationProps {
  handleRegistration: () => void;
  handlePreviousStep: () => void;
  setUserData: (userData: UserData) => void;
  userData: UserData;
}
const AgeVerification: React.FC<AgeVerificationProps> = ({
  handlePreviousStep,
  handleRegistration,
  setUserData,
  userData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdult, setIsAdutl] = useState<boolean | null>(null);

  const validateDateOfBirth = (date: string) => {
    const isAdult = new Date(date) < new Date(new Date().setFullYear(new Date().getFullYear() - 18));
    userData.dateOfBirth.isValid = isAdult;
    return isAdult;
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Age Verification</CardTitle>
        <CardDescription>
          You need to be 18 or older to access this site.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center space-x-4">
        <Button
          variant={isAdult && userData.dateOfBirth.isValid !== false ? "default" : "outline"}
          className={`h-24 text-lg font-semibold ${
            isAdult && userData.dateOfBirth.isValid !== false ? "bg-green-500 hover:bg-green-600" : "hover:bg-green-100"
          }`}
          onClick={() => setIsAdutl(true)}
        >
          <ThumbsUp className="mr-2 h-8 w-8" />
          Yes, I&apos;m 18+
        </Button>
        <Button
          variant={isAdult === false && userData.dateOfBirth.isValid === false ? "default" : "outline"}
          className={`h-24 text-lg font-semibold ${
            isAdult === false || userData.dateOfBirth.isValid === false
              ? "bg-red-500 hover:bg-red-600"
              : "hover:bg-red-100"
          }`}
          onClick={() => setIsAdutl(false)}
        >
          <ThumbsDown className="mr-2 h-8 w-8" />
          No, I&apos;m under 18
        </Button>
      </CardContent>
      <CardFooter className="mt-5 flex flex-col space-y-4">
        <div className="flex justify-center">
          {isAdult ? (
            <div className="text-center">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                type="date"
                name="dateOfBirth"
                onBlur={(e) =>
                  setUserData({
                    ...userData,
                    dateOfBirth: {
                      dateOfBirth: new Date(e.target.value),
                      isValid: validateDateOfBirth(e.target.value),
                    }
                  })
                }
              ></Input>
            </div>
          ) : (
            <p className="text-center text-base font-medium text-[#ED4337]">
              We&apos;re sorry, but you must be 18 or older to access this site.
            </p>
          )}
        </div>
        <div className="flex w-full justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={isLoading}
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              handleRegistration();
              setIsLoading(true);
            }}
            disabled={isLoading || !isAdult || !userData.dateOfBirth.isValid}
          >
            {isLoading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </div>
      </CardFooter>
      <div className={`px-8 pb-8 text-center text-sm text-muted-foreground`}>
        By clicking &quot;Create account&quot; you agree to our{" "}
        <Link
          href="/terms-of-service"
          className="underline underline-offset-4 hover:text-primary"
        >
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy-policy"
          className="underline underline-offset-4 hover:text-primary"
        >
          Privacy Policy
        </Link>
        .
      </div>
    </Card>
  );
};

export default AgeVerification;
