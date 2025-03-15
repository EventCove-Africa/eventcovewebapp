import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Edit, Eye, EyeSlash } from "iconsax-react";
import { convertToAsterisks, formatToNaira } from "../../../utils";
import Button from "../../../components/FormComponents/Button";
import CopyToClipboard from "../../../components/CopyToClipboard";
import ModalPopup from "../../../components/ModalPopup";
import InfoModal from "../../components/InfoModal";
import { useOpenCloseModals } from "../../../hooks/useOpenCloseModal";
import TransactionHistory from "./TransactionHistory";
import SetUpWalletList from "./SetUpWalletList";
import Withdrawals from "./Withdrawals";
import useFetchWalletDetails from "../../../hooks/useFetchWalletDetails";
import { useNavigate } from "react-router-dom";
import { useUserProps } from "../../../types";
import { useUser } from "../../../context/UserDetailsProvider.tsx";

export default function Wallet() {
  const navigate = useNavigate();
  const { userDetails } = useUser() as useUserProps;
  const { isOpenModal, handleOpenClose } = useOpenCloseModals();
  const [isAmountVisible, setIsAmountVisible] = useState(false);
  const { walletDetails, loading } = useFetchWalletDetails();
  const toggleAmountVisibility = () => setIsAmountVisible(!isAmountVisible);

  const handleCheckIfNinBvnPINIsSet = () => {
    const { nin, bvn, pinAdded } = walletDetails;
    if (!walletDetails) return;
    if (!nin || !bvn || !pinAdded) return false;
    return true;
  };

  return (
    <main className="w-full h-full">
      <header>
        <h1 className="text-dark_200 md:text-base text-sm font-normal">
          This is your wallet! 💸
        </h1>
      </header>

      <section className="w-full h-full flex lg:flex-row flex-col lg:gap-10 gap-6 mt-4">
        {/* Wallet Balance Section */}
        <article className="lg:w-1/3 md:w-[70%] w-full h-full flex flex-col lg:gap-10 gap-6">
          {loading ? (
            <Skeleton className="w-full min-h-[124px] rounded-md" />
          ) : (
            <div className="relative w-full min-h-[124px] px-3 py-4 bg-secondary_200 rounded-xl overflow-hidden">
              <div className="absolute top-2 -left-14 w-[100px] h-[100px] bg-secondary_600 rounded-full" />
              <div className="relative z-20 flex justify-between">
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-normal text-white">
                    Wallet Balance
                  </h3>
                  <h5 className="flex items-center gap-2 text-xl font-bold text-white md:text-2xl">
                    {isAmountVisible
                      ? convertToAsterisks(
                          formatToNaira(walletDetails?.balance || 0)
                        )
                      : formatToNaira(walletDetails?.balance || 0)}
                    <button
                      aria-label={
                        isAmountVisible ? "Hide balance" : "Show balance"
                      }
                      className="cursor-pointer text-white"
                      onClick={toggleAmountVisibility}
                    >
                      {isAmountVisible ? (
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
                  title={
                    handleCheckIfNinBvnPINIsSet()
                      ? "Withdrawal"
                      : "Set Up Wallet"
                  }
                  type="button"
                  onClick={() =>
                    handleCheckIfNinBvnPINIsSet()
                      ? handleOpenClose("withdrawals")
                      : navigate("/app/wallet/update", {
                          state: walletDetails,
                        })
                  }
                />
              </div>
            </div>
          )}

          {loading ? (
            <Skeleton className="w-full min-h-[124px] rounded-md" />
          ) : (
            <div className="bg-white w-full px-3 py-4 rounded-xl flex flex-col gap-2 shadow">
              <div className="w-full flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <h3 className="text-grey_100 text-xs font-normal">
                    Bank Name
                  </h3>
                  <h3 className="text-dark_200 text-sm font-normal">
                    {walletDetails?.bankName || "N/A"}
                  </h3>
                </div>
                {walletDetails?.bankName && (
                  <Edit
                    onClick={() => handleOpenClose("infoModal")}
                    size="16"
                    className="text-dark_200 cursor-pointer"
                  />
                )}
              </div>
              <div className="w-full flex justify-between items-end">
                <div className="flex flex-col gap-2">
                  <h3 className="text-grey_100 text-xs font-normal">
                    Account number
                  </h3>
                  <h3 className="text-dark_200 text-sm font-normal">
                    {walletDetails?.accountNumber || "N/A"}
                  </h3>
                </div>
                {walletDetails?.accountNumber && (
                  <CopyToClipboard text={walletDetails?.accountNumber || ""} />
                )}
              </div>
            </div>
          )}
        </article>

        {/* Bank Setup Section */}
        <div className="flex flex-col gap-4 lg:w-2/3 w-full">
          {!loading ? (
            <>{!handleCheckIfNinBvnPINIsSet() && <SetUpWalletList />}</>
          ) : (
            <Skeleton className="w-full min-h-[124px] rounded-md" />
          )}
          <TransactionHistory userDetails={userDetails} />
        </div>
      </section>

      {/* Modals */}
      <ModalPopup isOpen={isOpenModal("infoModal")}>
        <InfoModal
          handleOpenClose={() => handleOpenClose("infoModal")}
          text="Please contact our support team on eventcoveafrica@gmail.com"
        />
      </ModalPopup>
      <ModalPopup isOpen={isOpenModal("withdrawals")}>
        <Withdrawals
          walletDetails={walletDetails}
          userDetails={userDetails}
          handleOpenClose={() => handleOpenClose("withdrawals")}
        />
      </ModalPopup>
    </main>
  );
}
