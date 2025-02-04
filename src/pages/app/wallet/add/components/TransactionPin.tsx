import { Form, Formik } from "formik";
import { motion } from "framer-motion";
import DescriptionBar from "../../../../../components/DescriptionBar";
import { createPinSchema } from "../../../../../form-schemas";
import Button from "../../../../../components/FormComponents/Button";
import PasswordInputField from "../../../../../components/FormComponents/PasswordField";
import { animationVariants } from "../../../../../utils";

type TransactionPinProps = {
  handleChangeStep: (
    nextPath: "bvn_nin" | "transaction_pin",
    data: object
  ) => void;
  handleOpenClose: (status?: boolean) => void;
};

export default function TransactionPin({
  handleChangeStep,
  handleOpenClose,
}: TransactionPinProps) {
  return (
    <motion.div
      transition={{ duration: 0.4 }}
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Optional for exit animations
    >
      <div className="w-full h-full">
        <DescriptionBar text="👀 Hold up, bestie! Enter your Transaction PIN to keep it 💯 secure. 🔒" />
        <div className="lg:w-2/5 w-full p-3 bg-white min-h-auto h-auto rounded-xl shadow">
          <Formik
            validationSchema={createPinSchema}
            initialValues={{
              pin: "",
              confirm_pin: "",
            }}
            enableReinitialize
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
              actions.resetForm();
              handleChangeStep("transaction_pin", values);
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
              <Form onSubmit={handleSubmit} className="">
                <div className="mb-1">
                  <PasswordInputField
                    labelName="Enter PIN"
                    name="pin"
                    type="tel"
                    handleChange={handleChange}
                    placeholder="****"
                    value={values.pin}
                    errors={errors?.pin}
                    touched={touched?.pin}
                  />
                </div>
                <div className="mb-1">
                  <PasswordInputField
                    labelName="Enter PIN"
                    name="confirm_pin"
                    type="tel"
                    handleChange={handleChange}
                    placeholder="****"
                    value={values.confirm_pin}
                    errors={errors?.confirm_pin}
                    touched={touched?.confirm_pin}
                  />
                </div>
                <div className="">
                  <Button
                    title="Next"
                    className="px-8 h-[40px] text-center my-6 border border-dark_200"
                    type="submit"
                    isLoading={isSubmitting}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </motion.div>
  );
}
