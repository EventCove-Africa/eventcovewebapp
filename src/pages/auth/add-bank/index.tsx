import { Form, Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import { animationVariants } from "../../../utils";
import ModalPopup from "../../../components/ModalPopup";
import SignupSuccess from "../components/SignupSuccess";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";

export default function AddBank() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
 
  const loginSchema = Yup.object().shape({
    account_number: Yup.string().required("Account number is required"),
    bank_name: Yup.string().required("Bank name is required"),
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
        You’re so close! Slide in your account deets to finish up. 🚀
      </h3>
      <Formik
        initialValues={{
          account_number: "",
          bank_name: "",
        }}
        validationSchema={loginSchema}
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
            <div className="mb-3">
              <TextInputField
                labelName="Bank name"
                name="bank_name"
                handleChange={handleChange}
                type="text"
                placeholder=""
                value={values.bank_name}
                errors={errors?.bank_name}
                touched={touched?.bank_name}
              />
            </div>
            <div className="mb-3">
              <TextInputField
                labelName="Account Number"
                name="account_number"
                handleChange={handleChange}
                type="text"
                placeholder=""
                value={values.account_number}
                errors={errors?.account_number}
                touched={touched?.account_number}
              />
            </div>
            <Button
              title="proceed"
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
