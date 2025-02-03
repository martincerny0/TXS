import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  CheckIcon,
  CreditCard,
  LoaderIcon,
  User as UserIcon,
  XIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { User } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserAvatar from "../_components/MainElements/User_Avatar/User_Avatar";
import ServerNav from "../_components/MainElements/Main_Nav/MainNav";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Countries, type Country } from "@/types/country";
import { api } from "@/trpc/react";
import { useToast } from "@/hooks/use-toast";

// email regex
const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// convert uplaoded image to a base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
  });
};

interface UserDetailsTabProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  user: User;
}
const UserDetailsTab: React.FC<UserDetailsTabProps> = ({
  isLoading,
  setIsLoading,
  user,
}) => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // utils
  const { toast } = useToast();
  const uploadImageInputRef = useRef<HTMLInputElement>(null);

  // -- update user info mutation
  const updateUserMutation = api.user.changeUserInfo.useMutation();
  const updateImageMutation = api.user.uploadImage.useMutation();

  // user details states
  const [name, setName] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [country, setCountry] = useState<Country>(
    Countries.find((c) => c.country === user.country_abbrev)!,
  );

  const handleEmailChange = (email: string) => {
    if (emailRegEx.test(email) || email === "") {
      setEmailError(null);
      return setEmail(email);
    }
    setEmailError("Invalid email address");
  };

  const updateUser = async () => {
    setIsLoading(true);
    const response = await updateUserMutation.mutateAsync({
      name,
      bio,
      email,
      phone,
      country,
    });

    if (response.success) {
      setIsLoading(false);
      return toast({
        title: "Success",
        description: "User info updated successfully",
      });
    }
    setIsLoading(false);
    return toast({
      title: "Error",
      description: "There was an error updating your account",
      variant: "destructive",
    });
  };

  const handleCountryChange = (countryCode: string) => {
    const country = Countries.find((c) => c.code === countryCode);
    setCountry(country!);
    if (!phone) return;
    // reevaluate the phone number on the changed country format
    if (country!.regEx.test(phone.replace(/\s+/g, ""))) {
      return setPhoneError("");
    }
    setPhoneError("Invalid phone number");
  };

  const handlePhoneChange = (phone: string) => {
    // validate the phone number based on the selected country
    if (country.regEx.test(phone.replace(/\s+/g, "")) || phone === "") {
      setPhoneError(null);
      return setPhone(phone);
    }
    setPhoneError("Invalid phone number");
  };

  // uploads the file
  const handleFileUpload = async (file: File) => {
    const base64Data = await convertToBase64(file);

    // Remove the Base64 prefix ( "data:image/png;base64, etc...)
    const cleanBase64 = base64Data.split(",")[1];

    // prevent image from being empty
    if (!cleanBase64) return;

    const response = await updateImageMutation.mutateAsync({
      fileData: cleanBase64,
    });

    if (response.success) {
      return toast({
        title: "Success",
        description: "Avatar uploaded successfully",
      });
    }
    return toast({
      title: "Error",
      description: "There was an error uploading your avatar",
      variant: "destructive",
    });
  };

  // gets the file from the input
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>Update your personal details here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <UserAvatar user={user} />
          <Button onClick={() => uploadImageInputRef.current?.click()}>
            Change Avatar
          </Button>
          <input
            className="hidden"
            type="file"
            accept="image/*"
            ref={uploadImageInputRef}
            onChange={(e) => handleFileChange(e)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder={user.name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder={user.bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="tag">Tag</Label>
          <Input id="tag" disabled placeholder={user.tag} />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder={user.email}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {emailError && <p className="text-sm text-red-500">{emailError}</p>}
        </div>
        <div className="flex w-full space-x-2">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Select
              name="countryCode"
              defaultValue={country.code}
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
          </div>
          <Input
            id="phone"
            type="tel"
            className="m-0"
            onChange={(e) => {
              handlePhoneChange(e.target.value);
            }}
            placeholder={country.placeholder}
          />
          {phoneError && <p className="text-sm text-red-500">{phoneError}</p>}
        </div>
        <Button
          className="w-full"
          disabled={
            (!name && !bio && !phone && !email && !isLoading) ||
            !!emailError ||
            !!phoneError
          }
          onClick={updateUser}
        >
          {isLoading ? (
            <div className="animate-spin">
              <LoaderIcon />
            </div>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserDetailsTab;
