import { useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { Chip } from "@mui/material";

export default function ListEvents({ eventIndex, setEventIndex }) {

    const { settings } = useContext(SettingsContext);

    return (
        <div className="flex flex-wrap space-x-1 space-y-1 overflow-auto h-[calc(100%-60px)]">
            {
                settings.events.length ?
                    settings.events.map((eventName, index) => (
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