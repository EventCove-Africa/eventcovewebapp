/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Form, Formik } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import close_cancel from "../../assets/icons/close-circle.svg";
import Button from "../FormComponents/Button";
import useNavigation from "../../hooks/useNavigation";

type OTPVerifyProps = {
  nextPath?: string;
  handleOpenClose: () => void;
};

export default function OTPVerify({
  handleOpenClose,
  nextPath,
}: OTPVerifyProps) {
  const { navigate } = useNavigation();
  const otpSchema = Yup.object().shape({
    email_otp: Yup.string()
      .required("OTP is Required")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  });
  return (
    <div className="h-auto bg-white md:w-[458px] w-full rounded-xl p-3">
      <div className="flex justify-end">
        <img
          onClick={handleOpenClose}
          src={close_cancel}
          alt="close_cancel"
          className="cursor-pointer"
        />
      </div>
      <div className="flex justify-center items-center flex-col text-dark_200 text-sm font-normal">
        Please enter the OTP that was sent to
        <span className="text-primary_100">eventcove@gmail.com </span>
      </div>
      <Formik
        initialValues={{
          email_otp: "",
        }}
        validationSchema={otpSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          nextPath && navigate(nextPath);
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
          <Form onSubmit={handleSubmit} className="w-full mt-3">
            <div className="mb-4">
              <OTPInput
                value={values?.email_otp}
                onChange={(value: string) => setFieldValue("email_otp", value)}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                containerStyle={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                inputType="number"
                inputStyle={{
                  width: "48px",
                  height: "48px",
                  border: "1px solid #0000001F",
                  outline: "none",
                  borderRadius: "2px",
                  color: "#0A0A0A",
                  lineHeight: "44px",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              />
              {errors.email_otp && touched.email_otp ? (
                <div className="text-xs text-red-500">{errors.email_otp}</div>
              ) : null}
            </div>
            <Button
              title="Proceed"
              className="w-full text-center"
              type="submit"
              isLoading={isSubmitting}
            />
            <h3 className="text-dark_200 text-sm font-normal text-center my-3">
              Didn't receive a code ?{" "}
              <span className="text-primary_100 ml-1 cursor-pointer hover:underline">
                Resend
              </span>
            </h3>
          </Form>
        )}
      </Formik>
    </div>
  );
}
