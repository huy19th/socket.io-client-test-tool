import { useContext } from "react";
import { ThemeContext } from "../../App";

export default function Button(props) {

    const { color } = useContext(ThemeContext);

    return (
        <button className={`bg-${color}-500 text-white active:bg-${color}-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            {...props}
        >
        </button>
    )


}