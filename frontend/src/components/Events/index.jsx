import { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EventsCard from "./EventsCard";
import MessagesCard from "./MessagesCard";

export default function Events({ settings, updateSettings }) {

    return (
        <div className="w-[90%] flex justify-center space-x-3">
            <EventsCard
                settings={settings}
                updateSettings={updateSettings}
            />
            <MessagesCard className="w-1/2" />
        </div>
    )
}