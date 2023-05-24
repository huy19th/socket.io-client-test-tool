import { TextField } from "@mui/material";

export default function Input (props) {
    return (
        <TextField
            {...props}
            inputProps={{style: {paddingTop: "2px", paddingBottom: "2px"}}}
        />
    )
}