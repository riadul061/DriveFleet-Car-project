import React from "react";
// import { HashLoader } from "react-spinners";

const loadingSpinner = () => {
  return (
    <div className="flex justify-center items-center bg-purple-200 h-screen font-bold text-5xl">
        Global loading......
      {/* <HashLoader color="#ad46ff" /> */}
    </div>
  );
};

export default loadingSpinner;