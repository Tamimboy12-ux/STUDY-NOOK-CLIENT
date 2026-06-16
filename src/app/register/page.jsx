"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, TextField, Label, Input, InputGroup, Button, Form, Alert } from "@heroui/react";
import { ArrowLeft, Envelope, Eye, EyeSlash, Lock, Person, Picture } from "@gravity-ui/icons";
import { signIn, signUp } from "@/lib/auth-client"; 
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

 const handleGoogleLogin = async () => {
  try {

    await signIn.social({ provider: "google" });
    
    setTimeout(async () => {
      try {
        const session = await fetch(
          `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/auth/session`,
          {
            credentials: "include",
          }
        );

        const data = await session.json();

        if (!data?.user?.email) {
          console.log("No session yet");
          return;
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.user.email,
          }),
        });
      } catch (err) {
        console.log("Session error", err);
      }
    }, 1200);

    toast.success("Google Login Successful");
    router.push("/");

  } catch (err) {
    toast.error("Google login failed");
  }
};

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!name || !email || !password) {
      setErrorMessage("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    if (!imageUrl) {
      setErrorMessage("Profile image URL is required.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter."
      );
      setIsLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage(
        "Password must contain at least one lowercase letter."
      );
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name,
        image: imageUrl || undefined,
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred during registration.");
      } else {
        setSuccessMessage("Registration successful! Redirecting...");
        setName("");
        setEmail("");
        setPassword("");
        setImageUrl("");
        
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }

    toast.success("Register Successful")

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-900">
      <Card className="w-full max-w-md p-6 shadow-lg flex flex-col gap-4">
        <div className="flex flex-col items-start gap-1">
          <Button 
            variant="light" 
            size="sm" 
            startContent={<ArrowLeft />} 
            onClick={() => router.back()}
            className="mb-2 p-0 min-w-8 h-8"
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-zinc-950 dark:text-white">Create an Account</h1>
          <p className="text-sm text-gray-500">Sign up to get started</p>
        </div>
        
        <Form onSubmit={handleRegister} className="flex flex-col gap-4 w-full">
          {errorMessage && (
            <Alert color="danger" title={errorMessage} variant="faded" className="w-full" />
          )}
          {successMessage && (
            <Alert color="success" title={successMessage} variant="faded" className="w-full" />
          )}

          <TextField isRequired className="w-full flex flex-col gap-1">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <Person className="text-gray-400 text-lg mr-2" />
              </InputGroup.Prefix>
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </TextField>

          <TextField className="w-full flex flex-col gap-1">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Profile Image URL</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <Picture className="text-gray-400 text-lg mr-2" />
              </InputGroup.Prefix>
              <Input
                placeholder="Enter ImageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </InputGroup>
          </TextField>

          <TextField isRequired className="w-full flex flex-col gap-1">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
            <InputGroup>
              <InputGroup.Prefix>
                <Envelope className="text-gray-400 text-lg mr-2" />
              </InputGroup.Prefix>
              <Input
                placeholder="Enter Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </TextField>

          <TextField isRequired className="w-full flex flex-col gap-1">
            <Label>Password</Label>

            <InputGroup>
              <InputGroup.Prefix>
                <Lock className="text-gray-400 text-lg mr-2" />
              </InputGroup.Prefix>

              <Input
                placeholder="Enter Password"
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <InputGroup.Suffix>
                <Button
                  isIconOnly
                  variant="ghost"
                  size="sm"
                  type="button"
                  onPress={() => setIsVisible(!isVisible)}
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>

          <Button 
            type="submit" 
            color="primary" 
            className="w-full mt-2" 
            isLoading={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
          <div className="">
            <p className="text-center text-gray-600">Or</p>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onPress={handleGoogleLogin}
            >
              <FaGoogle />
              Continue with Google
            </Button>
          </div>
        </Form>

        <div className="text-center text-sm mt-2">
          <span className="text-gray-500">Already have an account? </span>
          <Link href="/login" className="text-red-600 text-lg hover:underline font-bold dark:text-blue-400">
            LogIn
          </Link>
        </div>
      </Card>
    </div>
  );
}