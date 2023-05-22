import { useContext } from "react";
import { SettingsContext } from "../../../contexts";
import { Chip } from "@mui/material";

export default function ListEvents({ eventIndex, setEventIndex }) {

    const { settings } = useContext(SettingsContext);

    console.log(settings)

    return (
        <div className="flex space-x-2 h-[96px] overflow-auto">
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