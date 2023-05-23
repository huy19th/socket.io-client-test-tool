import { useState, useContext } from "react";
import { Button } from "@mui/material";

export default function Tabs({ tabs, className }) {

    const [openTab, setOpenTab] = useState(0);

    return (
        <>
            <div className="flex justify-center w-full">
                <ul
                    className={`flex mb-0 list-none flex-wrap pt-3 pb-3 flex-row ${className ? className : ""}`}
                    role="tablist"
                >
                    {tabs.map((item, index) => (
                        <li key={`tab-${index}`}
                            className={`-mb-px last:mr-0 flex-auto text-center w-1/${tabs.length}`}
                        >
                            <a
                                onClick={e => {
                                    e.preventDefault();
                                    setOpenTab(index);
                                }}
                                data-toggle="tab"
                                href={`#link${index}`}
                                role="tablist"
                            >
                                <Button
                                    fullWidth
                                    variant={openTab === index ? "contained" : "text"}
                                >
                                    {item.name}
                                </Button>
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