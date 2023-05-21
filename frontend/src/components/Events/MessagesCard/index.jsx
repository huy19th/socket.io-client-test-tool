import { Card, CardHeader } from "@mui/material";

export default function MessagesCard() {

    return (
        <Card className="w-1/2 px-3" >
            <CardHeader
                title="Messages"
                titleTypographyProps={{textAlign: "center"}}
            />
        </Card>
    )
}