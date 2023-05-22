import { TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EventsCard from "./EventsCard";
import MessagesCard from "./MessagesCard";

export default function Events() {

    return (
        <div className="w-[90%] h-[90%] flex space-x-3">
            <EventsCard />
            <MessagesCard />
        </div>
    )
}