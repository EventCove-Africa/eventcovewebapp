/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import { ticketValidationSchema } from "../../../form-schemas";

export default function TicketIdEntry({
  eventId,
  email,
  handleValidateTickets,
}: any) {
  return (
    <div className="lg:w-2/5 w-full bg-white p-4 rounded-xl">
      <Formik
        initialValues={{
          ticketNumber: "",
        }}
        validationSchema={ticketValidationSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          const { ticketNumber } = values;
          const payload = {
            eventId,
            ticketNumber,
            email,
          };
          handleValidateTickets(payload, actions);
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
                name="ticketNumber"
                handleChange={handleChange}
                type="text"
                placeholder=""
                value={values?.ticketNumber}
                errors={errors?.ticketNumber}
                touched={touched?.ticketNumber}
              />
            </div>
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
