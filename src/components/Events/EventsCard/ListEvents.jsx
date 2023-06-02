import { useContext } from "react";
import { EventContext } from "../../../contexts/EventContext";
import { Chip } from "@mui/material";

export default function ListEvents({ eventIndex, setEventIndex }) {

    const { events } = useContext(EventContext);

    return (
        <div className="flex flex-wrap space-x-1 space-y-1 overflow-auto h-[calc(100%-60px)]">
            {
                events.length ?
                    events.map((eventName, index) => (
                        <Chip
                            key={`${eventName}-${index}`}
                            label={eventName}
                            variant={eventIndex === index ? "" : "outlined"}
                            onClick={() => setEventIndex(eventIndex === index ? -1 : index)}
                        />
                    ))
                    : null
            }
        </div>
    )
}