"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
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

    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

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
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="">Register</h1>
      {error && <p>{error}</p>}
      <div className="bg-slate-500 p-9">
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

          <Button type="submit">{isLoading ? "Loading..." : "Register"}</Button>
        </form>
        <div>
          <Button
            type="button"
            onClick={() =>
              signIn("google", { callbackUrl: "/", redirect: false })
            }
          >
            {"Google"}
          </Button>
        </div>
      </div>
      <p>
        Have an account? Sign in <Link href={"/auth/login"}>here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
