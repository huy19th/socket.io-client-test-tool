import { useState, useContext } from "react";
import { ThemeContext } from "../../App";

export default function Tabs({ tabs, className }) {

    const { color } = useContext(ThemeContext);

    const [openTab, setOpenTab] = useState(1);

    return (
        <>
            <div className="flex justify-center w-full">
                <ul
                    className={`flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row ${className ? className : ""}`}
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
        </>
    );
};