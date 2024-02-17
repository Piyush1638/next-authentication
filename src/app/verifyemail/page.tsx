"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyEmail", { token });
      setVerified(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, [token]);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1>Verify Email</h1>
      <h2 className="bg-red-300 text-white rounded-lg px-2 py-1 mx-2">{token ? `This is your token : ${token}` : "No Token"} </h2>

      {verified && (
        <div>
          <h2 className="text-3xl font-semibold">Email Verified</h2>
          <Link href="/login" className="px-3 py-2 bg-blue-500 text-white">
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-3xl font-semibold">Email not verified</h2>
        </div>
      )}
    </div>
  );
}
