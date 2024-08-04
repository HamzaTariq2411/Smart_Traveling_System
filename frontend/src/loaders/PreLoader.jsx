import React from "react";
import preLoader from "../lottie/StartAnimation.json";
import Lottie from "lottie-react";

const PreLoader = () => {
  const style = {
    height: 300,
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-svh  bg-gradient-to-bl from-slate-900 via-purple-900 to-slate-900">
      <Lottie animationData={preLoader} style={style} />
      <div className="text-4xl font-preLoaderFont text-white pt-2">
        <span className="grey-color"> &lt;</span>
        <span className="splash-title font-logofont">
          Smart Traveling System
        </span>
        <span className="grey-color">/&gt;</span>
      </div>
    </div>
  );
};

export default PreLoader;
