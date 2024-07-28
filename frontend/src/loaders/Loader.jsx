import React from 'react';
import Loading from "../lottie/Loading.json";
import Lottie from 'lottie-react';

const Loader = () => {
    const style = {
        height: 300,
      };
  return (
    <div>
      <Lottie animationData={Loading} style={style}/>
    </div>
  )
}

export default Loader
