import React from "react";

function Message({ msg, sent }) {
  return (
    // Message container
    <div
      className={`flex justify-center items-center rounded-md w-fit my-1 ${
        sent ? "bg-[#005c4b] ml-auto" : "bg-[#202d33] mr-auto"
      }`}
    >
      {/* Image message */}
     
        
        <div
          className="flex justify-between items-end max-w-[410px] p-2"
          style={{ wordBreak: "break-word" }}
        >
          {/* Link */}
          
            
            <p className="text-white text-sm mr-2">{msg}</p>
          
          <p className="text-[#8796a1] text-[10px] min-w-[50px]">3.56</p>
        </div>
      
    </div>
  );
}

export default Message;
