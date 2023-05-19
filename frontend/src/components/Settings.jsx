import { useState, useContext } from "react";
import { ThemeContext } from "../App";
import generateArray from "../ultils/generateArray";
import HostSettings from "./Settings/Host";
import EventSettings from "./Settings/Event";

export default function Settings({ settings, updateSettings }) {

    const { color } = useContext(ThemeContext);

    let events = JSON.parse(localStorage.getItem("events"));

    const data = generateArray([
        ["Add Host"],
        ["Config Connection"],
        ["Add Event"],
    ], "buttonName");

    return (
        <>
            <h1>Settings</h1>
            {/* {
                data.map(item => (
                    <div className="mb-3 pt-0">
                        <input type="text"
                            className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
                        />
                        <button type="button"
                            class={`bg-${color}-500 text-white active:bg-${color}-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}>
                            {item.buttonName}
                        </button>
                    </div>
                ))
            } */}
            <HostSettings settings={settings} updateSettings={updateSettings}/>
            <EventSettings settings={settings} updateSettings={updateSettings} />
            <div className="mb-3 pt-0">
                <select>
                    {events ? events.map((item, index) => <option value={item} key={`event-${index}`}>{item}</option>) : null}
                </select>
                <input type="text"
                    className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
                />
                <button type="button"
                    className={`bg-${color}-500 text-white active:bg-${color}-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}>
                    Add Message
                </button>
            </div>
            
        </>

    )
}