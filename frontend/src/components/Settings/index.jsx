import HostSettings from "./Host";
import TokenSettings from "./Token";

export default function Settings({ settings, updateSettings }) {

    return (
        <>
            <h1>Settings</h1>
            <HostSettings settings={settings} updateSettings={updateSettings}/>
            <TokenSettings settings={settings} updateSettings={updateSettings}/>
        </>

    )
}