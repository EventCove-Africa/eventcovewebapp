/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import OTPInput from "react-otp-input";
import close_cancel from "../../assets/icons/close-circle.svg";
import Button from "../FormComponents/Button";
import { api } from "../../services/api";
import { appUrls } from "../../services/urls";
import { _handleThrowErrorMessage, setAuthCookies } from "../../utils";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { OTPVerifyProps, useUserProps } from "../../types";
import { useUser } from "../../context/UserDetailsProvider.tsx";

type VerifyOTPProps = {
  otp: string;
};

export default function OTPVerify({
  handleOpenClose,
  nextPath,
  email,
  handleNextFunction,
  transactionType,
  showCancelButton = true,
  allowResendOTPOnRender = false,
}: OTPVerifyProps) {
  const { userDetails } = useUser() as useUserProps;
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();
  const otpSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is Required")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
  });

  const handleResendOTP = async () => {
    const payload = {
      email: email || userDetails?.email,
      transactionType,
    };
    setIsResending(true);
    try {
      const res = await api.post(appUrls.OTP_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const message = res?.data?.data;
        toast.success(message);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOTP = async (
    payload: VerifyOTPProps,
    actions: FormikHelpers<VerifyOTPProps>
  ) => {
    try {
      const res = await api.post(appUrls.OTP_URL + "/verify", payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const { access_token, token_type } = res?.data?.data ?? null;
        if (!["create-pin", "initiate-payout"].includes(transactionType)) {
          if (access_token) {
            setAuthCookies({ access_token, token_type });
          }
        }
        toast.success("OTP verified successfully");
        handleNextFunction && handleNextFunction?.();
        nextPath && navigate(nextPath);
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted && allowResendOTPOnRender) {
        handleResendOTP();
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="h-auto bg-white md:w-[458px] w-full rounded-xl p-3">
      {showCancelButton && (
        <div className="flex justify-end">
          <img
            onClick={handleOpenClose}
            src={close_cancel}
            alt="close_cancel"
            className="cursor-pointer"
          />
        </div>
      )}
      <div className="flex justify-center items-center flex-col text-dark_200 text-sm font-normal">
        Please enter the OTP that was sent to
        <span className="text-primary_100">
          {email || userDetails?.email || "N/A"}{" "}
        </span>
      </div>
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={otpSchema}
        onSubmit={(values, actions) => {
          const payload = {
            email: email || userDetails?.email,
            otp: values.otp,
            transactionType,
          };
          handleVerifyOTP(payload, actions);
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
                value={values?.otp}
                onChange={(value: string) => setFieldValue("otp", value)}
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
              {errors.otp && touched.otp ? (
                <div className="text-xs text-red-500">{errors.otp}</div>
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
              <span
                role="button"
                aria-disabled={isResending}
                onClick={!isResending ? handleResendOTP : undefined}
                className={`ml-1 transition-colors ${
                  isResending
                    ? "text-gray-400 cursor-default"
                    : "text-primary_100 cursor-pointer hover:underline hover:text-primary_80"
                }`}
              >
                {isResending ? "Resending..." : "Resend"}
              </span>
            </h3>
          </Form>
        )}
      </Formik>
    </div>
  );
}
