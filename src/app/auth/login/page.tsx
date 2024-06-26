import LoginView from "@/components/views/auth/Login";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <LoginView></LoginView>
    </Suspense>
  );
};

export default Page;
