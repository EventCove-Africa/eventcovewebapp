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
import { handleNumberInput } from "../../../../utils";
import { addTicketSchema } from "../../../../form-schemas";

export default function AddTickets() {
  const { isOpenModal, handleOpenClose } = useOpenCloseModal();

  return (
    <>
      <div className="w-full h-full">
        <DescriptionBar text="✨ Yo bestie! Let's make your ticket real quick, no cap." />
        <div className="w-full h-full flex gap-3 md:flex-row flex-col">
          <Formik
            validationSchema={addTicketSchema}
            initialValues={{
              ticket_category: "",
              event_type: "",
              ticket_details: false,
              seat_name: "",
              price: "",
              capacity: "",
              purchase_limit: "",
              ticket_perks: "",
              all_values: [],
              sales_end_date_time: null,
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
              const toggleTicketDetails = () => {
                const newTicketDetailsValue = !values.ticket_details;
                setFieldValue("ticket_details", newTicketDetailsValue);
              };

              const resetOptionalValues = () => {
                const newValues = { ...values };
                setFieldValue("all_values", [...values.all_values, newValues]);
                setFieldValue("seat_name", "");
                setFieldValue("price", "");
                setFieldValue("capacity", "");
                setFieldValue("purchase_limit", "");
                setFieldValue("ticket_perks", "");
                setFieldValue("sales_end_data_time", null);
                console.log(values.all_values);
              };

              return (
                <Form onSubmit={handleSubmit} className="w-full">
                  <div className="px-3 pb-6 pt-3 bg-white h-auto rounded-xl shadow flex flex-col gap-3">
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
                      label="Event Type"
                      name="event_type"
                      onChange={(event) =>
                        setFieldValue("event_type", event?.value)
                      }
                      options={[
                        { label: "Paid", value: "paid" },
                        { label: "Free", value: "free" },
                      ]}
                      // value={values?.event_type}
                      errors={errors?.event_type}
                      touched={touched?.event_type}
                    />
                    <div
                      onClick={toggleTicketDetails}
                      className="w-full p-3 bg-pink_100 flex justify-between items-center rounded-md cursor-pointer"
                    >
                      <h3 className="text-dark_200 font-medium text-sm">
                        Ticket Details (optional)
                      </h3>
                      <ArrowUp2 size="16" color="#767779" variant="Bold" />
                    </div>
                    {values.ticket_details && (
                      <div className="w-full">
                        <h3 className="text-grey_100 font-normal text-xs ">
                          Yo bestie! Let’s get this party started! 🎉 Pick your
                          vibe for example: 💎 VIP, 🎟️ Standard, ⏰ Early Bird.
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
                            labelName="Capacity"
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
                  <div className="md:w-[25%] w-full">
                    <Button
                      title="Create Ticket"
                      className="w-full h-[40px] text-center my-6 border border-dark_200"
                      type="submit"
                      isLoading={isSubmitting}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
          <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-3 h-fit">
            <div className="bg-white w-full shadow-sm rounded p-3">
              <div className="w-full flex justify-end">
                <Trash size="16" color="#F44336" className="cursor-pointer" />
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">Seat Name</h3>
                <h3 className="text-dark_200 text-sm font-normal">VIP</h3>
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">Price</h3>
                <h3 className="text-dark_200 text-sm font-normal">₦ 100,000</h3>
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">Capacity</h3>
                <h3 className="text-dark_200 text-sm font-normal">200</h3>
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">
                  Ticket Perk
                </h3>
                <h3 className="text-dark_200 text-sm font-normal">Free Food</h3>
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">
                  Sale End Date & Time
                </h3>
                <h3 className="text-dark_200 text-sm font-normal">
                  13/2/2025 | 9PM
                </h3>
              </div>
            </div>
            <div className="bg-white w-full shadow-sm rounded p-3">
              <div className="w-full flex justify-end">
                <Trash size="16" color="#F44336" className="cursor-pointer" />
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">Seat Name</h3>
                <h3 className="text-dark_200 text-sm font-normal">VIP</h3>
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">Price</h3>
                <h3 className="text-dark_200 text-sm font-normal">₦ 100,000</h3>
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">Capacity</h3>
                <h3 className="text-dark_200 text-sm font-normal">200</h3>
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">
                  Ticket Perk
                </h3>
                <h3 className="text-dark_200 text-sm font-normal">Free Food</h3>
              </div>
              <div className="w-full flex flex-col gap-1 border-b border-border_color py-2">
                <h3 className="text-grey_100 text-xs font-normal">
                  Sale End Date & Time
                </h3>
                <h3 className="text-dark_200 text-sm font-normal">
                  13/2/2025 | 9PM
                </h3>
              </div>
            </div>
          </div>
        </div>
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
