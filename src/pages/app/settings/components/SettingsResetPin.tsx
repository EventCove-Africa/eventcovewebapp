/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import ModalPopup from "../../../../components/ModalPopup";
import OTPVerify from "../../../../components/OtpVerify";
import toast from "react-hot-toast";
import Button from "../../../../components/FormComponents/Button";
import { appUrls } from "../../../../services/urls";
import { api } from "../../../../services/api";
import { _handleThrowErrorMessage } from "../../../../utils";

const inputOTPStyle = {
  width: "45px",
  height: "56px",
  border: "1px solid #0000001F",
  outline: "none",
  borderRadius: "2px",
  color: "#0A0A0A",
  lineHeight: "44px",
  fontSize: "16px",
  fontWeight: "400",
};

export default function SettingsResetPin() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [pin, setPin] = useState<{ pin: string }>({
    pin: "",
  });
  const [action, setAction] = useState<any>();

  const handleOpenClose = () => setIsModalOpen((prev) => !prev);

  const handleUpdatePin = async () => {
    action.setSubmitting(true);
    handleOpenClose();
    try {
      const res = await api.post(appUrls.WALLET_URL + "/pin", pin);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        toast.success("PIN updated successfully");
        action.resetForm();
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      action.setSubmitting(false);
    }
  };

  const pinSchema = Yup.object().shape({
    pin: Yup.string()
      .required("PIN is Required")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
    confirm_pin: Yup.string()
      .required("Confirm PIN is Required")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits")
      .oneOf([Yup.ref("pin")], "PINs must match"),
  });

  return (
    <>
      <Formik
        initialValues={{
          pin: "",
          confirm_pin: "",
        }}
        validationSchema={pinSchema}
        onSubmit={(values, actions) => {
          const payload = {
            pin: values.pin,
          };
          setPin(payload);
          handleOpenClose();
          setAction(actions);
          actions.setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          setFieldValue,
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form
            onSubmit={handleSubmit}
            className="md:w-[100%] w-full mt-3 flex flex-col gap-4"
          >
            <div>
              <label
                htmlFor="PIN"
                className="text-xs leading-4 text-dark_200 font-normal"
              >
                PIN
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
            <div>
              <label
                htmlFor="PIN"
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
            <Button
              title="Proceed"
              className="w-full text-center"
              type="submit"
              isLoading={isSubmitting}
            />
          </Form>
        )}
      </Formik>

      <ModalPopup isOpen={isModalOpen}>
        <OTPVerify
          transactionType="reset-pin"
          handleNextFunction={handleUpdatePin}
          handleOpenClose={handleOpenClose}
          allowResendOTPOnRender={true}
          showCancelButton={false}
        />
      </ModalPopup>
    </>
  );
}
