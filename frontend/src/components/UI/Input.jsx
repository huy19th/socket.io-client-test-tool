import { useContext } from "react";
import { ThemeContext } from "../../App";

export default function Input({ className, ...props }) {

    const { color } = useContext(ThemeContext);

    let style = `
    px-2 py-1 mb-2 mr-2
    placeholder-slate-300 text-slate-600 text-sm
    relative
    bg-white
    rounded border-[0.5px] shadow outline-none
    focus:outline-none focus:ring-slate-400
    `;

    style = `${style} ${className ? className : ""}`;

    return (
        <input
            type="text"
            className={style}
            {...props}
        />
    )
}