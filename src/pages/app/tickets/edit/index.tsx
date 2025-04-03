/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers } from "formik";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp2, Edit } from "iconsax-react";
import DescriptionBar from "../../../../components/DescriptionBar";
import ModalPopup from "../../../../components/ModalPopup";
import SignupSuccess from "../../../components/SignupSuccess";
import useOpenCloseModal from "../../../../hooks/useOpenCloseModal";
import CustomSelect from "../../../../components/FormComponents/SelectInputField";
import TextInputField from "../../../../components/FormComponents/InputField";
import DateTimePicker from "../../../../components/FormComponents/DateTimePicker";
import {
  _handleThrowErrorMessage,
  convertDateTimeRangeForEventCreation,
  formatDateTimeToStringDATE,
  handleNumberInput,
  parseNumber,
} from "../../../../utils";
import { editTicketSchema } from "../../../../form-schemas";
import { api } from "../../../../services/api";
import { appUrls } from "../../../../services/urls";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ToggleSwitch from "../../../../components/ToggleSwitch";

export default function EditTicket() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const { state } = useLocation();
  const eventId = state?.eventId;
  const sales_start_date_time = ticketId
    ? formatDateTimeToStringDATE(state?.startDate, state?.salesStartTime)
    : null;
  const sales_end_date_time = ticketId
    ? formatDateTimeToStringDATE(state?.endDate, state?.salesEndTime)
    : null;

  const _handleEditTicketForEvent = async (
    payload: any,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(appUrls.TICKET_URL + "/edit/single", payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        handleOpenClose();
      }
    } catch (error: any) {
      const err_message = _handleThrowErrorMessage(error?.data?.message);
      toast.error(err_message);
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <DescriptionBar text="✨Let's Edit your ticket real quick" />
        <Formik
          validationSchema={editTicketSchema}
          initialValues={{
            classification:
              state?.classification !== "N/A" ? state?.classification : "",
            category: state?.category !== "N/A" ? state?.category : "",
            name: state?.name !== "N/A" ? state?.name : "",
            price: state?.price !== "N/A" ? state?.price?.replace("₦", "") : "",
            capacity: state?.capacity !== "N/A" ? state?.capacity : "",
            colour: state?.colour !== "N/A" ? state?.colour : "",
            groupTicketLimit:
              state?.groupTicketLimit !== "N/A" ? state?.groupTicketLimit : "",
            purchaseLimit:
              state?.purchaseLimit !== "N/A" ? state?.purchaseLimit : "",
            perks: state?.perks !== "N/A" ? state?.perks : "",
            transferTransactionFeeToBuyer: state?.transferTransactionFeeToBuyer,
            sales_end_date_time,
            sales_start_date_time,
            ticket_details: false,
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            const {
              sales_end_date_time,
              sales_start_date_time,
              price,
              ...rest
            } = values;
            const {
              startDate: salesStartDate,
              endDate: salesEndDate,
              startTime: salesStartTime,
              endTime: salesEndTime,
            }: any = convertDateTimeRangeForEventCreation(
              sales_start_date_time,
              sales_end_date_time
            );
            const payload = {
              ticketTypeId: ticketId,
              eventId,
              salesStartDate,
              salesEndDate,
              salesStartTime,
              salesEndTime,
              price: parseNumber(price),
              ...rest,
            };
            _handleEditTicketForEvent(payload, actions);
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
            return (
              <Form onSubmit={handleSubmit} className="w-full">
                <div className="md:w-[50%] w-full px-3 pb-6 pt-3 bg-white h-fit rounded-xl shadow flex flex-col gap-3">
                  <div className="mb-2">
                    <TextInputField
                      labelName="Seat Name"
                      name="name"
                      handleChange={handleChange}
                      type="text"
                      placeholder=""
                      value={values.name}
                      errors={errors?.name}
                      touched={touched?.name}
                    />
                  </div>
                  <CustomSelect
                    label="Ticket Classification"
                    name="classification"
                    onChange={(event) => {
                      const isGroup = event?.value.toLowerCase() === "group";
                      setFieldValue("groupTicketLimit", isGroup ? "2" : "");
                      setFieldValue("classification", event?.value);
                    }}
                    options={[
                      { label: "Single", value: "Single" },
                      { label: "Group", value: "Group" },
                    ]}
                    errors={errors?.classification}
                    touched={touched?.classification}
                    defaultValue={values?.classification}
                    value={values?.classification}
                  />

                  {values?.classification.toLocaleLowerCase() === "group" && (
                    <div className="mb-2">
                      <TextInputField
                        labelName="Available seats"
                        name="groupTicketLimit"
                        handleChange={handleChange}
                        type="text"
                        placeholder=""
                        value={values.groupTicketLimit}
                        errors={errors?.groupTicketLimit}
                        touched={touched?.groupTicketLimit}
                        tooltipContent="Available seats by default is 2 persons, feel free to set your limit"
                      />
                    </div>
                  )}
                  <CustomSelect
                    label="Ticket Category"
                    name="category"
                    onChange={(event) => {
                      if (event?.value.toLowerCase() === "free") {
                        setFieldValue("transferTransactionFeeToBuyer", false);
                      } else {
                        setFieldValue("transferTransactionFeeToBuyer", true);
                      }
                      setFieldValue("category", event?.value);
                    }}
                    options={[
                      { label: "Paid", value: "Paid" },
                      { label: "Free", value: "Free" },
                    ]}
                    errors={errors?.category}
                    touched={touched?.category}
                    defaultValue={values?.category}
                    value={values?.category}
                  />
                  {values?.category === "Paid" && (
                    <div className="mb-2">
                      <TextInputField
                        labelName="Price"
                        name="price"
                        handleChange={(e: any) =>
                          setFieldValue(
                            "price",
                            handleNumberInput(e.target.value)
                          )
                        }
                        type="text"
                        placeholder=""
                        value={values.price}
                        errors={errors?.price}
                        touched={touched?.price}
                      />
                    </div>
                  )}
                  {/* Toogle button goes here  */}
                  {values?.category === "Paid" && (
                    <div className="w-full flex flex-col items-start">
                      <ToggleSwitch
                        labelName="Transfer Charges"
                        name="transferTransactionFeeToBuyer"
                        checked={values?.transferTransactionFeeToBuyer}
                        onChange={(checked) =>
                          setFieldValue(
                            "transferTransactionFeeToBuyer",
                            checked
                          )
                        }
                      />
                      <span
                        className={`text-xs text-dark_200 flex gap-1 items-center my-1`}
                      >
                        NB: Please note, if the toggle button is switched Off
                        the event organizer bears the cost of the charges
                      </span>
                    </div>
                  )}
                  <div
                    onClick={() =>
                      setFieldValue("ticket_details", !values.ticket_details)
                    }
                    className="w-full p-3 bg-pink_100 flex justify-between items-center rounded-md cursor-pointer"
                  >
                    <h3 className="text-dark_200 font-medium text-sm">
                      Click here to fill Other Details (optional)
                    </h3>
                    <div className="flex gap-3 items-center">
                      <motion.div
                        className="flex justify-center items-center"
                        animate={{ x: [-5, 5, -5] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.8,
                          ease: "easeInOut",
                        }}
                      >
                        <ArrowRight size="20" color="#767779" variant="Bold" />
                      </motion.div>
                      <ArrowUp2 size="20" color="#767779" variant="Bold" />
                    </div>
                  </div>
                  {values.ticket_details && (
                    <div className="w-full">
                      <div className="mb-2">
                        <TextInputField
                          labelName="Capacity (optional)"
                          name="capacity"
                          handleChange={(e: any) =>
                            setFieldValue(
                              "capacity",
                              handleNumberInput(e.target.value)
                            )
                          }
                          type="text"
                          placeholder=""
                          value={values.capacity}
                          errors={errors?.capacity}
                          touched={touched?.capacity}
                        />
                      </div>
                      <div className="mb-2">
                        <TextInputField
                          labelName="Colour (optional)"
                          name="colour"
                          handleChange={handleChange}
                          type="text"
                          placeholder=""
                          value={values.colour}
                          errors={errors?.colour}
                          touched={touched?.colour}
                        />
                      </div>
                      {values?.classification.toLocaleLowerCase() !==
                        "group" && (
                        <div className="mb-2">
                          <TextInputField
                            labelName="Purchase Limit Per User (optional)"
                            name="purchaseLimit"
                            handleChange={handleChange}
                            type="text"
                            placeholder=""
                            value={values.purchaseLimit}
                            errors={errors?.purchaseLimit}
                            touched={touched?.purchaseLimit}
                          />
                        </div>
                      )}
                      <div className="mb-2">
                        <TextInputField
                          labelName="Ticket Perks (optional)"
                          name="perks"
                          handleChange={handleChange}
                          type="text"
                          placeholder=""
                          value={values.perks}
                          errors={errors?.perks}
                          touched={touched?.perks}
                        />
                      </div>
                      <div className="mb-2 w-full">
                        <DateTimePicker
                          labelName="Sale Start Date & Time"
                          name="sales_start_date_time"
                          value={
                            values.sales_start_date_time
                              ? new Date(values.sales_start_date_time)
                              : null
                          }
                          onChange={(date) =>
                            setFieldValue("sales_start_date_time", date)
                          }
                          showTime={true}
                          minDate={new Date()}
                          errors={errors?.sales_start_date_time}
                          touched={touched?.sales_start_date_time}
                        />
                      </div>
                      <div className="mb-2 w-full">
                        <DateTimePicker
                          labelName="Sale End Date & Time"
                          name="sales_end_date_time"
                          value={
                            values.sales_end_date_time
                              ? new Date(values.sales_end_date_time)
                              : null
                          }
                          onChange={(date) =>
                            setFieldValue("sales_end_date_time", date)
                          }
                          showTime={true}
                          minDate={new Date()}
                          errors={errors?.sales_end_date_time}
                          touched={touched?.sales_end_date_time}
                          tooltipContent="Defaults to Event End date if left empty"
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-4 w-full flex gap-2 justify-end">
                    <button
                      type="submit"
                      className={`${
                        isSubmitting ? "opacity-60" : "opacity-100"
                      } bg-primary_300 px-3 py-2 flex items-center gap-2 text-primary_100 text-xs rounded-md `}
                      disabled={isSubmitting}
                    >
                      <Edit size="16" color="#A30162" />
                      {isSubmitting ? "Please wait..." : "Edit Ticket"}
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ModalPopup isOpen={isOpenModal}>
        <SignupSuccess
          text="Ticket Edited Successfully! 🎊✨"
          buttonText="Proceed"
          handleOpenClose={handleOpenClose}
          handleFunction={() => navigate(-1)}
        />
      </ModalPopup>
    </>
  );
}
