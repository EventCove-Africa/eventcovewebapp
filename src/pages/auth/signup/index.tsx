/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import PasswordInputField from "../../../components/FormComponents/PasswordField";
import GoogleAuth from "../../../components/GoogleAuth";
import { _handleThrowErrorMessage, animationVariants } from "../../../utils";
import ModalPopup from "../../../components/ModalPopup";
import OTPVerify from "../../../components/OtpVerify";
import toast from "react-hot-toast";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";
import { signupSchema } from "../../../form-schemas";
import { useUser } from "../../../context/UserDetailsProvider.tsx";
import { SignUpData, useUserProps } from "../../../types/generalTypes.tsx";
import { useEffect, useState } from "react";
import useQueryParams from "../../../hooks/useQueryParams.tsx";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

type GoogleUserInfoProp = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
};

export default function SignUp() {
  const navigate = useNavigate();
  const getParam = useQueryParams();
  const verifyOTPEmailFromLogin = getParam("verifyOTP");
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const [userDetailsFromGoogle, setUserDetailsFromGoogle] =
    useState<GoogleUserInfoProp>();
  const [email, setEmail] = useState("");
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const { signup, handleAuthWithGoogle } = useUser() as useUserProps;

  const handleFunctionGoogleAuth = useGoogleLogin({
    onSuccess: async (response) => {
      const userInfo = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        }
      ).then((res) => res.json());
      setUserDetailsFromGoogle(userInfo);
      setEmail(userInfo?.email);
      const payload = {
        firstName: userInfo?.given_name || "",
        lastName: userInfo?.family_name || "",
        email: userInfo?.email || "",
      };
      handleAuthWithGoogle({ payload, handleOpenClose, setIsLoadingGoogle });
    },
    onError: (error) => {
      const err_message = _handleThrowErrorMessage("Signup Failed!");
      toast.error(err_message);
      console.error("Signup Failed:", error);
      setIsLoadingGoogle(false);
    },
  });

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted && verifyOTPEmailFromLogin) {
        handleOpenClose();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [verifyOTPEmailFromLogin]);

  return (
    <motion.main
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="w-full h-full"
    >
      <div className="w-full flex justify-between md:items-center items-end gap-1 md:flex-row flex-col-reverse">
        <div className="self-start flex flex-col gap-1">
          <h3 className="self-start text-dark_200 font-bold lg:text-2xl text-xl">
            Create an account
          </h3>
          <p className="text-dark_200 lg:text-base text-sm self-start">
            Creating an account with eventcove is free, get started today!
          </p>
        </div>
        {userDetailsFromGoogle?.picture && (
          <img
            src={userDetailsFromGoogle?.picture}
            alt="profile-pic"
            className="md:w-[40px] w-[30px] md:h-[40px] h-[30px] rounded-full"
          />
        )}
      </div>
      <Formik
        initialValues={{
          firstName: userDetailsFromGoogle?.given_name || "",
          lastName: userDetailsFromGoogle?.family_name || "",
          email: userDetailsFromGoogle?.email || "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          signup({
            payload: values,
            handleOpenClose,
            actions: actions as FormikHelpers<SignUpData>,
          });
          setEmail(values?.email);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          errors,
          isSubmitting,
        }) => {
          const isLoading = isSubmitting || isLoadingGoogle
          return (
            <Form onSubmit={handleSubmit} className="w-full lg:pr-16 mt-1">
              <div className="mb-3">
                <TextInputField
                  labelName="First Name"
                  name="firstName"
                  handleChange={handleChange}
                  type="text"
                  placeholder=""
                  value={values.firstName}
                  errors={errors?.firstName}
                  touched={touched?.firstName}
                />
              </div>
              <div className="mb-3">
                <TextInputField
                  labelName="Last Name"
                  name="lastName"
                  handleChange={handleChange}
                  type="text"
                  placeholder=""
                  value={values.lastName}
                  errors={errors?.lastName}
                  touched={touched?.lastName}
                />
              </div>
              <div className="mb-3">
                <TextInputField
                  labelName="Email"
                  name="email"
                  handleChange={handleChange}
                  type="text"
                  placeholder=""
                  value={values.email}
                  errors={errors?.email}
                  touched={touched?.email}
                />
              </div>
              <div className="mb-1">
                <PasswordInputField
                  labelName="Password"
                  name="password"
                  handleChange={handleChange}
                  placeholder="**********"
                  value={values.password}
                  errors={errors?.password}
                  touched={touched?.password}
                />
              </div>
              <div className="mb-1">
                <PasswordInputField
                  labelName="Confirm Password"
                  name="confirmPassword"
                  handleChange={handleChange}
                  placeholder="**********"
                  value={values.confirmPassword}
                  errors={errors?.confirmPassword}
                  touched={touched?.confirmPassword}
                />
              </div>
              <Button
                title="Sign Up"
                className="w-full h-[40px] text-center my-6 border border-dark_200"
                type="submit"
                isLoading={isLoading}
              />
              <GoogleAuth
                text={`${
                  isLoadingGoogle ? "Loading....." : "Sign Up with Google"
                }`}
                handleFunction={() => {
                  setIsLoadingGoogle(true);
                  handleFunctionGoogleAuth();
                }}
                loading={isLoading}
              />
              <h4 className="text-sm font-semibold text-grey_100">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/auth/login")}
                  className="text-secondary_300 cursor-pointer font-bold hover:underline"
                >
                  Sign in
                </span>
              </h4>
              <h4 className="text-sm font-medium text-grey_100 mt-3">
                By continuing, you agree to EventCove's Terms and{" "}
                <span
                  onClick={() => {
                    toast.success("COMING SOON...", { duration: 3000 });
                  }}
                  className="text-secondary_300 cursor-pointer font-bold hover:underline"
                >
                  Privacy Policy.
                </span>
              </h4>
            </Form>
          );
        }}
      </Formik>
      <ModalPopup isOpen={isOpenModal}>
        <OTPVerify
          handleOpenClose={handleOpenClose}
          transactionType="create-account"
          nextPath="/auth/signup/add-bank"
          email={email || verifyOTPEmailFromLogin}
          showCancelButton={false}
        />
      </ModalPopup>
    </motion.main>
  );
}
