import { useState, useContext } from "react";
import Events from "../components/Events";
import Connection from "../components/Connection";
import { ThemeContext } from "../App";
import generateArray from "../ultils/generateArray";

export default function Home() {

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
        ["Connection", <Connection {...props} />]
    ], "name", "el");

    const { color } = useContext(ThemeContext);

    return (
        <div className="bg-neutral-100 h-screen">
            <div className="flex justify-center w-full">
                <ul
                    className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row w-1/2 min-w-[600px]"
                    role="tablist"
                >
                    {tabs.map((item, index) => (
                        <li key={`tab-${index}`}
                            className={`-mb-px last:mr-0 flex-auto text-center w-1/${tabs.length}`}
                        >
                            <a
                                className={
                                    `text-xs font-bold uppercase px-5 py-3 shadow-lg block leading-normal 
                                    ${index === 0 ? "rounded-l" : null}
                                    ${index === tabs.length - 1 ? "rounded-r" : null}
                                    ${openTab === index ? "text-white bg-" + color + "-600" : "text-" + color + "-600 bg-white"}`
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
            </div>

            {tabs.map((item, index) => (
                <div className={openTab === index ? "block flex justify-center" : "hidden"} key={`tab-${index}`} id={`link${index}`}>
                    {item.el}
                </div>
            ))}
        </div>
    );
};