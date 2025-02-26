import { Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import useNavigation from "../../../hooks/useNavigation";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import PasswordInputField from "../../../components/FormComponents/PasswordField";
import GoogleAuth from "../../../components/GoogleAuth";
import { animationVariants } from "../../../utils";
import { loginSchema } from "../../../form-schemas";
// import { useLocation } from "react-router-dom";
import { useUser } from "../../../context/UserDetailsProvider.tsx";
import { LoginData, useUserProps } from "../../../types/generalTypes.tsx";

export default function Login() {
  const { navigate } = useNavigation();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/app/home";
  const { login } = useUser() as useUserProps;

  const loginGoogle = useGoogleLogin({
    onSuccess: (response) => console.log("Login Success:", response),
    onError: (error) => console.error("Login Failed:", error),
  });

  return (
    <motion.main
      className="w-full h-full flex lg:justify-center items-center flex-col"
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Optional for exit animations
    >
      <h3 className="text-dark_200 font-bold lg:text-3xl text-xl">
        Welcome back, we missed ya! 💖 Let’s pick up where we left off. 🙌
      </h3>
      <Formik
        initialValues={{
          email: "",
          password: "",
          eventId: "",
        }}
        validationSchema={loginSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          login({
            payload: values,
            actions: actions as FormikHelpers<LoginData>,
            from: "/app/home",
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
            <h4
              onClick={() => navigate("/auth/forget-password")}
              className="text-xs font-normal text-secondary_300 cursor-pointer hover:underline"
            >
              Forget Password
            </h4>
            <Button
              title="Sign In"
              className="w-full h-[40px] text-center my-6 border border-dark_200"
              type="submit"
              isLoading={isSubmitting}
            />
            <GoogleAuth
              text="Sign In with Google"
              handleFunction={loginGoogle}
            />
            <h4 className="text-sm font-semibold text-grey_100">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/auth/signup")}
                className="text-secondary_300 cursor-pointer font-bold hover:underline"
              >
                Create one
              </span>
            </h4>
          </Form>
        )}
      </Formik>
    </motion.main>
  );
}
