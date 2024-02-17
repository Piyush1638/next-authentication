import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-3 py-2 bg-gray-800 fixed top-0">
      <div className="flex justify-left title-gradient items-center p-4 text-4xl font-bold">
        <h1>UnZip</h1>
      </div>
      <div>
        <ul className="flex items-center justify-evenly gap-3">
          <Link
            className="px-3 text-slate-50 font- py-1 rounded-lg hover:underline"
            href="/"
          >
            Home
          </Link>
          <Link
            className="px-3 text-slate-50 font- py-1 rounded-lg hover:underline"
            href="/posts "
          >
            Posts
          </Link>
          <Link
            className="px-3 text-slate-50 font- py-1 rounded-lg hover:underline"
            href="/profile"
          >
            Profile
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
