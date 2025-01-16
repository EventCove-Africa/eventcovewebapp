import { Form, Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Button from "../../../components/FormComponents/Button";
import PasswordInputField from "../../../components/FormComponents/PasswordField";
import { animationVariants } from "../../../utils";
import ModalPopup from "../../../components/ModalPopup";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";
import SignupSuccess from "../components/SignupSuccess";

export default function ResetPassword() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const signupSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Too Short!")
      .max(50, "Too Long!")
      .required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required...."),
  });
  return (
    <motion.main
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Optional for exit animations
      className="w-full h-full flex flex-col md:justify-center items-center"
    >
      <h3 className="text-dark_200 font-bold md:text-3xl text-xl self-start lg:mr-24 mr-0">
        Secure the vibe—new password please! 🔐
      </h3>
      <Formik
        initialValues={{
          password: "",
          confirm_password: "",
        }}
        validationSchema={signupSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          handleOpenClose()
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
              title="Proceed"
              className="w-full h-[40px] text-center my-6 border border-dark_200"
              type="submit"
              isLoading={isSubmitting}
            />
          </Form>
        )}
      </Formik>
      <ModalPopup isOpen={isOpenModal}>
        <SignupSuccess handleOpenClose={handleOpenClose} />
      </ModalPopup>
    </motion.main>
  );
}
