import Button from "../../../components/FormComponents/Button";

export default function Events() {
  return (
    <div className="w-full h-full">
      <div className="w-full flex md:flex-row flex-col gap-3 mg:items-center justify-between">
        <h3 className="text-grey_100 text-base font-normal">
          Here’s what you’ve got going on 🔔
        </h3>
        <div>
          <Button backgroundColor="bg-primary_300" textColor="text-primary_100" title="Create Event" type="button" />
        </div>
      </div>
    </div>
  );
}
