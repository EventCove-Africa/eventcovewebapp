/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import { ticketValidationSchema } from "../../../form-schemas";

export default function TicketIdEntry({ handleOpenClose }: any) {
  return (
    <div className="lg:w-2/5 w-full bg-white p-4 rounded-xl">
      <Formik
        initialValues={{
          ticked_id: "",
          // reference_number: "",
        }}
        validationSchema={ticketValidationSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
          actions.resetForm()
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
          <Form onSubmit={handleSubmit} className="w-full mt-1">
            <div className="mb-3">
              <TextInputField
                labelName="Input Ticket ID"
                name="ticked_id"
                handleChange={handleChange}
                type="text"
                placeholder=""
                value={values?.ticked_id}
                errors={errors?.ticked_id}
                touched={touched?.ticked_id}
              />
            </div>
            {/* <div className="mb-1">
              <TextInputField
                labelName="Reference Number"
                name="reference_number"
                handleChange={handleChange}
                type="text"
                placeholder=""
                value={values?.reference_number}
                errors={errors?.reference_number}
                touched={touched?.reference_number}
              />
            </div> */}
            <div>
              <Button
                title="Proceed"
                className="h-[40px] text-center my-6 border border-dark_200"
                type="submit"
                isLoading={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
