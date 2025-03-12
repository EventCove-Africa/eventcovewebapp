/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import { _handleThrowErrorMessage, animationVariants } from "../../../utils";
import ModalPopup from "../../../components/ModalPopup";
import SignupSuccess from "../../components/SignupSuccess";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";
import CustomSelect from "../../../components/FormComponents/SelectInputField";
import { signupAddBankSchema } from "../../../form-schemas";
import useFetchBanks from "../../../hooks/useFetchBanks";
import toast from "react-hot-toast";
import { appUrls } from "../../../services/urls";
import { api } from "../../../services/api";
import { useState } from "react";
import { AddBankWalletProps } from "../../../types";
import { useNavigate } from "react-router-dom";

export default function AddBank() {
  const navigate = useNavigate();
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const [successText, setSuccessText] = useState("");
  const { banks, loading } = useFetchBanks();

  const handleCreateBankWallet = async (
    payload: AddBankWalletProps,
    actions: FormikHelpers<AddBankWalletProps>
  ) => {
    try {
      const res = await api.post(appUrls.WALLET_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const message = res?.data?.data ?? null;
        setSuccessText(message);
        handleOpenClose();
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <motion.main
      className="w-full h-full flex lg:justify-center items-center flex-col"
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Optional for exit animations
    >
      <h3 className="text-dark_200 font-bold lg:text-3xl text-xl">
        Add your payout account details to recieves funds from your eventcove
        sales 🚀
      </h3>
      <Formik
        initialValues={{
          bankName: "",
          accountNumber: "",
        }}
        validationSchema={signupAddBankSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          const payload = {
            bankName: values?.bankName,
            accountNumber: values?.accountNumber,
          };
          handleCreateBankWallet(payload, actions);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} className="w-full lg:pr-16 mt-1">
            <div className="mb-3">
              <CustomSelect
                label="Bank Name"
                name="bankName"
                isLoading={loading}
                onChange={(event) =>
                  setFieldValue("bankName", event?.value.name)
                }
                options={banks}
                errors={errors?.bankName}
                touched={touched?.bankName}
              />
            </div>
            <div className="mb-3">
              <TextInputField
                labelName="Account Number"
                name="accountNumber"
                handleChange={handleChange}
                type="tel"
                placeholder=""
                value={values.accountNumber}
                errors={errors?.accountNumber}
                touched={touched?.accountNumber}
              />
              {/* {values.accountNumber?.length === 10 && values.accountNumber && (
                <span className="text-secondary_300 flex justify-end text-xs font-normal">
                  Eventcove Africa
                </span>
              )} */}
            </div>
            <Button
              title="Proceed"
              className="w-full h-[40px] text-center my-6 border border-dark_200"
              type="submit"
              isLoading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <ModalPopup isOpen={isOpenModal}>
        <SignupSuccess
          text={`${successText} 🚀`}
          handleOpenClose={handleOpenClose}
          handleFunction={() => navigate("/app/home")}
          buttonText="Proceed"
        />
      </ModalPopup>
    </motion.main>
  );
}
