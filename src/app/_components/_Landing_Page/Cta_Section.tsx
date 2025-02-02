"use client";
import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CtaSection : React.FC = () => {
  const [enteredEmail, setEnteredEmail] = React.useState<string>("");
  const router = useRouter();

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    return router.push(`/signup?email=${enteredEmail}`);
  };

  return (
    <section className="flex w-full justify-center bg-gray-50 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to get started?
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of satisfied users and take control of your
              financial future today.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form onSubmit={handleForm} className="flex space-x-2">
              <Input
                className="max-w-lg flex-1"
                placeholder="Enter your email"
                type="email"
                onChange={(e) => setEnteredEmail(e.target.value)}
              />
              <Button type="submit">
                Sign Up
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500">
              By signing up, you agree to our{" "}
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaSection;