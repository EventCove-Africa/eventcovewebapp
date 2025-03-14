import { Form, Formik } from "formik";
import Button from "../../../../components/FormComponents/Button";
import PasswordInputField from "../../../../components/FormComponents/PasswordField";
import { resetPasswordSchema } from "../../../../form-schemas";

export default function SettingsPassword() {
  return (
    <Formik
      initialValues={{
        old_password: "",
        password: "",
        confirm_password: "",
      }}
      validationSchema={resetPasswordSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        console.log(values);
        actions.setSubmitting(false);
        actions.resetForm();
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
          <div className="mb-1">
            <PasswordInputField
              labelName="Old Password"
              name="old_password"
              handleChange={handleChange}
              placeholder="**********"
              value={values.old_password}
              errors={errors?.old_password}
              touched={touched?.old_password}
            />
          </div>
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
