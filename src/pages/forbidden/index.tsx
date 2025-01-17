import React from "react";
import { useNavigate } from "react-router-dom";

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-primary_300 text-[#A30162] px-6 text-center"
      role="main"
    >
      <div className="space-y-6 max-w-[600px]">
        {/* Animated 403 */}
        <h1
          className="text-[5rem] sm:text-[7rem] md:text-[8rem] font-extrabold animate-pulse leading-none"
          aria-label="Error 403"
        >
          403
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold">Access Forbidden</h2>
        <p className="text-base sm:text-lg">
          Sorry, you don’t have permission to access this page.
        </p>

        {/* Button with animation */}
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 text-white bg-[#A30162] rounded-md shadow-md hover:bg-[#890140] transition duration-300 transform hover:scale-105"
          aria-label="Go back to the previous page"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
