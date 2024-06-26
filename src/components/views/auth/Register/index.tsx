"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useToaster } from "@/context/ToasterContext";
import authServices from "@/services/auth/index";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster } = useToaster();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;

    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
    const response = await authServices.registerAccount(data);
    const result = response.data;

    if (result.statusCode === 200) {
      form.reset();
      setIsLoading(false);
      setToaster({
        variant: "success",
        message: "Register Success",
      });
      router.push("/auth/login");
    } else {
      setIsLoading(false);
      setToaster({
        variant: "error",
        message: "Email is already registered",
      });
    }
    } catch (error) {
            setToaster({
        variant: "error",
        message: "Register failed, something went wrong",
      });
    }
  };

  return (
    <AuthLayout title="SignUp">
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="johndoe@gmail.com"
        />
        <Input label="Fullname" name="fullname" type="text" />
        <Input label="Phone" name="phone" type="number" />
        <Input label="Password" name="password" type="password" />

        <Button
          className={"w-full bg-black text-white p-1 mt-2 rounded-sm"}
          type="submit"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
      <p className="text-xs mt-1">
        Have an account ? Sign In{" "}
        <Link className="text-blue-600" href={"/auth/login"}>
          here
        </Link>
      </p>
      <hr className="mt-2 mb-2" />
      <div>
        <Button
          className={"w-full bg-black text-white p-1 mt-2 rounded-sm"}
          type="button"
          onClick={() =>
            signIn("google", { callbackUrl: "/", redirect: false })
          }
        >
          {"Google"}
        </Button>
      </div>
    </AuthLayout>
  );
};

export default RegisterView;
