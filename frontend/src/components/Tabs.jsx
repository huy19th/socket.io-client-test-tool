import { useState, useContext } from "react";
import Events from "./Events";
import Settings from "./Settings";
import { ThemeContext } from "../App";
import generateArray from "../ultils/generateArray";

export default function Tabs() {

    const [openTab, setOpenTab] = useState(0);

    const [settings, updateSettings] = useState({
        hosts: JSON.parse(localStorage.getItem("hosts")) || [],
        configs: JSON.parse(localStorage.getItem("configs")) || {},
        tokens: JSON.parse(localStorage.getItem("tokens")) || [],
        events: JSON.parse(localStorage.getItem("events")) || [],
        data: JSON.parse(localStorage.getItem("data")) || {}
    });

    const props = { settings, updateSettings };

    const tabs = generateArray([
        ["Events", <Events {...props} />],
        ["Settings", <Settings {...props} />]
    ], "name", "el");

    const { color } = useContext(ThemeContext);

    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        {tabs.map((item, index) => (
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center" key={`tab-${index}`}>
                                <a
                                    className={
                                        "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                        (openTab === index ? "text-white bg-" + color + "-600" : "text-" + color + "-600 bg-white")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(index);
                                    }}
                                    data-toggle="tab"
                                    href={`#link${index}`}
                                    role="tablist"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                            <div className="tab-content tab-space">
                                {tabs.map((item, index) => (
                                    <div className={openTab === index ? "block" : "hidden"} key={`tab-${index}`} id={`link${index}`}>
                                        {item.el}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};