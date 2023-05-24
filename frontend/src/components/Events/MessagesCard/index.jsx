import Card from "../../UI/Card";
import { Typography } from "@mui/material";
import MessagesContainer from "./MessagesContainer";

export default function MessagesCard() {

    return (
        <Card className="border-[1px] h-1/3 border-neutral-500 bg-white w-1/2 h-full">
            <h1 className="text-center text-3xl font-medium">Messages</h1>
            <hr className="border-t-[1px] border-neutral-500 my-3"/>
            <MessagesContainer />
        </Card>
    )
}