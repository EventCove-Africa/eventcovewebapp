/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik, FormikHelpers } from "formik";
import { Add, ArrowUp2, Trash } from "iconsax-react";
import DescriptionBar from "../../../../components/DescriptionBar";
import ModalPopup from "../../../../components/ModalPopup";
import SignupSuccess from "../../../components/SignupSuccess";
import useOpenCloseModal from "../../../../hooks/useOpenCloseModal";
import CustomSelect from "../../../../components/FormComponents/SelectInputField";
import Button from "../../../../components/FormComponents/Button";
import TextInputField from "../../../../components/FormComponents/InputField";
import DateTimePicker from "../../../../components/FormComponents/DateTimePicker";
import {
  _handleThrowErrorMessage,
  convertDateTimeRangeForEventCreation,
  formatDateTime,
  handleNumberInput,
  isArrayEmpty,
  isValidOptionalDetails,
  parseNumber,
} from "../../../../utils";
import { addTicketSchema } from "../../../../form-schemas";
import { api } from "../../../../services/api";
import { appUrls } from "../../../../services/urls";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

type ticketTypesProps = {
  perks: string;
  salesEndDate: string;
  salesStartDate: string;
  salesEndTime: string;
  salesStartTime: string;
  capacity: number;
  purchaseLimit: number; //1 by default
  groupTicketLimit: number; //only applicable for group ticket.  2 by default
  name: string;
  price: number;
  colour: string;
  category: "Free" | "Paid"; //Free, Paid
  classification: "Single" | "Group"; //Single, Group
};

type AddTicketProps = {
  eventId?: string;
  ticketTypes: ticketTypesProps[];
};

export default function AddTickets() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();
  const navigate = useNavigate();
  const { eventId } = useParams();

  const _handleCreateTicketForEvent = async (
    payload: AddTicketProps,
    actions: FormikHelpers<any>
  ) => {
    try {
      const res = await api.post(appUrls.TICKET_URL, payload);
      const status_code = [200, 201].includes(res?.status);
      if (status_code) {
        actions.resetForm();
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
        <DescriptionBar text="✨Let's make your ticket real quick." />
        <Formik
          validationSchema={addTicketSchema}
          initialValues={{
            classification: "",
            category: "",
            name: "",
            price: "",
            capacity: "",
            colour: "",
            groupTicketLimit: "",
            purchaseLimit: "",
            perks: "",
            sales_end_date_time: null,
            sales_start_date_time: null,
            all_values: [],
            ticket_details: true,
          }}
          enableReinitialize
          onSubmit={(values, actions) => {
            const {
              sales_end_date_time,
              sales_start_date_time,
              all_values,
              price,
              ...rest
            } = values;
            const { startDate, endDate, startTime, endTime }: any =
              convertDateTimeRangeForEventCreation(
                sales_start_date_time,
                sales_end_date_time
              );
            const ticketTypes: any = [];
            const payload = {
              eventId,
              ticketTypes,
            };
            if (!isArrayEmpty(all_values)) {
              all_values.forEach((ticket: any) => {
                const formated_sales_start_date_time =
                  ticket?.sales_start_date_time;
                const formated_sales_end_date_time =
                  ticket?.sales_end_date_time;
                const {
                  startDate: formatedStartDate,
                  endDate: formatedEndDate,
                  startTime: formatedStartTime,
                  endTime: formatedEndTime,
                }: any = convertDateTimeRangeForEventCreation(
                  formated_sales_start_date_time,
                  formated_sales_end_date_time
                );
                const formatedPrice = parseNumber(ticket.price);
                ticketTypes.push({
                  ...ticket,
                  price: formatedPrice,
                  startDate: formatedStartDate,
                  endDate: formatedEndDate,
                  startTime: formatedStartTime,
                  endTime: formatedEndTime,
                });
              });
            } else {
              ticketTypes.push({
                startDate,
                endDate,
                startTime,
                endTime,
                price: parseNumber(price),
                ...rest,
              });
            }
            _handleCreateTicketForEvent(payload, actions);
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
            const resetOptionalValues = () => {
              let requiredFields = ["name", "classification", "category"];
              if (values?.category.toLocaleLowerCase() === "paid") {
                requiredFields.push("price");
              }
              const optionalDetails = {
                name: values?.name,
                price: values?.price,
                capacity: values?.capacity,
                colour: values?.colour,
                purchaseLimit: values?.purchaseLimit,
                classification: values?.classification,
                category: values?.category,
                groupTicketLimit: values?.groupTicketLimit,
                perks: values?.perks,
                sales_start_date_time: values?.sales_start_date_time || null,
                sales_end_date_time: values?.sales_end_date_time || null,
              };
              if (isValidOptionalDetails(values, requiredFields)) {
                // Calculate the next numeric ID
                const nextId =
                  values.all_values.length > 0
                    ? Math.max(
                        ...values.all_values.map((item: any) => item.id ?? 0)
                      ) + 1
                    : 1;

                setFieldValue("all_values", [
                  { id: nextId, ...optionalDetails }, // Add numeric id
                  ...values.all_values,
                ]);

                // Reset fields
                Object.keys(optionalDetails).forEach((key) =>
                  setFieldValue(
                    key,
                    ["sales_end_date_time", "sales_start_date_time"].includes(
                      key
                    )
                      ? null
                      : ""
                  )
                );
              }
            };

            const removeItemFromAllValues = (idToRemove: number) => {
              const updatedValues = values.all_values.filter(
                (item: any) => item.id !== idToRemove
              );
              setFieldValue("all_values", updatedValues);
            };
            const selectedValues = values?.all_values || [];
            return (
              <Form onSubmit={handleSubmit} className="w-full">
                <div className="w-full h-fit flex gap-3 md:flex-row flex-col">
                  <div className="h-fit w-full">
                    <div className="w-full px-3 pb-6 pt-3 bg-white h-fit rounded-xl shadow flex flex-col gap-3">
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
                          const isGroup =
                            event?.value.toLowerCase() === "group";
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
                      />

                      {values?.classification === "Group" && (
                        <div className="mb-2">
                          <TextInputField
                            labelName="Group limit"
                            name="groupTicketLimit"
                            handleChange={handleChange}
                            type="text"
                            placeholder=""
                            value={values.groupTicketLimit}
                            errors={errors?.groupTicketLimit}
                            touched={touched?.groupTicketLimit}
                            tooltipContent="Group limit by default is 2 persons"
                          />
                        </div>
                      )}
                      <CustomSelect
                        label="Ticket Category"
                        name="category"
                        onChange={(event) =>
                          setFieldValue("category", event?.value)
                        }
                        options={[
                          { label: "Paid", value: "Paid" },
                          { label: "Free", value: "Free" },
                        ]}
                        errors={errors?.category}
                        touched={touched?.category}
                        defaultValue={values?.category}
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
                      <div
                        onClick={() =>
                          setFieldValue(
                            "ticket_details",
                            !values.ticket_details
                          )
                        }
                        className="w-full p-3 bg-pink_100 flex justify-between items-center rounded-md cursor-pointer"
                      >
                        <h3 className="text-dark_200 font-medium text-sm">
                          Other Details (optional)
                        </h3>
                        <ArrowUp2 size="16" color="#767779" variant="Bold" />
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
                        {isArrayEmpty(selectedValues) && (
                          <button
                            type="submit"
                            className="bg-primary_300 px-3 py-2 flex items-center gap-2 text-primary_100 text-xs rounded-md"
                            disabled={isSubmitting}
                            // onClick={handleSubmit}
                          >
                            {isSubmitting
                              ? "Please wait....."
                              : "Create Ticket"}
                          </button>
                        )}
                        <button
                          type="button"
                          className="bg-primary_300 px-3 py-2 flex items-center gap-2 text-primary_100 text-xs rounded-md"
                          onClick={resetOptionalValues}
                        >
                          <Add size="16" color="#A30162" />
                          Add another ticket
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="overflow-x-auto w-full grid md:grid-cols-2 grid-cols-1 gap-3 h-fit">
                      {selectedValues?.map((list: any, index: number) => {
                        const fields = [
                          { label: "Seat Name", value: list?.name },
                          { label: "Price", value: list?.price },
                          { label: "Capacity", value: list?.capacity },
                          {
                            label: "Classification",
                            value: list?.classification,
                          },
                          {
                            label: "Group Limit",
                            value: list?.groupTicketLimit,
                          },
                          { label: "Ticket Perk", value: list?.perks },
                          { label: "Colour", value: list?.colour },
                          { label: "Category", value: list?.category },
                          {
                            label: "Purchase Limit",
                            value: list?.purchaseLimit,
                          },
                          {
                            label: "Sale Start Date & Time",
                            value: formatDateTime(list?.sales_start_date_time),
                          },
                          {
                            label: "Sale End Date & Time",
                            value: formatDateTime(list?.sales_end_date_time),
                          },
                        ];
                        return (
                          <div
                            key={index}
                            className="bg-white w-full h-fit shadow-sm rounded p-3"
                          >
                            {/* Trash Icon */}
                            <div className="w-full flex justify-end">
                              <Trash
                                size="16"
                                color="#F44336"
                                className="cursor-pointer"
                                onClick={() =>
                                  removeItemFromAllValues(list?.id)
                                }
                              />
                            </div>
                            {/* Dynamic Fields Rendering */}
                            {fields.map(
                              ({ label, value }) =>
                                value && (
                                  <div
                                    key={label}
                                    className="w-full flex flex-col gap-1 border-b border-border_color py-2"
                                  >
                                    <h3 className="text-grey_100 text-xs font-normal">
                                      {label}
                                    </h3>
                                    <h3 className="text-dark_200 text-sm font-normal">
                                      {value}
                                    </h3>
                                  </div>
                                )
                            )}
                          </div>
                        );
                      })}
                    </div>
                    {!isArrayEmpty(selectedValues) && (
                      <Button
                        title="Create Ticket"
                        className="md:w-[50%] w-full h-[40px] text-center my-6 border border-dark_200"
                        type="submit"
                        // isLoading={isSubmitting}
                      />
                    )}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ModalPopup isOpen={isOpenModal}>
        <SignupSuccess
          text="You just created your ticket! 🎊✨"
          buttonText="Proceed to event details"
          handleOpenClose={handleOpenClose}
          handleFunction={() => navigate(`/app/events/${eventId}`)}
        />
      </ModalPopup>
    </>
  );
}
