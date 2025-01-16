import toast from "react-hot-toast";
import google from "../../assets/icons/google.svg";

type GoogleAuthProps = {
  text: string;
  handleFunction: () => void;
};

export default function GoogleAuth({ text }: GoogleAuthProps) {
  return (
    <div
      onClick={() => {
        toast.success("COMING SOON...", { duration: 3000 });
        // handleFunction();
      }}
      className="cursor-pointer w-full border border-border_color h-[45px] rounded-lg flex items-center justify-center gap-3 mb-3"
    >
      <img src={google} alt="google-logo" className="w-5 h-5" />
      <h4 className="text-dark_200 font-normal text-sm">{text}</h4>
    </div>
  );
}
