import { useState } from "react";
import { Edit, Eye, EyeSlash } from "iconsax-react";
import { convertToAsterisks, formatToNaira } from "../../../utils";
import Button from "../../../components/FormComponents/Button";
import useNavigation from "../../../hooks/useNavigation";
import CopyToClipboard from "../../../components/CopyToClipboard";
import ModalPopup from "../../../components/ModalPopup";
import InfoModal from "../../components/InfoModal";
import { useOpenCloseModals } from "../../../hooks/useOpenCloseModal";
import TransactionHistory from "./TransactionHistory";
import SetUpWalletList from "./SetUpWalletList";
import Withdrawals from "./Withdrawals";

export default function Wallet() {
  const { navigate } = useNavigation();
  // const [hasTransactionHistory] = useState(true);
  const [hasAmount] = useState(true);
  const { isOpenModal, handleOpenClose } = useOpenCloseModals();
  const [showAmount, setShowAmount] = useState(false);
  const handleSwitch = () => setShowAmount(!showAmount);

  return (
    <main className="w-full h-full">
      <header>
        <h1 className="text-dark_200 md:text-base text-sm font-normal">
          Yo, this is your wallet! 💸
        </h1>
      </header>
      <section className="w-full h-full flex lg:flex-row flex-col lg:gap-10 gap-6 mt-4">
        {/* Wallet Balance Section */}
        <article className="lg:w-1/3 md:w-[70%] w-full h-full flex flex-col lg:gap-10 gap-6">
          <div className="relative w-full min-h-[124px] px-3 py-4 bg-secondary_200 rounded-xl overflow-hidden">
            <div className="absolute top-2 -left-14 w-[100px] h-[100px] bg-secondary_600 rounded-full" />
            <div className="relative z-20 flex justify-between">
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-normal text-white">
                  Wallet Balance
                </h3>
                <h5 className="flex items-center gap-2 text-xl font-bold text-white md:text-2xl">
                  {showAmount
                    ? convertToAsterisks(formatToNaira(0))
                    : formatToNaira(0)}
                  <button
                    aria-label={showAmount ? "Hide balance" : "Show balance"}
                    className="cursor-pointer text-white"
                    onClick={handleSwitch}
                  >
                    {showAmount ? (
                      <Eye size="20" variant="Bold" />
                    ) : (
                      <EyeSlash size="20" variant="Bold" />
                    )}
                  </button>
                </h5>
              </div>
              <Button
                backgroundColor="bg-primary_300"
                textColor="text-primary_100"
                title={`${hasAmount ? "Withdrawal" : "Set Up Wallet"}`}
                type="button"
                onClick={() =>
                  hasAmount
                    ? handleOpenClose("withdrawals")
                    : navigate("/app/wallet/add")
                }
              />
            </div>
          </div>
          <div className="bg-white w-full px-3 py-4 rounded-xl flex flex-col gap-2 shadow">
            <div className="w-full flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <h3 className="text-grey_100 text-xs font-normal">Bank Name</h3>
                <h3 className="text-dark_200 text-sm font-normal">UBA</h3>
              </div>
              <Edit
                onClick={() => handleOpenClose("infoModal")}
                size="16"
                className="text-dark_200 cursor-pointer"
              />
            </div>
            <div className="w-full flex justify-between items-end">
              <div className="flex flex-col gap-2">
                <h3 className="text-grey_100 text-xs font-normal">
                  Accont number
                </h3>
                <h3 className="text-dark_200 text-sm font-normal">123456789</h3>
              </div>
              <CopyToClipboard text="123456789" />
            </div>
          </div>
        </article>

        {/* Bank Setup Section */}
        <div className="flex flex-col gap-4 lg:w-2/3 w-full">
          {/* {!hasTransactionHistory ? ( */}
          <SetUpWalletList />
          {/* ) : ( */}
          <TransactionHistory />
          {/* )} */}
        </div>
      </section>
      <ModalPopup isOpen={isOpenModal("infoModal")}>
        <InfoModal
          handleOpenClose={() => handleOpenClose("infoModal")}
          text="Please contact our support team on eventcoveafrica@gmail.com"
        />
      </ModalPopup>
      <ModalPopup isOpen={isOpenModal("withdrawals")}>
        <Withdrawals handleOpenClose={() => handleOpenClose("withdrawals")} />
      </ModalPopup>
    </main>
  );
}
