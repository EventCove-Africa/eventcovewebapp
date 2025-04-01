/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers } from "formik";
import DescriptionBar from "../../../../../components/DescriptionBar";
import { signupAddBankSchema } from "../../../../../form-schemas";
import Button from "../../../../../components/FormComponents/Button";
import TextInputField from "../../../../../components/FormComponents/InputField";
import toast from "react-hot-toast";
import { _handleThrowErrorMessage } from "../../../../../utils";
import { appUrls } from "../../../../../services/urls";
import { api } from "../../../../../services/api";
import { AddBankWalletProps } from "../../../../../types";
import CustomSelect from "../../../../../components/FormComponents/SelectInputField";
import useFetchBanks from "../../../../../hooks/useFetchBanks";

type BvnNinEntryProps = {
  handleChangeStep: (nextPath: "bvn_nin" | "transaction_pin") => void;
};

export default function AddBankDetails({ handleChangeStep }: BvnNinEntryProps) {
  const { banks, loading } = useFetchBanks();

  const handleCreateBankWallet = async (
    payload: AddBankWalletProps,
    actions: FormikHelpers<AddBankWalletProps>
  ) => {
    try {
      const res = await api.post(appUrls.WALLET_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        handleChangeStep("bvn_nin");
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full">
      <DescriptionBar text="Set up your payout account to receive funds from your EventCove sales 🚀" />
      <div className="lg:w-2/5 w-full p-3 bg-white min-h-auto h-auto rounded-xl shadow">
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
            <Form onSubmit={handleSubmit} className="w-full mt-1">
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
                  defaultValue={values?.bankName}
                  value={values?.bankName}
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
      </div>
    </div>
  );
}
