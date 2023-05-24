import { Select as SimpleSelect, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material"

export default function Select({ options, value, handleChange, helperText, label, ...props }) {

    return (
        <FormControl size="small" {...props}
        >
            {
                label ?
                    <InputLabel chidlren={label} id={`id-${label}`} />
                    : null
            }
            {
                helperText ?
                    <FormHelperText
                        className="bg-neutral-100"
                        sx={{m: 0, pl: 2}}
                    >
                        {helperText}
                    </FormHelperText>
                    : null
            }
            <SimpleSelect
                value={value}
                onChange={event => handleChange(event.target.value)}
                labelId={label ? `id-${label}` : ""}
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