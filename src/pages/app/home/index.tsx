import { useState } from "react";
import Button from "../../../components/FormComponents/Button";
import SelectDropdown from "../../../components/FormComponents/SelectDropdown";

export default function Home() {
  const [, setSelectedOption] = useState("");

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex md:flex-row flex-col gap-3 mg:items-center justify-between">
        <div className="w-full flex flex-col gap-3">
          <h3 className="text-grey_100 text-base font-normal">
            Hey, welcome to Event Cove! 🌊 Tap Create Event to get started!
          </h3>
          <div>
            <Button title="Create Event" type="button" />
          </div>
        </div>
        <div>
          <SelectDropdown
            options={["Paid Event"]}
            onChange={handleSelectChange}
          />
        </div>
      </div>
    </div>
  );
}
