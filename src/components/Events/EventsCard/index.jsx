import { useState } from "react";
// import { Card, CardContent } from "@mui/material";
import Card from "../../UI/Card";
import AddEvent from "./AddEvent";
import ListEvents from "./ListEvents";
import ListMessages from "./ListMessages";

export default function EventsCard() {

    const [eventIndex, setEventIndex] = useState(-1);

    return (
        <div className="w-1/2 pb-3">
            <Card className="border-[1px] h-1/3 border-neutral-500 bg-white">
                <AddEvent />
                <hr className="my-3 border-neutral-500" />
                <ListEvents eventIndex={eventIndex} setEventIndex={setEventIndex} />
            </Card>
            <Card className="border-[1px] h-2/3 border-neutral-500 bg-white">
                <ListMessages eventIndex={eventIndex} setEventIndex={setEventIndex} />
            </Card>
        </div>
    )
}