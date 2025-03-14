/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers } from "formik";
import DescriptionBar from "../../../../../components/DescriptionBar";
import { addBvnNinSchema } from "../../../../../form-schemas";
import Button from "../../../../../components/FormComponents/Button";
import TextInputField from "../../../../../components/FormComponents/InputField";
import toast from "react-hot-toast";
import { _handleThrowErrorMessage } from "../../../../../utils";
import { appUrls } from "../../../../../services/urls";
import { api } from "../../../../../services/api";
import { AddBankWalletProps } from "../../../../../types";

type BvnNinEntryProps = {
  handleChangeStep: (nextPath: "bvn_nin" | "transaction_pin") => void;
  walletDetails: any;
};

export default function BvnNinEntry({
  handleChangeStep,
  walletDetails,
}: BvnNinEntryProps) {
  const handleUpdateBankWallet = async (
    payload: AddBankWalletProps,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(appUrls.WALLET_URL + "/update", payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const message = res?.data?.data ?? null;
        toast.success(message);
        handleChangeStep("transaction_pin");
        actions.resetForm();
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
      <DescriptionBar text="We promise it’s safe—just keeping things legit! 🔒✨" />
      <div className="lg:w-2/5 w-full p-3 bg-white min-h-auto h-auto rounded-xl shadow">
        <Formik
          validationSchema={addBvnNinSchema}
          initialValues={{
            bvn: "",
            nin: "",
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            const payload = {
              bvn: values?.bvn,
              nin: values?.nin,
              walletId: walletDetails?.walletId,
              bankName: walletDetails?.bankName,
              accountNumber: walletDetails?.accountNumber,
            };
            handleUpdateBankWallet(payload, actions);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} className="w-full">
              <div className="mb-2">
                <TextInputField
                  labelName="Bank Verification Number (BVN)"
                  name="bvn"
                  handleChange={handleChange}
                  type="tel"
                  placeholder=""
                  value={values.bvn}
                  errors={errors?.bvn}
                  touched={touched?.bvn}
                />
              </div>
              <div className="mb-2">
                <TextInputField
                  labelName="National Identification Number (NIN)"
                  name="nin"
                  handleChange={handleChange}
                  type="tel"
                  placeholder=""
                  value={values.nin}
                  errors={errors?.nin}
                  touched={touched?.nin}
                />
              </div>
              <div className="">
                <Button
                  title="Next"
                  className="px-4 h-[40px] text-center my-6 border border-dark_200"
                  type="submit"
                  isLoading={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
