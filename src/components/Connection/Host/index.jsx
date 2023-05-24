import AddHost from "./AddHost";
import ListHosts from "./ListHosts";

export default function Host() {

    return (
        <div className="w-full">
            <AddHost />
            <hr className="border-t-[1px] border-neutral-500"/>
            <ListHosts />
        </div>
    )
}