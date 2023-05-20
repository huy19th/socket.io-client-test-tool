import { useState } from "react";
import generateArray from "../ultils/generateArray";
import Events from "../components/Events";
import Connection from "../components/Connection";
import Tabs from "../components/UI/Tabs";

export default function Home() {

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

    return (
        <div className="bg-neutral-100 h-screen min-h-[600px]">
            <Tabs tabs={tabs} className="w-1/2 min-w-[600px]"/>
        </div>
    );
};