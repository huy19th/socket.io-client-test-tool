import EventsCard from "./EventsCard";
import MessagesCard from "./MessagesCard";

export default function Events() {

    return (
        <div className="w-full flex space-x-3 py-3">
            <EventsCard />
            <MessagesCard />
        </div>
    )
}