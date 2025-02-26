/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import close_cancel from "../../../assets/icons/close-circle.svg";
import { withdrawalsSchema } from "../../../form-schemas";
import TextInputField from "../../../components/FormComponents/InputField";
import Button from "../../../components/FormComponents/Button";
import PasswordInputField from "../../../components/FormComponents/PasswordField";
import { handleNumberInput } from "../../../utils";

export default function Withdrawals({ handleOpenClose, walletDetails }: any) {
  const validationSchema = withdrawalsSchema(walletDetails.balance);
  
  return (
    <div className="bg-white h-auto w-full md:w-[350px] rounded-xl p-3">
      <div className="flex justify-between items-center">
        <h4 className="text-dark_200 md:text-base text-sm font-bold">
          Withdrawal
        </h4>
        <div className="flex justify-end">
          <img
            onClick={handleOpenClose}
            src={close_cancel}
            alt="close_cancel"
            className="cursor-pointer"
          />
        </div>
      </div>
      <Formik
        initialValues={{
          transaction_pin: "",
          amount: "",
          bankName: walletDetails?.bankName || "",
          accountNumber: walletDetails?.accountNumber || "",
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          handleOpenClose();
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
              <TextInputField
                labelName="Bank name"
                name="bankName"
                handleChange={handleChange}
                type="text"
                value={values?.bankName}
                readOnly
              />
            </div>
            <div className="mb-1">
              <TextInputField
                labelName="Account Number"
                name="accountNumber"
                handleChange={handleChange}
                type="tel"
                value={values?.accountNumber}
                readOnly
              />
              <span className="text-secondary_300 flex justify-end text-xs font-normal">
                EventCove Africa
              </span>
            </div>
            <div className="mb-3">
              <TextInputField
                labelName="Amount"
                name="amount"
                handleChange={(e: any) =>
                  setFieldValue("amount", handleNumberInput(e.target.value))
                }
                type="tel"
                value={values.amount}
                errors={errors?.amount}
                touched={touched?.amount}
              />
            </div>

            <div className="mb-1">
              <PasswordInputField
                labelName="Transaction PIN"
                name="transaction_pin"
                type="tel"
                handleChange={handleChange}
                placeholder="**********"
                value={values.transaction_pin}
                errors={errors?.transaction_pin}
                touched={touched?.transaction_pin}
              />
            </div>
            <div>
              <Button
                title="Submit"
                className=" h-[40px] text-center my-6 border border-dark_200"
                type="submit"
                isLoading={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
