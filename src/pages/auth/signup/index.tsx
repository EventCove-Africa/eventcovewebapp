import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import PasswordInputField from "../../../components/FormComponents/PasswordField";
import GoogleAuth from "../../../components/GoogleAuth";
import { animationVariants } from "../../../utils";
import ModalPopup from "../../../components/ModalPopup";
import OTPVerify from "../../../components/OtpVerify";
import toast from "react-hot-toast";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";
import useNavigation from "../../../hooks/useNavigation";
import { signupSchema } from "../../../form-schemas";

export default function SignUp() {
  const { navigate } = useNavigation();
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();

  return (
    <motion.main
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Optional for exit animations
      className="w-full h-full"
    >
      <h3 className="text-dark_200 font-bold lg:text-3xl text-xl">
        Let’s kick things off in style! 💅 Drop your deets and let’s gooo! 🎉
      </h3>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={signupSchema}
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
          values,
          touched,
          errors,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit} className="w-full lg:pr-16 mt-1">
            <div className="mb-3">
              <TextInputField
                labelName="First Name"
                name="first_name"
                handleChange={handleChange}
                type="text"
                placeholder=""
                value={values.first_name}
                errors={errors?.first_name}
                touched={touched?.first_name}
              />
            </div>
            <div className="mb-3">
              <TextInputField
                labelName="Last Name"
                name="last_name"
                handleChange={handleChange}
                type="text"
                placeholder=""
                value={values.last_name}
                errors={errors?.last_name}
                touched={touched?.last_name}
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
                name="confirm_password"
                handleChange={handleChange}
                placeholder="**********"
                value={values.confirm_password}
                errors={errors?.confirm_password}
                touched={touched?.confirm_password}
              />
            </div>
            <Button
              title="Sign Up"
              className="w-full h-[40px] text-center my-6 border border-dark_200"
              type="submit"
              isLoading={isSubmitting}
            />
            <GoogleAuth text="Sign Up with Google" handleFunction={() => {}} />
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
        )}
      </Formik>
      <ModalPopup isOpen={isOpenModal}>
        <OTPVerify
          handleOpenClose={handleOpenClose}
          nextPath="/auth/signup/add-bank"
        />
      </ModalPopup>
    </motion.main>
  );
}
