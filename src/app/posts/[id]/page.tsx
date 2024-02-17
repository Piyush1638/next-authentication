import React from "react";
import { MdOutlineAccountCircle } from "react-icons/md";

const page = ({ params }: any) => {
  return (
    <div className="min-h-screen bg-[#041220] py-32 px-10">
      <h1 className="text-3xl text-[#D28B00] font-bold">Post: {params.id}</h1>
      <div className="flex flex-col mt-8">
        <div className="flex items-center gap-5">
          <div className="border-2 border-[#9DD2EF] flex items-center gap-3 rounded-lg px-3 py-3">
            <MdOutlineAccountCircle className="text-6xl text-[#D1A54F]" />
            <div>
                <p className="text-[#D28B00]">Raman123</p>
            <p className="text-slate-50 font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              quo at. Cumque vel sit ipsam, nulla fugiat quam quo minus, optio
              autem harum fuga incidunt earum modi omnis ratione laboriosam
              natus eos. Mollitia aliquam hic quod facere deleniti, quae,
              aspernatur voluptatum tempora autem praesentium non eaque, sequi
              labore officia at.
            </p>
            </div>
          </div>
        </div>

        <div className="border-2 border-[#9DD2EF] rounded-lg px-3 py-3 mt-8">
          <p className="text-slate-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
            consequatur similique facilis quibusdam sequi obcaecati natus facere
            saepe illum autem, nobis, nulla aliquam fuga dolorem ducimus aliquid
            qui magnam esse, inventore veniam recusandae eaque rem?
            Reprehenderit sint dolores numquam voluptates, a aspernatur, eaque
            qui optio doloremque fuga perspiciatis nihil ut est! Rem asperiores
            dolorem libero. Dolores nam repudiandae debitis assumenda error
            animi iure exercitationem sint corporis, quod quia illo soluta totam
            ipsam minima esse quisquam natus, veniam aliquam explicabo facilis
            omnis velit! Atque ad praesentium laborum dolorem neque, officiis id
            ratione facilis asperiores nam corrupti. Error alias eos inventore
            in!
          </p>
        </div>

        <hr className="mt-8" />

        <div className="mt-8">
          <h3 className="text-xl text-[#D28B00] font-semibold">Comments</h3>
          <form className="flex items-center flex-row mt-3 gap-3">
            <MdOutlineAccountCircle className="text-4xl text-[#D28B00]" />
            <div className="w-full border border-[#9DD2EF]  px-2 py-2 rounded-md flex items-center">
              <input
                type="text"
                placeholder="Add Comments"
                className="bg-transparent text-slate-50 w-full outline-none"
              />
              <button className="text-slate-50 px-3 py-2 rounded-full ">
                Post
              </button>
            </div>
          </form>

          <CommentsDiv comments="can be better somewhat more." username="Abhiram123" />
        </div>
      </div>
    </div>
  );
};

export default page;

const CommentsDiv = ({comments,username}:any) => (
  <div className="flex items-center flex-row mt-3 gap-3">
    <MdOutlineAccountCircle className="text-4xl text-[#D28B00]" />
    <div className="w-full border border-[#9DD2EF]  px-2 py-4 rounded-md flex flex-col">
       <div className="flex flex-col gap-2 mb-3">
        <p className="text-sm text-[#D28B00]">{username}</p>
       </div>
      <p className="text-slate-50">{comments}</p>
    </div>
  </div>
);
