"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeftIcon, Loader2Icon, CheckCircleIcon, UploadIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import Image from "next/image"
import Logo from "../_components/Logo/logo"
import CandlestickBackground from "../_components/Candlestick_Background/Candlestick_Background"




const steps = [
  { title: "Create An Account", description: "Let's start with your basic details" },
  { title: "Investment Profile", description: "Tell us about your investment goals" },
  { title: "ID Verification", description: "Secure your account with ID verification" },
]

type Country = {
    code: string;
    country: string;
    flag: string;
    placeholder: string;
  };

  
const Countries : Country[] = [
  { code: '+420', country: 'CZ', flag: '/flags/cz.webp', placeholder: '733 184 857' },
  { code: '+1', country: 'US', flag: "/flags/us.webp", placeholder: '(555) 555-1234' },
  { code: '+380', country: 'UA', flag: "/flags/ua.webp", placeholder: '67 123 45 67' },
  { code: '+33', country: 'FR', flag: "/flags/fr.webp", placeholder: '06 12 34 56 78' },
  { code: '+421', country: 'SK', flag: "/flags/sk.webp", placeholder: '902 123 456' },
  { code: '+49', country: 'DE', flag: "/flags/de.webp", placeholder: '151 12345678' },
]



const SignUp: React.FC = () => {
  const router = useRouter()

  // const predefinedEmail = router.query?.email?? "";
//   const affiliateCode = router.query.affiliate as string | undefined

const predefinedEmail = "";
const affiliateCode = "";


  // step 1
  const [email, setEmail] = useState<string>(predefinedEmail ?? "");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState(Countries[0]!);

  // step 2
  const [investingReason, setInvestingReason] = useState("Saving_for_retirement");
  const [experienceLevel, setExperienceLevel] = useState("beginner");

  // step 3
  const [idImage, setIdImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);


  // other states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);



  const handleNextStep = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
     await handleSubmit()
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    console.log(email, name, phone, selectedCountry, investingReason, experienceLevel, idImage)
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const handleCountryChange = (value: string) => {
    const country = Countries.find(c => c.code === value)
    if (country) {
      setSelectedCountry(country)
    }
  }

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIdImage(file)

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }

    
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-50 dark:bg-zinc-900">
      <CandlestickBackground />
      <div className="container relative z-10 mx-auto flex flex-grow items-center justify-center px-4 py-8">
        <div className="relative flex w-full max-w-5xl flex-col items-center gap-8 md:flex-row">
          <Link
            href="/"
            className="absolute -top-16 left-0 flex items-center text-gray-600 transition-colors hover:text-gray-900 md:-left-4 md:top-0"
            aria-label="Go back to previous page"
          >
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Link>
          <div className="flex flex-col justify-center bg-gray-50 md:w-1/2">
            <Logo height={40} width={40} className="w-20 h-20"/>
            <p className="mb-6 text-xl text-gray-600">
              Join our community of investors and unlock these features:
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <CheckCircleIcon className="mr-2 h-6 w-6 text-primary" />
                <span>Real-time Market Data</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="mr-2 h-6 w-6 text-primary" />
                <span>Collaborative Investment Community</span>
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="mr-2 h-6 w-6 text-primary" />
                <span>Secure and user-friendly platform</span>
              </li>
            </ul>
          </div>
          <Card className="w-full md:w-1/2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                {steps[currentStep]?.title}
              </CardTitle>
              <CardDescription>
                {steps[currentStep]?.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentStep === 0 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Martin Cerny"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      placeholder="cerny@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <Select
                        name="countryCode"
                        defaultValue={selectedCountry.code}
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
                        placeholder={selectedCountry.placeholder}
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="ml-2 flex-1"
                      />
                    </div>
                  </div>
                </>
              )}
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label>
                      What&apos;s your primary reason for investing?
                    </Label>
                    <RadioGroup defaultValue="retirement">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="retirement" id="retirement" />
                        <Label htmlFor="retirement">
                          Saving for retirement
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wealth" id="wealth" />
                        <Label htmlFor="wealth">Building wealth</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="income" id="income" />
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
                    <Select name="experience" defaultValue="beginner">
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
                        <SelectItem value="advanced">
                          I&apos;m an experienced investor
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              {currentStep === 2 && (
                <div className="space-y-2">
                  <Label htmlFor="id-upload">Upload ID for Verification</Label>
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="id-upload"
                      className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      {preview ? (<>
                        <Image src={preview} alt="Preview" className="h-64 w-full" width={80} height={70} />
                      </>) : (
                      <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <UploadIcon className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      )}
                      <input
                        id="id-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleIdUpload}
                      />

                    </label>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="flex w-full justify-between">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    disabled={isLoading}
                  >
                    Previous
                  </Button>
                )}
                <Button
                  className={currentStep === 0 ? "w-full" : ""}
                  onClick={handleNextStep}
                  disabled={isLoading ||
                    (currentStep === 0 && (!name || !email || !phone))
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : currentStep < steps.length - 1 ? (
                    "Next"
                  ) : (
                    "Create account"
                  )}
                </Button>
              </div>
            </CardFooter>
            <div className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="hover:underline"
                    >
                      Sign-in now
                    </Link>
                </div>
            <div className="px-8 pb-8 text-center text-sm text-muted-foreground mt-2">
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
        </div>
      </div>
    </div>
  );
}

export default SignUp