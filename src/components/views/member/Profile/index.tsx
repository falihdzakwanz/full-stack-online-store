import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/users";
import Image from "next/image";
import { useState } from "react";

type propTypes = {
  profile: any;
  setProfile: any;
  session: any;
};

const ProfileMemberView = (props: propTypes) => {
  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState("");
  const { profile, setProfile, session } = props;

  const handleChangeProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading("profile");

    const form = e.target as HTMLFormElement;

    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const response: any = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );
    const result = response.data;

    if (result.statusCode === 200) {
      setIsLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
    } else {
      setIsLoading("");
    }
  };

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading("picture");

    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const response: any = await userServices.updateProfile(
              profile.id,
              data,
              session.data?.accessToken
            );
            const result = response.data;

            if (result.statusCode === 200) {
              setIsLoading("");
              setProfile({
                ...profile,
                image: newImageURL,
              });
              setChangeImage({});
              e.target[0].value = "";
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangeImage({});
          }
        }
      );
    }
  };

  const handleChangeImage = (e: any) => {
    e.preventDefault();
    setChangeImage(e.currentTarget.files[0]);
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading("password");

    const form = e.target as HTMLFormElement;

    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    console.log(data)
    const response: any = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );
    const result = response.data;

    if (result.statusCode === 200) {
      setIsLoading("");
      form.reset()
    } else {
      setIsLoading("");
    }
  };

  return (
    <MemberLayout>
      <h1 className="text-2xl mb-5 font-bold">Profile</h1>
      <div className="flex gap-5">
        <div className="w-1/4 py-3 px-3 shadow-custom flex flex-col items-center justify-center rounded-sm">
          <div className="relative w-[200px] h-[200px]">
            {profile.image ? (
              <Image
                src={profile.image}
                alt="Profile"
                layout="fill"
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-200 rounded-full">
                <div className="text-6xl font-bold">
                  {profile?.fullname?.charAt(0)}
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleChangeProfilePicture}>
            <div className="flex flex-col items-center justify center gap-2">
              <label
                htmlFor="upload-image"
                className="mt-4 flex- flex-col bg-slate-300 p-3 rounded-sm text-center"
              >
                {changeImage.name ? (
                  <p>{changeImage.name}</p>
                ) : (
                  <>
                    <p>Upload new avatar here</p>
                    <p>
                      Maximum upload size is{" "}
                      <span className="font-bold">1 MB</span>
                    </p>
                  </>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="upload-image"
                className="opacity-0 absolute -z-50"
                onChange={handleChangeImage}
              />
              <Button
                type="submit"
                className="bg-black text-white p-2 mt-2 rounded-sm w-full"
              >
                {isLoading === "picture" ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-2/4 shadow-custom p-4 rounded-sm">
          <h2 className="font-bold text-2xl">Profile</h2>
          <form onSubmit={handleChangeProfile}>
            <Input
              name="fullname"
              type="text"
              label="Fullname"
              defaultValue={profile.fullname}
              disabled={false}
            />
            <Input
              name="email"
              type="email"
              label="Email"
              defaultValue={profile.email}
              disabled={true}
            />
            <Input
              name="phone"
              type="number"
              label="Phone"
              defaultValue={profile.phone}
              disabled={false}
            />
            <Button
              type="submit"
              className="bg-black text-white p-2 mt-2 rounded-sm"
            >
             {isLoading === "profile" ? "Updating..." : "Update"}
            </Button>
          </form>
        </div>
        <div className="w-1/4 shadow-custom p-4 flex flex-col items-center rounded-sm">
          <h2>Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <Input name="old-password" label="Old Password" type="password" />
            <Input name="new-password" label="New Password" type="password" />
            <Button
              type="submit"
              className="bg-black text-white p-2 mt-2 rounded-sm"
            >
              {isLoading === "password" ? "Updating..." : "Update"}
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
};

export default ProfileMemberView;
