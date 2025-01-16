/* eslint-disable @typescript-eslint/no-explicit-any */
import close_cancel from "../../../assets/icons/close-circle.svg";
import checked_suceess from "../../../assets/icons/checked_suceess.svg";
import Button from "../../../components/FormComponents/Button";
import { useNavigate } from "react-router-dom";

export default function SignupSuccess({ handleOpenClose }: any) {
  const navigate = useNavigate();
  return (
    <div className="bg-white h-auto w-full md:w-[350px] rounded-xl p-3">
      <div className="flex justify-end">
        <img
          onClick={handleOpenClose}
          src={close_cancel}
          alt="close_cancel"
          className="cursor-pointer"
        />
      </div>
      <div className="flex justify-center">
        <img
          src={checked_suceess}
          alt="checked_suceess"
          className="cursor-pointer"
        />
      </div>
      <h4 className="text-dark_200 text-base font-normal text-center my-4">
        Congrats, you’re all set! 🎉 Time to vibe. 🚀
      </h4>
      <Button
        title="Proceed"
        className="w-full h-[40px] text-center border border-dark_200"
        type="button"
        onClick={() => {
          handleOpenClose();
          navigate("/auth/login");
        }}
      />
    </div>
  );
}
