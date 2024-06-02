"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = e.target as HTMLFormElement;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email.value,
        password: formData.password.value,
        callBackUrl: "/",
      });

      if (!res?.error) {
        setIsLoading(false);
        formData.reset();
        push("/");
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="">Login</h1>
      {error && <p>{error}</p>}
      <div className="bg-slate-500 p-9">
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="johndoe@gmail.com"
          />
          <Input label="Password" name="password" type="password" />
          <Button type="submit">{isLoading ? "Loading..." : "Login"}</Button>
        </form>
        <div>
          <Button type="button" onClick={() => signIn("google", { callbackUrl: "/", redirect: false })}>
            {"Google"}
          </Button>
        </div>
      </div>
      <p>
        Don{"'"}t have an account? Sign Up{" "}
        <Link href={"/auth/register"}>here</Link>
      </p>
    </div>
  );
};

export default LoginView;
