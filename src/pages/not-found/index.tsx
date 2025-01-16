import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-primary_300 text-[#A30162] px-6 text-center"
      role="main"
    >
      <div className="space-y-6 max-w-[600px]">
        {/* Animated 404 */}
        <h1
          className="text-[5rem] sm:text-[7rem] md:text-[8rem] font-extrabold animate-pulse leading-none"
          aria-label="Error 404"
        >
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Oops! Page Not Found
        </h2>
        <p className="text-base sm:text-lg">
          Sorry, the page you were looking for doesn’t exist.
        </p>

        {/* Button with animation */}
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 text-white bg-[#A30162] rounded-md shadow-md hover:bg-[#890140] transition duration-300 transform hover:scale-105"
          aria-label="Go back to the homepage"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
