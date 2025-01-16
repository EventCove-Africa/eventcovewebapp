/* eslint-disable @typescript-eslint/no-explicit-any */
import close_cancel from "../../../assets/icons/close-circle.svg";
import info from "../../../assets/icons/info.svg";

export default function InfoModal({ handleOpenClose }: any) {
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
        <img src={info} alt="info" className="cursor-pointer" />
      </div>
      <h4 className="text-dark_200 text-base font-normal text-center my-4">
        Hop over to your email and hit the link! 🔗
      </h4>
    </div>
  );
}
