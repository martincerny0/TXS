import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import type { InvestingExperience } from "@prisma/client";
import type UserData from "@/types/userData";

interface InvestmentProfileProps {
  userData: UserData;
  setUserData: (userData: UserData) => void;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const InvestmentProfile: React.FC<InvestmentProfileProps> = ({
  handleNextStep,
  handlePreviousStep,
  userData,
  setUserData,
}) => {

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Investment Profile</CardTitle>
        <CardDescription>Tell us about your investment goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>What&apos;s your primary reason for investing?</Label>
          <RadioGroup defaultValue="retirement">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="retirement"
                id="retirement"
                onClick={() =>
                  setUserData({
                    ...userData,
                    investingReason: "Saving_for_retirement",
                  })
                }
              />
              <Label htmlFor="retirement">Saving for retirement</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="wealth"
                id="wealth"
                onClick={() =>
                  setUserData({
                    ...userData,
                    investingReason: "Building_wealth",
                  })
                }
              />
              <Label htmlFor="wealth">Building wealth</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="income"
                id="income"
                onClick={() =>
                  setUserData({
                    ...userData,
                    investingReason: "Generating_income",
                  })
                }
              />
              <Label htmlFor="income">Generating income</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-2">
          <Label>Indicate Your Level of Investing Experience</Label>
          <Select
            name="experience"
            defaultValue="beginner"
            onValueChange={(e: InvestingExperience) =>
              setUserData({ ...userData, investingExperience: e })
            }
          >
            <SelectTrigger id="experience">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">
                I&apos;m just starting out
              </SelectItem>
              <SelectItem value="intermediate">
                I have some experience
              </SelectItem>
              <SelectItem value="expert">
                I&apos;m an experienced investor
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="flex w-full justify-between">
          <Button variant="outline" onClick={handlePreviousStep}>
            Previous
          </Button>
          <Button onClick={handleNextStep}>Next</Button>
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

export default InvestmentProfile;
