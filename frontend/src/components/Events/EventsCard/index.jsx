import { useState } from "react";
import { Card, CardContent } from "@mui/material";
import AddEvent from "./AddEvent";
import ListEvents from "./ListEvents";

export default function EventsCard() {

    const [eventIndex, setEventIndex] = useState(-1);

    return (
        <Card className="w-1/2">
            <CardContent className="mb-3 pt-0">
                <AddEvent />
                <hr className="mb-3"/>
                <ListEvents eventIndex={eventIndex} setEventIndex={setEventIndex}/>
                <hr className="mb-3"/>
            </CardContent>
        </Card>
    )
}