"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import authServices from "@/services/auth/index";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = e.target as HTMLFormElement;

    const data = {
      email: formData.email.value,
      fullname: formData.fullname.value,
      phone: formData.phone.value,
      password: formData.password.value,
    };

    const response = await authServices.registerAccount(data);
    const result = response.data;

    if (result.statusCode === 200) {
      formData.reset();
      setIsLoading(false);
      router.push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email is already registered");
    }
  };

  return (
    <AuthLayout title="SignUp" error={error}>
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
