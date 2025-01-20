import { Form, Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import useNavigation from "../../../hooks/useNavigation";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import PasswordInputField from "../../../components/FormComponents/PasswordField";
import GoogleAuth from "../../../components/GoogleAuth";
import { animationVariants } from "../../../utils";

export default function Login() {
  const { navigate } = useNavigation();
  const login = useGoogleLogin({
    onSuccess: (response) => console.log("Login Success:", response),
    onError: (error) => console.error("Login Failed:", error),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
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
        }}
        validationSchema={loginSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          navigate("/app/home");
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
            <GoogleAuth text="Sign In with Google" handleFunction={login} />
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
