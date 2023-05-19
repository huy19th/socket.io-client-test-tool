import { useState, useContext } from "react";
import { ThemeContext } from "../App";
import generateArray from "../ultils/generateArray";
import HostSettings from "./Settings/Host";
import TokenSettings from "./Settings/Token";
import EventSettings from "./Settings/Event";


export default function Settings({ settings, updateSettings }) {

    const { color } = useContext(ThemeContext);

    let events = JSON.parse(localStorage.getItem("events"));

    return (
        <>
            <h1>Settings</h1>
            <HostSettings settings={settings} updateSettings={updateSettings}/>
            <TokenSettings settings={settings} updateSettings={updateSettings}/>
        </>

    )
}