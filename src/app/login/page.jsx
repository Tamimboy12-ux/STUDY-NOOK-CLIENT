"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, TextField, Label, Input, InputGroup, Button, Form, Alert,} from "@heroui/react";

import { ArrowLeft, Envelope, Lock, Eye, EyeSlash,} from "@gravity-ui/icons";

import { signIn } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleGoogleLogin = async () => {
     await signIn.social({
       provider: "google",
     });
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
        setErrorMessage(
          error.message || "Invalid email or password."
        );
        return;
      }

      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/");
      }, 1500);
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

        <Form
          onSubmit={handleLogin}
          className="flex flex-col gap-4 w-full"
        >
          {errorMessage && (
            <Alert
              color="danger"
              title={errorMessage}
              variant="faded"
              className="w-full"
            />
          )}

          {successMessage && (
            <Alert
              color="success"
              title={successMessage}
              variant="faded"
              className="w-full"
            />
          )}

          <TextField
            isRequired
            className="w-full flex flex-col gap-1"
          >
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

          {/* Password */}
          <TextField
            isRequired
            className="w-full flex flex-col gap-1"
          >
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
            {isLoading ? "Logging In..." : "Login"}
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
          <span className="text-gray-500">
            Do not have an account?{" "}
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