import React, { useState } from "react";
// import RoundedBtn from "./Common/RoundedBtn";
import { MdPeopleAlt } from "react-icons/md";
import { TbCircleDashed } from "react-icons/tb";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiDotsVertical } from "react-icons/hi";
import { BiFilter } from "react-icons/bi";
import Chats from "./Chats";
import RoundedBtn from "../common/RoundedBtn";
// import { pp } from "../assets/whatsapp";

function LeftMenu() {

  return (
    <div style={{height:'85vh'}} className="flex flex-col border-r border-double border-4 border-slate-300 w-100 h-screen">
      <div className="flex justify-between items-center bg-[#f8fafc] h-[60px] p-3">
        <img src="" alt="" className="rounded-full w-[40px]" />

        <div className="flex justify-between ">
          {/* <RoundedBtn icon={<TbCircleDashed />} />
          <RoundedBtn icon={<BsFillChatLeftTextFill />} />
        <RoundedBtn icon={<HiDotsVertical />} /> */}
        <RoundedBtn icon={<MdPeopleAlt />} />
        </div>
      </div>

      <div className="flex justify-between items-center h-[60px] p-2">
        <input
          type="text"
          placeholder="Search or start a new chat"
          className="rounded-lg  text-[#8796a1] text-sm font-light outline-none px-4 py-2 w-[400px] h-[35px] placeholder:text-[#8796a1] placeholder:text-sm placeholder:font-light"
        />

        {/* Filter button */}
        {/* <button
          className={`text-2xl m-2 p-1 rounded-full ${
            filter
              ? "bg-emerald-500 text-white rounded-full hover:bg-emerald-700"
              : "text-[#8796a1] hover:bg-[#3c454c]"
          }`}
          onClick={() => setFilter(!filter)}
        >
          <BiFilter />
        </button> */}
      </div>

      {/* Chats */}
      <Chats  />
    </div>
  );
}

export default LeftMenu;