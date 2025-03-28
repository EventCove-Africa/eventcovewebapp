import { Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import PasswordInputField from "../../../components/FormComponents/PasswordField";
import GoogleAuth from "../../../components/GoogleAuth";
import { _handleThrowErrorMessage, animationVariants } from "../../../utils";
import { loginSchema } from "../../../form-schemas";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserDetailsProvider.tsx";
import { LoginData, useUserProps } from "../../../types/generalTypes.tsx";
import useQueryParams from "../../../hooks/useQueryParams.tsx";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const location = useLocation();
  const getParam = useQueryParams();
  const navigate = useNavigate();
  const { login, handleAuthWithGoogle } = useUser() as useUserProps;
  const eventId = getParam("eventId") || null;
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const from = location.state?.from?.pathname || "/app/home";

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
      const payload = {
        firstName: userInfo?.given_name || "",
        lastName: userInfo?.family_name || "",
        email: userInfo?.email || "",
      };
      handleAuthWithGoogle({ payload, setIsLoadingGoogle });
    },
    onError: (error) => {
      const err_message = _handleThrowErrorMessage("Login Failed!");
      toast.error(err_message);
      console.error("Login Failed:", error);
      setIsLoadingGoogle(false);
    },
  });

  return (
    <motion.main
      className="w-full h-full flex lg:justify-center items-center flex-col"
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Optional for exit animations
    >
      <h3 className="self-start text-dark_200 font-bold lg:text-2xl text-xl mb-1">
        Welcome back 🙌
      </h3>
      <p className="text-dark_200 lg:text-base text-sm self-start">
        Please proceed with the email address used to register your account.
      </p>
      <Formik
        initialValues={{
          email: "",
          password: "",
          eventId: eventId,
        }}
        validationSchema={loginSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          const payload = {
            ...values,
            email: values?.email?.toLowerCase(),
          };
          login({
            payload,
            actions: actions as FormikHelpers<LoginData>,
            from:
              values?.eventId !== null
                ? `/tickets-validation/${values?.eventId}`
                : from,
          });
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
          <Form onSubmit={handleSubmit} className="w-full lg:pr-16 mt-1">
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
            {!values?.eventId && (
              <h4
                onClick={() => navigate("/auth/forget-password")}
                className="text-xs font-normal text-secondary_300 cursor-pointer hover:underline"
              >
                Forget Password
              </h4>
            )}
            <Button
              title="Sign In"
              className="w-full h-[40px] text-center my-6 border border-dark_200"
              type="submit"
              isLoading={isSubmitting || isLoadingGoogle}
            />
            {!values?.eventId && (
              <GoogleAuth
                text={`${
                  isLoadingGoogle ? "Loading....." : "Sign In with Google"
                }`}
                handleFunction={() => {
                  setIsLoadingGoogle(true);
                  handleFunctionGoogleAuth();
                }}
                loading={isSubmitting || isLoadingGoogle}
              />
            )}
            {!values?.eventId && (
              <h4 className="text-sm font-semibold text-grey_100">
                Don’t have an account?{" "}
                <span
                  onClick={() => navigate("/auth/signup")}
                  className="text-secondary_300 cursor-pointer font-bold hover:underline"
                >
                  Create one
                </span>
              </h4>
            )}
          </Form>
        )}
      </Formik>
    </motion.main>
  );
}
