import { Card, CardHeader, CardContent } from "@mui/material";
import AddEvent from "./AddEvent";
import ListEvents from "./ListEvents";

export default function EventsCard() {

    return (
        <Card className="w-1/2">
            <CardContent className="mb-3 pt-0">
                <AddEvent />
                <ListEvents />
            </CardContent>
        </Card>
    )
}