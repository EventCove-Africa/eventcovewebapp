/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add, CloseCircle, DocumentUpload } from "iconsax-react";
import { Form, Formik, FormikHelpers } from "formik";
import Button from "../../../../components/FormComponents/Button";
import TextInputField from "../../../../components/FormComponents/InputField";
import CustomSelect from "../../../../components/FormComponents/SelectInputField";
import TextAreaField from "../../../../components/FormComponents/TextareaInput";
import ModalPopup from "../../../../components/ModalPopup";
import useOpenCloseModal from "../../../../hooks/useOpenCloseModal";
import SignupSuccess from "../../../components/SignupSuccess";
import DateTimePicker from "../../../../components/FormComponents/DateTimePicker";
import DescriptionBar from "../../../../components/DescriptionBar";
import { addEventSchema } from "../../../../form-schemas";
import useEventHook from "../../../../hooks/useEventHook";
import useLocationHook from "../../../../hooks/useLocationsHook";
import toast from "react-hot-toast";
import {
  _handleThrowErrorMessage,
  convertDateTimeRangeForEventCreation,
  formatDateTimeToStringDATE,
  handleImageUpload,
  isArrayEmpty,
} from "../../../../utils";
import { api } from "../../../../services/api";
import { appUrls } from "../../../../services/urls";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useImageFile from "../../../../hooks/useImageFile";

type AddEventProps = {
  eventName: string;
  eventVenueType: string;
  eventImageUrl: any;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventPrivacy: string;
  eventCategory: string;
  eventDescription: string;
  phoneNumber: string;
  city: string;
  location: string;
};

type AddTeamMembersProps = {
  eventId: string;
  emails: string[];
};

export default function AddEvents() {
  const {
    handleGetEventDetails,
    allEventDetails,
    loadingEventDetails,
    handleGetEventTeamMembers,
    eventTeamMembers,
  } = useEventHook();
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const navigate = useNavigate();
  const { event_id } = useParams();
  const { categories, fetchEventCategories } = useEventHook();
  const { cities } = useLocationHook();
  const [eventId, setEventId] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isBannerChanged, setIsBannerChanged] = useState(false);
  const callUploadToCloudDuringEdit = event_id && isBannerChanged;
  const start_date_time = event_id
    ? formatDateTimeToStringDATE(
        allEventDetails?.startDate,
        allEventDetails?.startTime
      )
    : null;
  const end_date_time = event_id
    ? formatDateTimeToStringDATE(
        allEventDetails?.endDate,
        allEventDetails?.endTime
      )
    : null;
  const imageSrc = useImageFile(allEventDetails?.eventImageUrl);

  const eventVenueTypes = [
    { label: "Physical", value: "Physical" },
    { label: "Virtual", value: "Virtual" },
    { label: "Hybrid", value: "Hybrid" },
  ];

  const extractEmails = (data: any) => data?.map((item: any) => item?.email);

  const _handleCreateEvent = async (
    data: AddEventProps,
    teamMemberPayload: any,
    actions: FormikHelpers<any>
  ) => {
    setIsCreating(true);
    let eventImageUrl;
    if (callUploadToCloudDuringEdit) {
      eventImageUrl = await handleImageUpload(data?.eventImageUrl);
    } else if (!event_id) {
      eventImageUrl = await handleImageUpload(data?.eventImageUrl);
    } else {
      eventImageUrl = allEventDetails?.eventImageUrl;
    }
    const payload = {
      ...data,
      eventImageUrl,
    };
    const path = event_id ? "/edit" : "";
    try {
      const res = await api.post(appUrls.EVENT_URL + `${path}`, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        const eventId = res?.data?.data?.eventId ?? null;
        setEventId(eventId);
        if (
          !isArrayEmpty(teamMemberPayload?.email_list) ||
          teamMemberPayload?.email
        ) {
          const emails = extractEmails(teamMemberPayload?.email_list);
          const emailString = teamMemberPayload?.email
            ? teamMemberPayload?.email
            : undefined;
          const addTeamData = {
            eventId,
            emails: [...emails, emailString],
          };
          _handleAddTeamMembers(addTeamData, actions);
        } else {
          actions.resetForm();
          handleOpenClose();
          setIsCreating(false);
        }
        if (path) {
          handleGetEventDetails(event_id);
        }
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
      actions.setSubmitting(false);
      setIsCreating(false);
    }
  };

  const _handleAddTeamMembers = async (
    payload: AddTeamMembersProps,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(appUrls.EVENT_URL + "/add/member", payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        actions.resetForm();
        handleOpenClose();
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
    } finally {
      actions.setSubmitting(false);
      setIsCreating(false);
    }
  };

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted) {
        fetchEventCategories();
      }
    })();
    return () => {
      mounted = false;
    };
  }, [fetchEventCategories]);

  useEffect(() => {
    let mounted = false;
    (async () => {
      mounted = true;
      if (mounted && event_id) {
        handleGetEventDetails(event_id);
        handleGetEventTeamMembers(event_id);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [event_id]);

  return (
    <div className="w-full h-full">
      <DescriptionBar text="Fill out the form to get started! 🌟" />
      <Formik
        validationSchema={addEventSchema}
        initialValues={{
          eventImageUrl: imageSrc || null,
          eventName: allEventDetails?.eventName || "",
          eventCategory: allEventDetails?.eventCategory || "",
          city: allEventDetails?.city || "Others",
          email: "",
          slug: allEventDetails?.slug || "",
          email_list: [],
          eventVenueType: allEventDetails?.eventVenueType || "",
          location: allEventDetails?.location || "",
          start_date_time,
          end_date_time,
          eventPrivacy: allEventDetails?.eventPrivacy || "",
          eventDescription: allEventDetails?.eventDescription || "",
          phoneNumber: allEventDetails?.phoneNumber || "",
        }}
        enableReinitialize
        onSubmit={async (values, actions) => {
          const { start_date_time, end_date_time, email, email_list, ...rest } =
            values;
          const { startDate, endDate, startTime, endTime }: any =
            convertDateTimeRangeForEventCreation(
              start_date_time,
              end_date_time
            );
          const data = {
            ...rest,
            eventId: event_id ? event_id : undefined,
            startDate,
            endDate,
            startTime,
            endTime,
          };
          const teamMemberPayload = {
            email,
            email_list,
          };
          _handleCreateEvent(data, teamMemberPayload, actions);
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
        }) => {
          const removeItemFromAllValues = (idToRemove: number) => {
            const updatedValues = values.email_list.filter(
              (item: any) => item.id !== idToRemove
            );
            setFieldValue("email_list", updatedValues);
          };

          const addEmailToList = () => {
            if (values?.email == "") return;
            const nextId =
              values.email_list.length > 0
                ? Math.max(
                    ...values.email_list.map((item: any) => item.id ?? 0)
                  ) + 1
                : 1;
            setFieldValue("email_list", [
              ...values.email_list,
              { id: nextId, email: values.email }, // Add numeric id
            ]);
            setFieldValue("email", "");
          };

          return (
            <Form
              onSubmit={handleSubmit}
              className="w-full flex lg:flex-row flex-col-reverse md:gap-6 gap-3"
            >
              <div className="w-full p-3 bg-white min-h-[500px] h-auto rounded-xl shadow">
                <div className="mb-2 w-full">
                  <label
                    htmlFor="eventImageUrl"
                    className="text-xs text-dark_200 leading-5 mb-2"
                  >
                    Event Image
                    <input
                      type="file"
                      name="eventImageUrl"
                      id="eventImageUrl"
                      accept=".jpg, .png, .jpeg"
                      className="h-[52px] w-full outline-none px-4"
                      onChange={(e) => {
                        setFieldValue("eventImageUrl", e.target.files?.[0]);
                        setIsBannerChanged(!isBannerChanged);
                      }}
                    />
                    {values?.eventImageUrl ? (
                      <div className="cursor-pointer w-full h-[190px] relative">
                        <img
                          alt="upload"
                          src={window.URL.createObjectURL(
                            values?.eventImageUrl
                          )}
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
                        {/* <h3 className="text-dark_200 text-xs leading-4 font-normal text-center">
                          Recommended dimension: 1200px x 600px
                        </h3> */}
                        <h3 className="text-dark_200 text-xs leading-4 font-normal text-center">
                          Note: Max file size: 5mb
                        </h3>
                      </div>
                    )}
                  </label>
                  {errors.eventImageUrl && touched.eventImageUrl ? (
                    <div className="text-xs text-red_100 flex justify-end">
                      {errors.eventImageUrl}
                    </div>
                  ) : null}
                </div>
                <div className="mb-2">
                  <TextInputField
                    labelName="Event Name"
                    name="eventName"
                    handleChange={handleChange}
                    type="text"
                    placeholder=""
                    value={values.eventName}
                    errors={errors?.eventName}
                    touched={touched?.eventName}
                  />
                </div>
                <div className="w-full flex gap-3 md:flex-row flex-col">
                  <div className="mb-2 w-full">
                    <CustomSelect
                      label="Venue Type"
                      name="eventVenueType"
                      onChange={(event) => {
                        if (event?.value.toLocaleLowerCase() !== "physical") {
                          setFieldValue("city", "Others");
                        } else {
                          setFieldValue("city", values?.city);
                        }
                        setFieldValue("eventVenueType", event?.value);
                      }}
                      options={eventVenueTypes}
                      errors={errors?.eventVenueType}
                      touched={touched?.eventVenueType}
                      defaultValue={values?.eventVenueType}
                      value={values?.eventVenueType}
                    />
                  </div>
                  <div className="mb-2 w-full">
                    <CustomSelect
                      label="Category"
                      name="eventCategory"
                      onChange={(event) =>
                        setFieldValue("eventCategory", event?.value)
                      }
                      options={categories}
                      errors={errors?.eventVenueType}
                      touched={touched?.eventVenueType}
                      defaultValue={values?.eventCategory}
                      value={values?.eventCategory}
                    />
                  </div>
                </div>
                {values?.eventVenueType === "Physical" && (
                  <div className="mb-2 w-full">
                    <CustomSelect
                      label="Cities"
                      name="city"
                      onChange={(event) => setFieldValue("city", event?.value)}
                      options={cities}
                      errors={errors?.city}
                      touched={touched?.city}
                      defaultValue={values?.city}
                      value={values?.city}
                    />
                  </div>
                )}
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
                <label
                  htmlFor="slug"
                  className={`text-xs text-dark_200 leading-5 flex items-center`}
                >
                  Use Custom URL
                </label>
                <div className={`flex border rounded-md overflow-hidden`}>
                  <span className="bg-gray-100 text-gray-700 px-3 py-2 text-sm flex items-center whitespace-nowrap">
                    eventcove.africa/events/
                  </span>
                  <TextInputField
                    name="slug"
                    handleChange={handleChange}
                    type="text"
                    placeholder=""
                    value={values.slug}
                    inputClassName="border-none"
                  />
                </div>
                {errors.slug && touched.slug ? (
                  <div className="text-xs text-red font-medium text-red-500 mb-3">
                    {typeof errors.slug === "string"
                      ? errors.slug
                      : Array.isArray(errors.slug)
                      ? errors.slug.join(", ")
                      : ""}
                  </div>
                ) : null}
                <div className="w-full flex gap-3 mt-3 md:flex-row flex-col">
                  <div className="mb-2 w-full">
                    <DateTimePicker
                      labelName="Start Date & Time"
                      name="start_date_time"
                      value={
                        values.start_date_time
                          ? new Date(values.start_date_time)
                          : null
                      }
                      onChange={(date) =>
                        setFieldValue("start_date_time", date)
                      }
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
                      value={
                        values.end_date_time
                          ? new Date(values.end_date_time)
                          : null
                      }
                      onChange={(date) => setFieldValue("end_date_time", date)}
                      showTime={true}
                      minDate={new Date()}
                      errors={errors?.end_date_time}
                      touched={touched?.end_date_time}
                    />
                  </div>
                </div>
                <div className="mb-2 w-full">
                  <CustomSelect
                    label="Event Privacy"
                    name="eventPrivacy"
                    onChange={(event) =>
                      setFieldValue("eventPrivacy", event?.value)
                    }
                    options={[
                      { label: "Public", value: "Public" },
                      { label: "Private", value: "Private" },
                    ]}
                    errors={errors?.eventPrivacy}
                    touched={touched?.eventPrivacy}
                    defaultValue={values.eventPrivacy}
                    value={values.eventPrivacy}
                  />
                </div>
                <div className="mb-2">
                  <TextAreaField
                    labelName="Event Details"
                    name="eventDescription"
                    handleChange={handleChange}
                    type="text"
                    placeholder=""
                    value={values.eventDescription}
                    errors={errors?.eventDescription}
                    touched={touched?.eventDescription}
                  />
                </div>
                <div className="mb-2">
                  <TextInputField
                    labelName="Organizer Phone Number"
                    name="phoneNumber"
                    handleChange={handleChange}
                    type="tel"
                    placeholder="080XXXXXXXX"
                    value={values.phoneNumber}
                    errors={errors?.phoneNumber}
                    touched={touched?.phoneNumber}
                  />
                </div>
                <div className="md:w-[30%] w-full">
                  <Button
                    title={event_id ? "Edit Event" : "Create Event"}
                    className="w-full h-[40px] text-center my-6 border border-dark_200"
                    type="submit"
                    isLoading={isSubmitting || isCreating}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="w-full p-3 bg-white min-h-[100px] h-fit rounded-xl shadow">
                  <h4 className="text-dark_200 font-bold md:text-base text-sm">
                    Add team members to this event{" "}
                    <span className="text-grey_100">(optional)</span>
                  </h4>
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
                      onKeyPress={(
                        e: React.KeyboardEvent<HTMLInputElement>
                      ) => {
                        if (e?.code.toLowerCase() === "enter") {
                          e.preventDefault(); // Prevent form submission
                          addEmailToList();
                        }
                      }}
                    />
                  </div>
                  <div className="flex gap-3 items-center flex-wrap">
                    {[...values.email_list]?.map((d: any) => {
                      return (
                        <div
                          key={d?.id}
                          className="px-3 py-2 text-grey_100 border border-pink_200 bg-pink_100 rounded-md flex gap-4 items-center justify-between text-xs"
                        >
                          {d.email}
                          <CloseCircle
                            size="13"
                            color="#767779"
                            variant="Bold"
                            className="cursor-pointer"
                            onClick={() => removeItemFromAllValues(d?.id)}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 w-full flex justify-end">
                    <button
                      type="button"
                      className="bg-primary_300 px-3 py-2 flex gap-2 text-primary_100 text-xs rounded-md"
                      onClick={addEmailToList}
                    >
                      <Add size="16" color="#A30162" />
                      Add More
                    </button>
                  </div>
                </div>
                {!isArrayEmpty(eventTeamMembers) &&
                  event_id &&
                  !loadingEventDetails?.event && (
                    <>
                      <h4 className="text-dark_200 font-bold md:text-base text-sm">
                        Existing Team members{" "}
                      </h4>
                      <div className="flex gap-3 items-center flex-wrap">
                        {eventTeamMembers?.map((d: any, id: number) => {
                          return (
                            <div
                              key={id}
                              className="px-3 py-2 text-grey_100 border font-semibold border-pink_200 bg-pink_100 rounded-md flex gap-4 items-center justify-between text-xs"
                            >
                              Email: {d.email} <br />
                              Password: {d.password}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
              </div>
            </Form>
          );
        }}
      </Formik>
      <ModalPopup isOpen={isOpenModal}>
        <SignupSuccess
          text={
            event_id
              ? "Event Edited Successfully 🎊✨"
              : "Event Created Successfully🎊✨"
          }
          buttonText={
            event_id && allEventDetails?.hasTicketType
              ? "View details"
              : "Proceed to create ticket"
          }
          handleOpenClose={handleOpenClose}
          handleFunction={() => {
            if (!allEventDetails?.hasTicketType)
              return navigate(`/app/tickets/add/${eventId}`, {
                state: eventId,
              });
            return navigate(-1);
          }}
          showCancel={false}
        />
      </ModalPopup>
    </div>
  );
}
