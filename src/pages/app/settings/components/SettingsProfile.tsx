import { Form, Formik } from "formik";
import Button from "../../../../components/FormComponents/Button";
import TextInputField from "../../../../components/FormComponents/InputField";
import { updateProfileSchema } from "../../../../form-schemas";

export default function SettingsProfile() {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      }}
      validationSchema={updateProfileSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        console.log(values);
        actions.setSubmitting(false);
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
          <div className="mb-3">
            <TextInputField
              labelName="First Name"
              name="firstName"
              handleChange={handleChange}
              type="text"
              placeholder=""
              value={values.firstName}
              errors={errors?.firstName}
              touched={touched?.firstName}
            />
          </div>
          <div className="mb-3">
            <TextInputField
              labelName="Last Name"
              name="lastName"
              handleChange={handleChange}
              type="text"
              placeholder=""
              value={values.lastName}
              errors={errors?.lastName}
              touched={touched?.lastName}
            />
          </div>
          <div className="mb-3">
            <TextInputField
              labelName="Email"
              name="email"
              handleChange={handleChange}
              type="email"
              placeholder=""
              value={values.email}
              errors={errors?.email}
              touched={touched?.email}
              readOnly
            />
          </div>
          <div className="mb-3">
            <TextInputField
              labelName="Phone Number"
              name="phoneNumber"
              handleChange={handleChange}
              type="tel"
              placeholder=""
              value={values.phoneNumber}
              errors={errors?.phoneNumber}
              touched={touched?.phoneNumber}
            />
          </div>
          <div className="w-full flex justify-end">
            <Button
              title="Update"
              className="h-[40px] md:w-auto w-full text-center my-6 border border-dark_200"
              type="submit"
              isLoading={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
}
