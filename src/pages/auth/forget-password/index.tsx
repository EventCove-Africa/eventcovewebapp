import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import { animationVariants } from "../../../utils";
import { ArrowLeft } from "iconsax-react";
import useOpenCloseModal from "../../../hooks/useOpenCloseModal";
import ModalPopup from "../../../components/ModalPopup";
import InfoModal from "../../components/InfoModal";
import useNavigation from "../../../hooks/useNavigation";
import { forgetPasswordSchema } from "../../../form-schemas";

export default function ForgetPassword() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const { navigate } = useNavigation();

  return (
    <motion.main
      className="w-full h-full flex lg:justify-center items-center flex-col"
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Optional for exit animations
    >
      <h3 className="self-start text-dark_200 font-bold lg:text-3xl text-xl">
        Slide in your email 📨
      </h3>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={forgetPasswordSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          actions.resetForm();
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
            <Button
              title="Submit"
              className="w-full h-[40px] text-center my-6 border border-dark_200"
              type="submit"
              isLoading={isSubmitting}
            />
            <h4
              onClick={() => navigate("/auth/login")}
              className="text-sm font-normal text-grey_100 flex gap-1 cursor-pointer"
            >
              <ArrowLeft size="32" color="#767779" className="w-5 h-5" />
              Back to previous
            </h4>
          </Form>
        )}
      </Formik>
      <ModalPopup isOpen={isOpenModal}>
        <InfoModal
          handleOpenClose={handleOpenClose}
          text="Hop over to your email and hit the link! 🔗"
        />
      </ModalPopup>
    </motion.main>
  );
}
