/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import DescriptionBar from "../../../../../components/DescriptionBar";
import { createPinSchema } from "../../../../../form-schemas";
import Button from "../../../../../components/FormComponents/Button";
import { animationVariants } from "../../../../../utils";
import OTPInput from "react-otp-input";

type TransactionPinProps = {
  handleOpenClose: () => void;
  setPin: React.Dispatch<React.SetStateAction<{ pin: string }>>;
  setAction: React.Dispatch<React.SetStateAction<any>>;
};
export type AddPinProps = {
  pin: string;
};

const inputOTPStyle = {
  minWidth: "45px",
  width: "auto",
  height: "56px",
  border: "1px solid #0000001F",
  outline: "none",
  borderRadius: "2px",
  color: "#0A0A0A",
  lineHeight: "44px",
  fontSize: "16px",
  fontWeight: "400",
};

export default function TransactionPin({
  handleOpenClose,
  setPin,
  setAction,
}: TransactionPinProps) {
  return (
    <motion.div
      transition={{ duration: 0.4 }}
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Optional for exit animations
    >
      <div className="w-full h-full">
        <DescriptionBar text="Enter your 6 digits Transaction PIN to keep your wallet 💯 secure. 🔒" />
        <div className="lg:w-2/5 w-full p-3 bg-white min-h-auto h-auto rounded-xl shadow">
          <Formik
            validationSchema={createPinSchema}
            initialValues={{
              pin: "",
              confirm_pin: "",
            }}
            enableReinitialize
            onSubmit={(values, actions) => {
              const payload = {
                pin: values?.pin,
              };
              setPin({ ...payload });
              setAction(actions);
              actions.setSubmitting(false);
              handleOpenClose();
            }}
          >
            {({
              handleSubmit,
              values,
              touched,
              errors,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form onSubmit={handleSubmit} className="">
                <div className="mb-1">
                  <label
                    htmlFor="PIN"
                    className="text-xs leading-4 text-dark_200 font-normal"
                  >
                    Enter PIN
                  </label>
                  <OTPInput
                    value={values?.pin}
                    onChange={(value: string) => setFieldValue("pin", value)}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "3px",
                    }}
                    inputType="number"
                    inputStyle={inputOTPStyle}
                  />
                  {errors.pin && touched.pin ? (
                    <div className="text-[10px] mt-1 text-red-500">
                      {errors.pin}
                    </div>
                  ) : null}
                </div>
                <div className="mb-1">
                  <label
                    htmlFor="confirm_PIN"
                    className="text-xs leading-4 text-dark_200 font-normal"
                  >
                    Confirm PIN
                  </label>
                  <OTPInput
                    value={values?.confirm_pin}
                    onChange={(value: string) =>
                      setFieldValue("confirm_pin", value)
                    }
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "3px",
                    }}
                    inputType="number"
                    inputStyle={inputOTPStyle}
                  />
                  {errors.confirm_pin && touched.confirm_pin ? (
                    <div className="text-[10px] mt-1 text-red-500">
                      {errors.confirm_pin}
                    </div>
                  ) : null}
                </div>
                <div className="">
                  <Button
                    title="Next"
                    className="px-8 h-[40px] text-center my-3 border border-dark_200"
                    type="submit"
                    isLoading={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </motion.div>
  );
}
