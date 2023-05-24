import { useContext } from "react";
import { ThemeContext } from "../../App";

export default function Button({ className, ...props }) {

    const { color } = useContext(ThemeContext);

    let style = `
    bg-${color}-500 active:bg-${color}-600
    text-white font-bold uppercase text-xs
    px-2 py-2 mr-1 mb-1 
    rounded shadow outline-none
    hover:shadow-md focus:outline-none 
    ease-linear transition-all duration-150
    `;

    style = `${style} ${className ? className : ""}`;

    return (
        <button
            type="button"
            className={style}
            {...props}
        >
        </button>
    )


}