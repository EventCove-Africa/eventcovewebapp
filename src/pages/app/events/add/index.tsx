import { ArrowLeft } from "iconsax-react";
import { useNavigate } from "react-router-dom";

export default function AddEvents() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full">
      <h3 className="text-dark_200 text-base font-normal flex gap-1 items-center mb-3">
        <ArrowLeft
          className="cursor-pointer"
          size="16"
          color="#0D080B"
          onClick={() => navigate(-1)}
        />
        Event vibes loading—fill out the form to get started! 🌟
      </h3>
      <div className="w-1/3 bg-white h-[500px] rounded-xl shadow">

      </div>
    </div>
  );
}
