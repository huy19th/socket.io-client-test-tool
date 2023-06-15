import Card from "../UI/Card";
import { TextField, Button } from "@mui/material";

export default function Connect() {

    return (
        <Card raised className="min-h-[450px] bg-white border-[1px] border-neutral-500 w-1/2 h-full">
            <h1 className="text-center text-2xl pb-5">Connect</h1>
            <div className="flex justify-between space-x-3 mb-3">
                <TextField
                    variant="outlined"
                    size="small"
                    label="Host"
                    InputProps={{ readOnly: true }}
                    fullWidth
                />
                <Button
                    variant="contained"
                >
                    Connect
                </Button>
            </div>
            <div className="space-y-3 grow shrink-0 flex-column">
                <TextField
                    variant="outlined"
                    size="small"
                    label="Header"
                    InputProps={{ readOnly: true }}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    size="small"
                    label="Query"
                    InputProps={{ readOnly: true }}
                    fullWidth
                />
                <TextField
                    variant="outlined"
                    size="small"
                    label="Others"
                    InputProps={{ readOnly: true }}
                    fullWidth
                />
            </div>
        </Card>
    )
}