import { Framer, Personalcard, UserTag } from "iconsax-react";

type WalletInfoProps = {
  icon: JSX.Element;
  label: string;
};

const WalletInfo = ({ icon, label }: WalletInfoProps) => (
  <div className="flex gap-3 items-center">
    <div className="bg-primary_300 cursor-default flex justify-center items-center h-[30px] w-[30px] rounded-full">
      {icon}
    </div>
    <h4 className="text-dark_200 cursor-default hover:text-primary_100 font-normal text-sm">
      {label}
    </h4>
  </div>
);

export default function SetUpWalletList() {
  return (
    <>
      <article className="w-full h-fit bg-white rounded-xl p-4">
        <h4 className="text-grey_100 font-normal text-sm">
          What you need to set up your bank
        </h4>
        <div className="flex flex-col gap-3 mt-4">
          <WalletInfo
            icon={<Personalcard size="16" className="text-primary_100" />}
            label="National Identification Number (NIN)"
          />
          <WalletInfo
            icon={<UserTag size="16" className="text-primary_100" />}
            label="Bank Verification Number (BVN)"
          />
          <WalletInfo
            icon={<Framer size="16" className="text-primary_100" />}
            label="Transaction PIN"
          />
        </div>
      </article>
    </>
  );
}
