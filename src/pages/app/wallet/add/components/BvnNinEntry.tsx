import { Form, Formik } from "formik";
import DescriptionBar from "../../../../../components/DescriptionBar";
import { addBvnNinSchema } from "../../../../../form-schemas";
import Button from "../../../../../components/FormComponents/Button";
import TextInputField from "../../../../../components/FormComponents/InputField";

type BvnNinEntryProps = {
  handleChangeStep: (
    nextPath: "bvn_nin" | "transaction_pin",
    data: object
  ) => void;
};

export default function BvnNinEntry({ handleChangeStep }: BvnNinEntryProps) {
  return (
    <div className="w-full h-full">
      <DescriptionBar text="We promise it’s safe—just keeping things legit! 🔒✨" />
      <div className="lg:w-2/5 w-full p-3 bg-white min-h-auto h-auto rounded-xl shadow">
        <Formik
          validationSchema={addBvnNinSchema}
          initialValues={{
            bvn: "",
            nin: "",
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            actions.resetForm();
            handleChangeStep("transaction_pin", values);
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
            <Form onSubmit={handleSubmit} className="w-full">
              <div className="mb-2">
                <TextInputField
                  labelName="Bank Verification Number (BVN)"
                  name="bvn"
                  handleChange={handleChange}
                  type="tel"
                  placeholder=""
                  value={values.bvn}
                  errors={errors?.bvn}
                  touched={touched?.bvn}
                />
              </div>
              <div className="mb-2">
                <TextInputField
                  labelName="National Identification Number (NIN)"
                  name="nin"
                  handleChange={handleChange}
                  type="tel"
                  placeholder=""
                  value={values.nin}
                  errors={errors?.nin}
                  touched={touched?.nin}
                />
              </div>
              <div className="">
                <Button
                  title="Next"
                  className="px-4 h-[40px] text-center my-6 border border-dark_200"
                  type="submit"
                  isLoading={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
