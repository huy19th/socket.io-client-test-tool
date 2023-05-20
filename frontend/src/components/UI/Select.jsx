import { Select as SimpleSelect, MenuItem, FormControl } from "@mui/material"

export default function Select({ options, value, handleChange, ...props }) {

    return (
        <FormControl size="small" {...props}>
            <SimpleSelect
                value={value}
                onChange={event => handleChange(event.target.value)}
            >
                {options.map((item, index) => (
                    <MenuItem
                        key={index}
                        value={item.value}
                    >
                        {item.key}
                    </MenuItem>
                ))}
            </SimpleSelect>
        </FormControl>

    )
}