"use client";

import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services/users";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


const Page = () => {
  const [profile, setProfile] = useState<User | {}>({});
  const session: any = useSession();

  useEffect(() => {
    if (session.status === "authenticated" && session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await userServices.getProfile(
          session.data.accessToken
        );
        setProfile(data.data);
      };
      getProfile();
    }
  }, [session, profile]);

  return (
    <>
      <ProfileMemberView profile={profile} setProfile={setProfile} session={session}/>
    </>
  );
};

export default Page;
