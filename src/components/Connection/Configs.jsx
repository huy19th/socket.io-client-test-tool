import Host from "./Host";
import Auth from "./Auth";
import Header from "./Header";
import Query from "./Query";
import Other from "./Other";
import Card from "../UI/Card";
import Tabs from "../UI/Tabs";
import { generateArray } from "../../ultils";

export default function Configs() {

    const tabs = generateArray([
        ["Host", <Host />],
        ["Auth", <Auth />],
        ["Header", <Header />],
        ["Query", <Query />],
        ["Other", <Other />],
    ], "name", "el");

    return (
        <Card raised className="min-h-[450px] bg-white border-[1px] border-neutral-500 w-1/2 h-full">
            <h1 className="text-center text-2xl pb-5">Settings</h1>
            <Tabs tabs={tabs} className="w-full" />
        </Card>
    )
}