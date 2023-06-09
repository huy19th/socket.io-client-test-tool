import AddQuery from "./AddOther";
import ListOthers from "./ListOthers";

export default function Header() {

    return (
        <div className="w-full">
            <AddQuery />
            <hr className="border-t-[1px] border-neutral-500"/>
            <ListOthers />
        </div>
    )
}