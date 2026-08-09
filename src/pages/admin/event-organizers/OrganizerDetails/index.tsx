import { useParams } from "react-router-dom";
import EventCard from "../../../../components/EventCard";
import DescriptionBar from "../../../../components/DescriptionBar";

export default function OrganizerDetails() {
  const { organizerId } = useParams();
  return (
    <>
     <DescriptionBar text="View Organizer Events 🌟" />
      <EventCard eventType="all" organizerId={organizerId} allowViewEventDetails={false} />
    </>
  );
}
