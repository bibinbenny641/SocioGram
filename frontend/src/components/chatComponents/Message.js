import React from "react";
import AuthContext from "../../context/AuthContext";
import moment from 'moment';


function Message({ msg, time, sender, sent,index }) {
  let { user } = React.useContext(AuthContext)
  return (
    // Message container
    <>
      {user.user_id === sender ?
        <div key={index}>
          <div
            className={`flex justify-center items-center rounded-md w-fit my-1 ${"bg-gradient-to-r from-blue-500 to-cyan-500 ml-auto"
              }`}>
            {/* Image message */}


            <div
              className="flex justify-between items-end max-w-[410px] p-2"
            // style={{ background:'blue' }}
            >
              {/* Link */}

              <p className="text-white text-sm mr-2">{msg}</p><br></br>


            </div>



          </div >
          <div className={`flex justify-center items-center rounded-md w-fit my-1 ${" ml-auto"
            }`}>

            <p className="text-[#8796a1] text-[10px] min-w-[50px]">{(moment(time).fromNow())}</p>
          </div>
        </div>
        :

        <div>
          <div
            className={`flex justify-center items-center rounded-md w-fit my-1 ${"bg-[#202d33] mr-auto"
                }`}>
            {/* Image message */}


            <div
              className="flex justify-between items-end max-w-[410px] p-2"
            // style={{ background:'blue' }}
            >
              {/* Link */}

              <p className="text-white text-sm mr-2">{msg}</p><br></br>


            </div>



          </div >
          <div className={`flex justify-center items-center rounded-md w-fit my-1 ${" mr-auto"
            }`}>

            <p className="text-[#8796a1] text-[10px] min-w-[50px]">{(moment(time).fromNow())}</p>
          </div>
        </div>


        // <div
        //   className={`flex justify-center items-center rounded-md w-fit my-1 ${"bg-[#202d33] mr-auto"
        //     }`}
        // >
        //   {/* Image message */}


        //   <div
        //     className="flex justify-between items-end max-w-[410px] p-2"

        //   >
        //     {/* Link */}

        //     <p className="text-white text-sm mr-2">{msg}</p>


        //     <p className="text-[#8796a1] text-[10px] min-w-[50px]">{(moment(time).fromNow())}</p>
        //   </div>


        // </div>
      }
    </>
  );
}

export default Message;
