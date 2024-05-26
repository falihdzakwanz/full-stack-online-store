"use client";

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
    console.log(result)
    if (result.status === 200) {
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
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="fullname">Fullname</label>
            <input type="text" name="fullname" id="fullname" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone">Phone</label>
            <input type="text" name="phone" id="phone" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>

          <button type="submit" className="w-full bg-black text-white p-1 mt-2">
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p>
        Have an account? Sign in <Link href={"/auth/login"}>here</Link>
      </p>
    </div>
  );
};

export default RegisterView;
