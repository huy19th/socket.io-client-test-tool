import { useState } from "react";
import Events from "./Events";
import Connection from "./Connection";
import Settings from "./Settings";

export default function Tabs({ color }) {
    const [openTab, setOpenTab] = useState(0);
    const tabs = [
        { name: "Events", el: <Events /> },
        { name: "Connection", el: <Connection /> },
        { name: "Settings", el: <Settings /> }
    ]
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    {tabs.map(item => (
                        <></>
                    ))}
                    <ul
                        className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablist"
                    >
                        {tabs.map((item, index) => (
                            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
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
                                    <div className={openTab === index ? "block" : "hidden"} id={`link${index}`}>
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