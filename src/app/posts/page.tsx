import Posts from "@/components/shared/Posts";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";


const page = () => {
  return (
    <section className="min-h-screen bg-[#041220] py-32">
      <div className="w-full bg-[#15263A] flex items-center justify-center py-8">
        <h1 className="text-[#DCCDB0] text-5xl font-semibold">Boost Your Circle</h1>
      </div>
      <div className="flex items-center flex-row ">
        <Image
          src="\assets\images\post.svg"
          alt="post"
          height={900}
          width={900}
        />
        <div className="flex flex-col relative justify-center h-full w-full gap-3">
            <h3 className="text-[#DCCDB0] text-4xl font-bold">Explore Posts</h3>
            <div className="border border-[#DCCDB0] flex items-center rounded-full px-3 py-3 w-4/5 shadow-[#DCCDB0] shadow-sm">
                <input type="text" placeholder="Search by hastag or title" className="bg-transparent outline-none w-full text-slate-50 " />
                <CiSearch className="text-[#DCCDB0] mx-3 text-3xl"/>
            </div>
            <div className="flex items-center flex-row gap-4 mt-4">
                <button className="text-[#D9D9D9] bg-gray-700 px-3 py-2 rounded-full font-medium">Prompts</button>
                <button className="text-[#D9D9D9] bg-gray-700 px-3 py-2 rounded-full font-medium">Posts</button>
                <button className="text-[#D9D9D9] bg-gray-700 px-3 py-2 rounded-full font-medium">Repos</button>
            </div>
        </div>
      </div>

      <div className="flex items-center flex-col justify-center mt-10 gap-3">
        <Posts/>
        <Posts/>
        <Posts/>
        <Posts/>
        <Posts/>
        <Posts/>
        <Posts/>
        <Posts/>

      </div>
    </section>
  );
};

export default page;
