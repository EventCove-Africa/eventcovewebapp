/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Button from "../../../components/FormComponents/Button";
import PasswordInputField from "../../../components/FormComponents/PasswordField";
import ModalPopup from "../../../components/ModalPopup";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";
import SignupSuccess from "../../components/SignupSuccess";
import { _handleThrowErrorMessage, animationVariants } from "../../../utils";
import { signupResetPasswordSchema } from "../../../form-schemas";
import useQueryParams from "../../../hooks/useQueryParams";
import { appUrls } from "../../../services/urls";
import { api } from "../../../services/api";

type ResetPasswordProps = {
  code: string | null;
  password: string;
};

export default function ResetPassword() {
  const navigate = useNavigate();
  const [successText, setSuccessText] = useState("");
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const getParam = useQueryParams();
  const code = getParam("code");

  const handleResetPassword = async (
    payload: ResetPasswordProps,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(appUrls.RESET_PASSWORD_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        // const message = res?.data?.data ?? null;
        setSuccessText("Password Reset Successful");
        handleOpenClose();
        actions.resetForm();
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      actions.setSubmitting(false);
    }
  };

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
        validationSchema={signupResetPasswordSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          const payload = {
            password: values?.password,
            code,
          };
          handleResetPassword(payload, actions);
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
        <SignupSuccess
          handleOpenClose={handleOpenClose}
          showCancel={false}
          buttonText="Proceed"
          text={`${successText} 🚀`}
          handleFunction={() => navigate("/auth/login")}
        />
      </ModalPopup>
    </motion.main>
  );
}
