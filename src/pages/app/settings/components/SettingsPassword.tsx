/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers } from "formik";
import Button from "../../../../components/FormComponents/Button";
import PasswordInputField from "../../../../components/FormComponents/PasswordField";
import { resetPasswordSchema } from "../../../../form-schemas";
import toast from "react-hot-toast";
import { _handleThrowErrorMessage } from "../../../../utils";
import { api } from "../../../../services/api";
import { appUrls } from "../../../../services/urls";

export default function SettingsPassword() {
  const handleChangePassword = async (
    payload: any,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(
        appUrls.PROFILE_URL + "/change/password",
        payload
      );
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const message = res?.data?.data ?? null;
        toast.success(message);
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
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirm_password: "",
      }}
      validationSchema={resetPasswordSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        handleChangePassword(values, actions);
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
              name="oldPassword"
              handleChange={handleChange}
              placeholder="**********"
              value={values.oldPassword}
              errors={errors?.oldPassword}
              touched={touched?.oldPassword}
            />
          </div>
          <div className="mb-1">
            <PasswordInputField
              labelName="New Password"
              name="newPassword"
              handleChange={handleChange}
              placeholder="**********"
              value={values.newPassword}
              errors={errors?.newPassword}
              touched={touched?.newPassword}
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
