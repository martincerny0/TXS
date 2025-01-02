import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type UserData from "../types/userData"
import type Country from "../types/country";




const Countries: Country[] = [
  {
    code: "+420",
    country: "CZ",
    flag: "/flags/cz.webp",
    placeholder: "733 184 857",
    regEx: /^[0-9]{9}$/,
  },
  {
    code: "+1",
    country: "US",
    flag: "/flags/us.webp",
    placeholder: "(555) 555-1234",
    regEx: /^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/, 
  },
  {
    code: "+380",
    country: "UA",
    flag: "/flags/ua.webp",
    placeholder: "67 123 45 67",
    regEx: /^[0-9]{9}$/, 
  },
  {
    code: "+33",
    country: "FR",
    flag: "/flags/fr.webp",
    placeholder: "06 12 34 56 78",
    regEx: /^[0-9]{10}$/, 
  },
  {
    code: "+421",
    country: "SK",
    flag: "/flags/sk.webp",
    placeholder: "902 123 456",
    regEx: /^[0-9]{9}$/, 
  },
  {
    code: "+49",
    country: "DE",
    flag: "/flags/de.webp",
    placeholder: "151 12345678",
    regEx: /^[0-9]{11,12}$/, 
  },
];


const defaultCountry = Countries[0]!;
const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

interface BasicDetailsProps {
  userData : UserData;
  setUserData: ( userData: UserData) => void;
  handleNextStep: () => void;
}



const BasicDetails: React.FC<BasicDetailsProps> = ({ userData, setUserData, handleNextStep }) => {

  const [isNameInputUsed, setNameInputUsed] = useState(false);
  const [isEmailInputUsed, setEmailInputUsed] = useState(false);
  const [isPhoneInputUsed, setPhoneInputUsed] = useState(false);


  const handleCountryChange = (countryCode: string) => {
    const country = Countries.find((c) => c.code === countryCode)!;
    setUserData({ ...userData, country: country });
  };
  
  
  return (
    <>
     <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Create an Account
              </CardTitle>
              <CardDescription>
                Let&apos;s start with your basic details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Martin Cerny"
          onChange={(e) => setUserData({...userData,  name : {
            name : e.target.value,
            isValid : e.target.value !== ""
          }})}
          value={userData.name.name}
          onBlur={() => setNameInputUsed(true)}
          disabled={false}
          required
        />
        <p className={`text-[#ED4337] font-bold text-sm ml-2  ${(userData.name.isValid || !isNameInputUsed) && "hidden"}`}>Name can&apos;t be blank!</p> 
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="cerny@example.com"
          type="email"
          value={userData.email.email}
          onChange={(e) => setUserData({...userData, email : {
            email: e.target.value,
            isValid: emailRegEx.test(e.target.value)
          }})}
          onBlur={() => setEmailInputUsed(true)}
          autoComplete="email"
          required
        />
        <p className={`text-[#ED4337] font-bold text-sm ml-2 ${(userData.email.isValid || !isEmailInputUsed) && "hidden"}`}>Invalid Email!</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex">
          <Select
            name="countryCode"
            defaultValue={defaultCountry.code}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {Countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center">
                    <Image
                      alt={country.country}
                      src={country.flag}
                      width={20}
                      height={10}
                      className="mr-2"
                      loading="eager"
                    ></Image>
                    <span>{country.code}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone"
            name="phone"
            placeholder={userData.country.placeholder}
            type="tel"
            value={userData.phone.phone}
            onChange={(e) => { setUserData({...userData, phone : {
              phone: e.target.value,
              isValid: userData.country.regEx.test(e.target.value.replace(/\s+/g, ""))
            }})}}
            onBlur={() => setPhoneInputUsed(true)}
            className="ml-2 flex-1"
          />
        </div>
        <p className={`text-[#ED4337] ml-36 font-bold text-sm ${(userData.phone.isValid || !isPhoneInputUsed) && "hidden"}`}>Invalid Phone Number Format!</p>
      </div>
      </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex w-full justify-between">
                <Button
                  className="w-full"
                  onClick={handleNextStep}
                  disabled={!userData.name.isValid || !userData.email.isValid || !userData.phone.isValid }
                >
                  Next
                </Button>
              </div>
            </CardFooter>
            <div
              className={`px-8 pb-8 text-center text-sm text-muted-foreground mt-2`}
            >
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
    </>
  );
};

export default BasicDetails;
