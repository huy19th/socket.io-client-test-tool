import Events from "../components/Events";
import Connection from "../components/Connection";
import Tabs from "../components/UI/Tabs";
import generateArray from "../ultils/generateArray";

export default function Home() {

    const tabs = generateArray([
        ["Events", <Events />],
        ["Connection", <Connection />]
    ], "name", "el");

    return (
        <div className="bg-neutral-100 h-screen min-h-[600px]">
            <Tabs tabs={tabs} className="w-1/2 min-w-[600px]" />
        </div>
    );
};