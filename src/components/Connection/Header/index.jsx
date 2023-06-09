import AddHeader from "./AddHeader";
import ListHeaders from "./ListHeaders";

export default function Header() {

    return (
        <div className="w-full">
            <AddHeader />
            <hr className="border-t-[1px] border-neutral-500"/>
            <ListHeaders />
        </div>
    )
}