import {Outlet, useNavigate} from "react-router-dom";
import {ArrowBack, HomeOutlined} from "@mui/icons-material";
import React from "react";

export default function Class () {

  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen relative flex flex-col items-center overflow-y-auto" id="read-container">
      <Outlet/>

      {/* home 按钮 */}
      <div className={`w-full p-2 fixed z-20 bg-transparent flex gap-2 overflow-hidden pointer-events-none`}
           style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
        <button className="btn-scale btn-white size-14 rounded-md border-2 border-black
													 flex items-center justify-center group pointer-events-auto"
                onClick={() => {
                  if (location.pathname === "/class") {
                    navigate('/')
                  } else {
                    navigate(-1)
                  }
                }}>
          {
            location.pathname === '/class'
              ? <HomeOutlined style={{fontSize: "3rem"}}/>
              : <ArrowBack style={{fontSize: "3rem"}}/>
          }
        </button>
      </div>
    </div>
  );

}