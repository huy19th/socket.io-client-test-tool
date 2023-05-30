import { useContext } from "react";
import { ListMessagesConext } from "../../../contexts/ListMessagesContext";
import Card from "../../UI/Card";
import MessagesContainer from "./MessagesContainer";
import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function MessagesCard() {

    const {listMessages, updateListMessages} = useContext(ListMessagesConext);

    return (
        <Card className="border-[1px] h-1/3 border-neutral-500 bg-white w-1/2 h-full">
            <h1 className="text-center text-3xl font-medium">Messages</h1>
            <Tooltip
                title="Clear Messages"
                placement="top-start"
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 15,
                }}
            >
                <IconButton onClick={() => updateListMessages([])}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <hr className="border-t-[1px] border-neutral-500 my-3" />

            <MessagesContainer />
        </Card>
    )
}