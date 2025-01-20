import { DocumentUpload } from "iconsax-react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../../../components/FormComponents/Button";
import TextInputField from "../../../../components/FormComponents/InputField";
import CustomSelect from "../../../../components/FormComponents/SelectInputField";
import TextAreaField from "../../../../components/FormComponents/TextareaInput";
import ModalPopup from "../../../../components/ModalPopup";
import useOpenCloseModal from "../../../../hooks/useOpenCloseModal";
import SignupSuccess from "../../../components/SignupSuccess";
import DateTimePicker from "../../../../components/FormComponents/DateTimePicker";
import DescriptionBar from "../../../../components/DescriptionBar";

export default function AddEvents() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();

  const addEventSchema = Yup.object().shape({
    event_image: Yup.mixed().required("Image is required"),
    event_name: Yup.string().required("Name is required"),
    venue_type: Yup.string().required("Venue type is required"),
    location: Yup.string().required("Location is required"),
    start_date_time: Yup.date()
      .min(new Date(), "Date cannot be in the past")
      .required("Start date and time is required"),
    end_date_time: Yup.date()
      .min(new Date(), "Date cannot be in the past")
      .required("End date and time is required"),
    event_privacy: Yup.string().required("Event privacy is required"),
    event_type: Yup.string().required("Event type is required"),
    event_description: Yup.string().required("Event description is required"),
    organizer_phone_number: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only digits") // Ensures only digits
      .min(11, "Phone number must be at least 10 digits") // Adjust as needed
      .max(15, "Phone number cannot exceed 15 digits") // Adjust as needed
      .required("Phone number is required"), // Required field
  });

  return (
    <div className="w-full h-full">
      <DescriptionBar text=" Event vibes loading—fill out the form to get started! 🌟" />
      <div className="lg:w-2/5 w-full p-3 bg-white min-h-[500px] h-auto rounded-xl shadow">
        <Formik
          validationSchema={addEventSchema}
          initialValues={{
            event_image: null,
            event_name: "",
            venue_type: "",
            location: "",
            start_date_time: null,
            end_date_time: null,
            event_privacy: "",
            event_type: "",
            event_description: "",
            organizer_phone_number: "",
          }}
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
            setFieldValue,
            values,
            touched,
            errors,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit} className="w-full">
              <div className="mb-2 w-full">
                <label
                  htmlFor="event_image"
                  className="text-xs text-dark_200 leading-5 mb-2"
                >
                  Event Image
                  <input
                    type="file"
                    name="event_image"
                    id="event_image"
                    accept=".jpg, .png, jpeg"
                    className="h-[52px] w-full outline-none px-4"
                    onChange={(e) =>
                      setFieldValue("event_image", e.target.files?.[0])
                    }
                  />
                  {values?.event_image ? (
                    <div className="cursor-pointer w-full h-[190px] relative">
                      <img
                        alt="upload"
                        src={window.URL.createObjectURL(values?.event_image)}
                        className="w-full h-full object-cover"
                      />
                      <div className="bg-white text-dark_200 text-xs font-normal px-3 py-2 rounded-full flex justify-center items-center gap-3 absolute -bottom-2 left-0">
                        <DocumentUpload size="20" color="#0E0416" /> Change
                        Image
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-[140px] bg-grey_500 border border-border_color rounded-lg cursor-pointer flex flex-col gap-1 justify-center items-center px-6">
                      <DocumentUpload size="32" color="#0E0416" />
                      <h3 className="text-grey_100 text-xs leading-4 font-normal text-center">
                        Drag or drop image
                      </h3>
                      <h3 className="text-dark_200 text-xs leading-4 font-normal text-center">
                        Recommended dimension: 930px x 1163px
                      </h3>
                      <h3 className="text-dark_200 text-xs leading-4 font-normal text-center">
                        Max file size: 1mb
                      </h3>
                    </div>
                  )}
                </label>
                {errors.event_image && touched.event_image ? (
                  <div className="text-xs text-red_100">
                    {errors.event_image}
                  </div>
                ) : null}
              </div>
              <div className="mb-2">
                <TextInputField
                  labelName="Event Name"
                  name="event_name"
                  handleChange={handleChange}
                  type="text"
                  placeholder=""
                  value={values.event_name}
                  errors={errors?.event_name}
                  touched={touched?.event_name}
                />
              </div>
              <div className="mb-2">
                <CustomSelect
                  label="Event Venue Type"
                  name="venue_type"
                  onChange={(event) =>
                    setFieldValue("venue_type", event?.value)
                  }
                  options={[
                    { label: "Physical", value: "physical" },
                    { label: "Virtual", value: "virtual" },
                  ]}
                  errors={errors?.venue_type}
                  touched={touched?.venue_type}
                />
              </div>
              <div className="mb-2">
                <TextInputField
                  labelName="Location (Address or Virtual Link)"
                  name="location"
                  handleChange={handleChange}
                  type="text"
                  placeholder=""
                  value={values.location}
                  errors={errors?.location}
                  touched={touched?.location}
                />
              </div>
              <div className="w-full flex gap-3 md:flex-row flex-col">
                <div className="mb-2 w-full">
                  <DateTimePicker
                    labelName="Start Date & Time"
                    name="start_date_time"
                    value={values.start_date_time}
                    onChange={(date) => setFieldValue("start_date_time", date)}
                    showTime={true}
                    minDate={new Date()}
                    errors={errors?.start_date_time}
                    touched={touched?.start_date_time}
                  />
                </div>
                <div className="mb-2 w-full">
                  <DateTimePicker
                    labelName="End Date & Time"
                    name="end_date_time"
                    value={values?.end_date_time}
                    onChange={(date) => setFieldValue("end_date_time", date)}
                    showTime={true}
                    minDate={new Date()}
                    errors={errors?.end_date_time}
                    touched={touched?.end_date_time}
                  />
                </div>
              </div>

              <div className="w-full flex gap-3 md:flex-row flex-col">
                <div className="mb-2 w-full">
                  <CustomSelect
                    label="Event Privacy"
                    name="event_privacy"
                    onChange={(event) =>
                      setFieldValue("event_privacy", event?.value)
                    }
                    options={[
                      { label: "Public", value: "public" },
                      { label: "Private", value: "private" },
                    ]}
                    errors={errors?.event_privacy}
                    touched={touched?.event_privacy}
                  />
                </div>
                <div className="mb-2 w-full">
                  <CustomSelect
                    label="Event Type"
                    name="event_type"
                    onChange={(event) =>
                      setFieldValue("event_type", event?.value)
                    }
                    options={[
                      { label: "Paid", value: "paid" },
                      { label: "Free", value: "free" },
                    ]}
                    errors={errors?.event_type}
                    touched={touched?.event_type}
                  />
                </div>
              </div>
              <div className="mb-2">
                <TextAreaField
                  labelName="Event Details"
                  name="event_description"
                  handleChange={handleChange}
                  type="text"
                  placeholder=""
                  value={values.event_description}
                  errors={errors?.event_description}
                  touched={touched?.event_description}
                />
              </div>
              <div className="mb-2">
                <TextInputField
                  labelName="Organizer Phone Number"
                  name="organizer_phone_number"
                  handleChange={handleChange}
                  type="text"
                  placeholder=""
                  value={values.organizer_phone_number}
                  errors={errors?.organizer_phone_number}
                  touched={touched?.organizer_phone_number}
                />
              </div>
              <div className="md:w-[30%] w-full">
                <Button
                  title="Create Event"
                  className="w-full h-[40px] text-center my-6 border border-dark_200"
                  type="submit"
                  isLoading={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ModalPopup isOpen={isOpenModal}>
        <SignupSuccess
          text="Woohoo! You just created an event! 🎊✨"
          buttonText="Proceed to create ticket"
          handleOpenClose={handleOpenClose}
          handleFunction={{}}
        />
      </ModalPopup>
    </div>
  );
}
