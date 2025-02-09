/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
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
  formatDateTime,
  handleNumberInput,
  isValidOptionalDetails,
} from "../../../../utils";
import { addTicketSchema } from "../../../../form-schemas";

export default function AddTickets() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();

  return (
    <>
      <div className="w-full h-full">
        <DescriptionBar text="✨ Yo bestie! Let's make your ticket real quick, no cap." />

        <Formik
          validationSchema={addTicketSchema}
          initialValues={{
            ticket_category: "",
            ticket_type: "",
            seat_name: "",
            price: "",
            capacity: "",
            purchase_limit: "",
            ticket_perks: "",
            sales_end_date_time: null,
            all_values: [],
            ticket_details: false,
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
          }) => {
            const resetOptionalValues = () => {
              let requiredFields = ["seat_name", "sales_end_date_time"];
              if (values?.ticket_type === "paid") {
                requiredFields.push("price");
              }
              const optionalDetails = {
                seat_name: values?.seat_name,
                price: values?.price,
                capacity: values?.capacity,
                purchase_limit: values?.purchase_limit,
                ticket_perks: values?.ticket_perks,
                sales_end_date_time: formatDateTime(
                  values?.sales_end_date_time
                ),
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
                  ...values.all_values,
                  { id: nextId, ...optionalDetails }, // Add numeric id
                ]);

                // Reset fields
                Object.keys(optionalDetails).forEach((key) =>
                  setFieldValue(key, key === "sales_end_date_time" ? null : "")
                );
              }
            };

            const removeItemFromAllValues = (idToRemove: number) => {
              const updatedValues = values.all_values.filter(
                (item: any) => item.id !== idToRemove
              );
              setFieldValue("all_values", updatedValues);
            };

            return (
              <Form onSubmit={handleSubmit} className="w-full">
                <div className="w-full h-fit flex gap-3 md:flex-row flex-col">
                  <div className="h-fit w-full">
                    <div className="w-full px-3 pb-6 pt-3 bg-white h-fit rounded-xl shadow flex flex-col gap-3">
                      <CustomSelect
                        label="Ticket Category"
                        name="ticket_category"
                        onChange={(event) =>
                          setFieldValue("ticket_category", event?.value)
                        }
                        options={[
                          { label: "Single", value: "single" },
                          { label: "Multiple", value: "multiple" },
                        ]}
                        // value={values?.ticket_category}
                        errors={errors?.ticket_category}
                        touched={touched?.ticket_category}
                      />
                      <CustomSelect
                        label="Ticket Type"
                        name="ticket_type"
                        onChange={(event) =>
                          setFieldValue("ticket_type", event?.value)
                        }
                        options={[
                          { label: "Paid", value: "paid" },
                          { label: "Free", value: "free" },
                        ]}
                        // value={values?.ticket_type}
                        errors={errors?.ticket_type}
                        touched={touched?.ticket_type}
                      />
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
                          Ticket Details (optional)
                        </h3>
                        <ArrowUp2 size="16" color="#767779" variant="Bold" />
                      </div>
                      {values.ticket_details && (
                        <div className="w-full">
                          <h3 className="text-grey_100 font-normal text-xs mb-2">
                            Yo bestie! Let’s get this party started! 🎉 Pick
                            your vibe for example: 💎 VIP, 🎟️ Standard, ⏰ Early
                            Bird.
                          </h3>
                          <div className="mb-2">
                            <TextInputField
                              labelName="Seat Name"
                              name="seat_name"
                              handleChange={handleChange}
                              type="text"
                              placeholder=""
                              value={values.seat_name}
                              errors={errors?.seat_name}
                              touched={touched?.seat_name}
                            />
                          </div>
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
                              labelName="Purchase Limit Per User (optional)"
                              name="purchase_limit"
                              handleChange={handleChange}
                              type="text"
                              placeholder=""
                              value={values.purchase_limit}
                              errors={errors?.purchase_limit}
                              touched={touched?.purchase_limit}
                            />
                          </div>
                          <div className="mb-2">
                            <TextInputField
                              labelName="Ticket Perks (optional)"
                              name="ticket_perks"
                              handleChange={handleChange}
                              type="text"
                              placeholder=""
                              value={values.ticket_perks}
                              errors={errors?.ticket_perks}
                              touched={touched?.ticket_perks}
                            />
                          </div>
                          <div className="mb-2 w-full">
                            <DateTimePicker
                              labelName="Sale End Date & Time"
                              name="sales_end_date_time"
                              value={values.sales_end_date_time}
                              onChange={(date) =>
                                setFieldValue("sales_end_date_time", date)
                              }
                              showTime={true}
                              minDate={new Date()}
                              errors={errors?.sales_end_date_time}
                              touched={touched?.sales_end_date_time}
                            />
                          </div>
                          <div className="mt-4 w-full flex justify-end">
                            <button
                              type="button"
                              className="bg-primary_300 px-3 py-2 flex gap-2 text-primary_100 text-xs rounded-md"
                              onClick={resetOptionalValues}
                            >
                              <Add size="16" color="#A30162" />
                              Add another seat
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="lg:w-[30%] w-full">
                      <Button
                        title="Create Ticket"
                        className="w-full h-[40px] text-center my-6 border border-dark_200"
                        type="submit"
                        isLoading={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3 h-fit">
                    {values?.all_values.map((list: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="bg-white w-full shadow-sm rounded p-3"
                        >
                          <div className="w-full flex justify-end">
                            <Trash
                              size="16"
                              color="#F44336"
                              className="cursor-pointer"
                              onClick={() => removeItemFromAllValues(list?.id)}
                            />
                          </div>
                          <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                            <h3 className="text-grey_100 text-xs font-normal">
                              Seat Name
                            </h3>
                            <h3 className="text-dark_200 text-sm font-normal">
                              {list?.seat_name ?? "N/A"}
                            </h3>
                          </div>
                          <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                            <h3 className="text-grey_100 text-xs font-normal">
                              Price
                            </h3>
                            <h3 className="text-dark_200 text-sm font-normal">
                              {list?.price || "N/A"}
                            </h3>
                          </div>
                          <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                            <h3 className="text-grey_100 text-xs font-normal">
                              Capacity
                            </h3>
                            <h3 className="text-dark_200 text-sm font-normal">
                              {list?.capacity || "N/A"}
                            </h3>
                          </div>
                          <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                            <h3 className="text-grey_100 text-xs font-normal">
                              Ticket Perk
                            </h3>
                            <h3 className="text-dark_200 text-sm font-normal">
                              {list?.ticket_perks || "N/A"}
                            </h3>
                          </div>
                          <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                            <h3 className="text-grey_100 text-xs font-normal">
                              Purchase limit
                            </h3>
                            <h3 className="text-dark_200 text-sm font-normal">
                              {list?.purchase_limit || "N/A"}
                            </h3>
                          </div>
                          <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                            <h3 className="text-grey_100 text-xs font-normal">
                              Sale End Date & Time
                            </h3>
                            <h3 className="text-dark_200 text-sm font-normal">
                              {list?.sales_end_date_time || "N/A"}
                            </h3>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ModalPopup isOpen={isOpenModal}>
        <SignupSuccess
          text="Woohoo! You just created your ticket ! 🎊✨"
          // buttonText="Proceed to create ticket"
          handleOpenClose={handleOpenClose}
          // handleFunction={() => navigate("/app/tickets/add")}
        />
      </ModalPopup>
    </>
  );
}
