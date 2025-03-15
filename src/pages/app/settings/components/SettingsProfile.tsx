/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers } from "formik";
import Button from "../../../../components/FormComponents/Button";
import TextInputField from "../../../../components/FormComponents/InputField";
import { updateProfileSchema } from "../../../../form-schemas";
import { _handleThrowErrorMessage } from "../../../../utils";
import toast from "react-hot-toast";
import { api } from "../../../../services/api";
import { appUrls } from "../../../../services/urls";
import { useUser } from "../../../../context/UserDetailsProvider.tsx";
import { useUserProps } from "../../../../types";

type UpdateProfleProp = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export default function SettingsProfile() {
  const { userDetails, handleGetUserDetails } = useUser() as useUserProps;
  const [firstName, lastName] = userDetails?.fullName.split?.(" ");

  const handleUpdateProfile = async (
    payload: UpdateProfleProp,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(appUrls.PROFILE_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const message = res?.data?.data ?? null;
        toast.success(message);
        actions.resetForm();
        handleGetUserDetails();
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
        firstName: firstName || "",
        lastName: lastName || "",
        email: userDetails?.email || "",
        phoneNumber: "",
      }}
      validationSchema={updateProfileSchema}
      enableReinitialize
      onSubmit={(values, actions) => {
        const { phoneNumber, lastName, firstName } = values;
        const payload = {
          firstName,
          lastName,
          phoneNumber,
        };
        handleUpdateProfile(payload, actions);
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
              type="email"
              value={values.email}
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
