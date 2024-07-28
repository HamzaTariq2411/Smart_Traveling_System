import React, { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { baseUrl } from "../../helper";

const RoomDetailModel = ({ setShowModel, room }) => {
  return (
    <div className="h-screen overflow-y-auto">
      <div className="p-4 ml-10 ">
        <div className="max-w-md mx-auto bg-white sm:p-8 p-5 rounded shadow-lg relative">
          <div
            className="absolute text-black right-2 top-2 cursor-pointer text-2xl"
            onClick={() => {
              setShowModel(false);
            }}
          >
            <IoMdCloseCircle />
          </div>
          <div className="block text-gray-700 text-sm font-bold mb-2 text-center">
            {room?.hotelName}
          </div>
          <div>
            <Carousel>
              {room?.images?.map((image, index) => (
                <div key={index}>
                  <img src={`${baseUrl}/images/${image?.filename}`} alt="" />
                </div>
              ))}
            </Carousel>
            <div className="text-black sm:text-sm text-xs">
              {room?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailModel;
