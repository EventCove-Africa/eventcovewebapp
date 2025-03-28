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
import { PasswordCharacterCheck } from "../../../types";
import { CloseCircle, TickCircle } from "iconsax-react";

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
  const [passwordCharacterCheck, setPasswordCharacterCheck] = useState({
    password_length: false,
    contains_uppercase: false,
    contains_lowercase: false,
    contains_number: false,
    unique_character: false,
  });
  const validationSchema = signupResetPasswordSchema(setPasswordCharacterCheck);
  const passwordRules: { key: keyof PasswordCharacterCheck; text: string }[] = [
    { key: "password_length", text: "Minimum of 8 characters" },
    { key: "contains_uppercase", text: "One UPPERCASE character" },
    { key: "contains_lowercase", text: "One lowercase character" },
    { key: "contains_number", text: "One number" },
    { key: "unique_character", text: "One unique character (e.g !@#$%&*)?>" },
  ];

  const handleResetPassword = async (
    payload: ResetPasswordProps,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(appUrls.RESET_PASSWORD_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
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
      <h3 className="self-start text-dark_200 font-bold lg:text-2xl text-xl mb-1">
        Reset Password 🔐
      </h3>
      <Formik
        initialValues={{
          password: "",
          confirm_password: "",
        }}
        validationSchema={validationSchema}
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
            <ul className="flex flex-col gap-1">
              {passwordRules.map(({ key, text }) => {
                const isValid = passwordCharacterCheck?.[key];
                return (
                  <li key={key} className="flex items-center text-xs text-dark_300 gap-1">
                    {isValid ? (
                      <TickCircle size="12" color="#4CAF50" />
                    ) : (
                      <CloseCircle size="12" color="#F44336" />
                    )}
                    {text}
                  </li>
                );
              })}
            </ul>
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
