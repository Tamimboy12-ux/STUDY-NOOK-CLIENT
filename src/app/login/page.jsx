"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, TextField, Label, Input, InputGroup, Button, Form, Alert,}from "@heroui/react";

import {  ArrowLeft,  Envelope,  Lock,  Eye,  EyeSlash,} from "@gravity-ui/icons";

import { signIn, useSession } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";


export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    if (!email || !password) {
      setErrorMessage("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        return;
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jwt`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      toast.success("Login Successful");

      setSuccessMessage("Login successful! Redirecting...");

      router.push("/");

    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-900">
      <Card className="w-full max-w-md p-6 shadow-lg flex flex-col gap-4">

        {/* HEADER */}
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

          <h1 className="text-2xl font-bold text-zinc-950 dark:text-white">
            Welcome Back
          </h1>

          <p className="text-sm text-gray-500">
            Login to your account
          </p>
        </div>

        <Form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">

          {errorMessage && (
            <Alert
              color="danger"
              title={errorMessage}
              variant="faded"
            />
          )}

          {successMessage && (
            <Alert
              color="success"
              title={successMessage}
              variant="faded"
            />
          )}

          <TextField isRequired>
            <Label>Email Address</Label>

            <InputGroup>
              <InputGroup.Prefix>
                <Envelope className="text-gray-400 text-lg mr-2" />
              </InputGroup.Prefix>

              <Input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </TextField>

          <TextField isRequired>
            <Label>Password</Label>

            <InputGroup>
              <InputGroup.Prefix>
                <Lock className="text-gray-400 text-lg mr-2" />
              </InputGroup.Prefix>

              <Input
                type={isVisible ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <InputGroup.Suffix>
                <Button
                  isIconOnly
                  type="button"
                  variant="ghost"
                  size="sm"
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
            {isLoading ? "Logging In..." : "Login"}
          </Button>

          <div>
            <p className="text-center text-gray-600">Or</p>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onPress={handleGoogleLogin}
            >
              <FaGoogle />
              Continue with Google
            </Button>
          </div>
        </Form>

        <div className="text-center text-sm mt-2">
          <span className="text-gray-500">
            Don not have an account?{" "}
          </span>

          <Link
            href="/register"
            className="text-red-600 text-lg hover:underline font-bold"
          >
            Register
          </Link>
        </div>
      </Card>
    </div>
  );
}