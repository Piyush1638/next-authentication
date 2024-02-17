import { RiAccountCircleFill } from "react-icons/ri";

export default function Posts() {

  const hastags = ["#webdev", "#webdev", "#webdev", "#webdev", "#webdev"]
  return (
    <div className="flex w-4/5 flex-col pt-5 pr-16 pb-12 pl-7 border-gray-600 border-solid bg-gray-800 bg-opacity-50 border-[5px] rounded-[37px] max-md:px-5">
      <div className="flex items-center gap-3">
        <RiAccountCircleFill className="h-[50px] w-[50px] text-[#C38202]" />
        <div className="">
          <p className="text-[#C38202] font-medium">User_Id</p>
          <p className="text-[#FFFFFF]">3 days ago</p>
        </div>
      </div>

      <div className="bg- px-3 py-5 mt-6 rounded-3xl bg-[#2D4356] truncate...">
        <h3 className="text-[#D1A54F] text-xl font-medium">Lorem ipsum dolor sit amet consectetur adipisi....</h3>
        <p className="text-slate-50 mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi iure dolore aperiam cupiditate. Fuga labore voluptatum repellendus corporis non atque.</p>

        <ul className="flex items-center mt-3 gap-3">
          {
            hastags.map((tag, index) => (
              <li key={index} className="text-[#D1B888]">{tag}</li>
            ))
          }
        </ul>

      </div>
    </div>
  );
}
