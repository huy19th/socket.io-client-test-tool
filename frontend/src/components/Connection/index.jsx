import Host from "./Host";
import Auth from "./Auth";
import Config from "./Config";
import Card from "../UI/Card";
import Tabs from "../UI/Tabs";
import generateArray from "../../ultils/generateArray";

export default function Connection(props) {

    const tabs = generateArray([
        ["Host", <Host {...props} />],
        ["Auth", <Auth {...props} />],
        ["Config", <Config {...props} />],
    ], "name", "el");

    return (
        <div className="justify-center  w-1/2 min-w-[600px]">
            
            <Card>
                <h1 className="text-center text-2xl pb-5">Settings</h1>
                <Tabs tabs={tabs} className="w-full"/>
            </Card>
        </div>

    )
}