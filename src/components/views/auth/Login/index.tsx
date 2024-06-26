"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToaster } from "@/context/ToasterContext";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const { setToaster } = useToaster();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        setToaster({
          variant: "success",
          message: "Login Success",
        });
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setToaster({
          variant: "error",
          message: "Email or password is incorrect",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Login failed, something went wrong",
      });
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="johndoe@gmail.com"
        />
        <Input label="Password" name="password" type="password" />
        <Button
          className={"w-full bg-black text-white p-1 mt-2 rounded-sm"}
          type="submit"
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <p className="text-xs mt-1">
        Don{"'"}t Have an account ? Sign Up{" "}
        <Link className="text-blue-600" href={"/auth/register"}>
          here
        </Link>
      </p>
      <hr className="mt-2 mb-2" />
      <div>
        <Button
          className={"w-full bg-black text-white p-1 mt-2 rounded-sm"}
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          {"Google"}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
