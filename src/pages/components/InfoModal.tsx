/* eslint-disable @typescript-eslint/no-explicit-any */
import close_cancel from "../../assets/icons/close-circle.svg";
import info from "../../assets/icons/info.svg";

export default function InfoModal({ handleOpenClose, text }: any) {
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
        <img src={info} alt="info" className="w-[70px] h-[70px]" />
      </div>
      <h4 className="text-dark_200 text-sm font-normal text-center my-4">
        {text}
      </h4>
    </div>
  );
}
