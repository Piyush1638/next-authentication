"use client";
import ProfileCard from "@/components/shared/Posts";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";

const Profile = () => {
  const router = useRouter();
  const onLogout = async () => {
    try {
      await axios("/api/users/logout");
      console.log("Logout successful!");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed!");
      console.log(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("user details", res.data);
      router.push(`/profile/${res.data.data._id}`);
    } catch (error: any) {
      console.log("error", error.message);
    }
  };
  return (
    <section className="flex items-center justify-center min-h-screen px-24 bg-[#041220] py-32">
      <div className="flex items-center flex-row">
        <div className="left-div ">
          <div className="flex items-center ">
            <button className="px-3 py-2 r">My Posts</button>
            <button>My Repos</button>
            <button>My Prompts</button>
            <button>Saved Posts</button>
          </div>
          <div>
            <ProfileCard/>
          </div>
        </div>
        <div className="right-div flex-[1] flex flex-col">
          <h1>Profile</h1>
          <div>
             <Image src="/assets/images/User.png" alt="User" height={60} width={60}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
