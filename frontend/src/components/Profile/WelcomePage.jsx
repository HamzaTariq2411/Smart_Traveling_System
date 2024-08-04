import React from "react";
import { userimg } from "../../images";
import { useAuth } from "../../store/auth";
import { baseUrl } from "../helper";

const WelcomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-center flex-col items-center align-middle min-h-svh ml-14">
      <div className="w-2/4 flex flex-col justify-center items-center gap-4">
        <img
          src={`${baseUrl}/images/${user?.image}`}
          alt=""
          onError={(e) => {
            e.target.src = userimg; // Set default image if the loaded image encounters an error
          }}
          className="md:h-36 md:w-36 h-28 w-28 rounded-full "
        />
        <h1 className="lg:text-2xl md:text-xl sm:text-lg text-base text-center">
          Welcome <span className="font-semibold"> {user?.fullName}</span> to
          our Website. We hope you find the best experience here.
        </h1>
      </div>
    </div>
  );
};

export default WelcomePage;
