/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import Button from "../../../components/FormComponents/Button";
import TextInputField from "../../../components/FormComponents/InputField";
import { ticketValidationSchema } from "../../../form-schemas";
import CustomSelect from "../../../components/FormComponents/SelectInputField";

export default function TicketIdEntry({
  eventReference,
  email,
  handleValidateTickets,
}: any) {
  return (
    <div className="lg:w-2/5 w-full bg-white p-4 rounded-xl">
      <Formik
        initialValues={{
          ticketNumber: "",
          validationCategory: "",
        }}
        validationSchema={ticketValidationSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          const { ticketNumber, validationCategory } = values;
          const payload = {
            eventReference,
            ticketNumber,
            validationCategory,
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
          setFieldValue,
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
            <CustomSelect
              label="Select Ticket Category"
              name="validationCategory"
              onChange={(event) => {
                setFieldValue("validationCategory", event?.value);
              }}
              options={[
                { label: "TicketBuyer", value: "TicketBuyer" },
                { label: "Guest", value: "Guest" },
              ]}
              errors={errors?.validationCategory}
              touched={touched?.validationCategory}
              defaultValue={values?.validationCategory}
              value={values?.validationCategory}
            />
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
