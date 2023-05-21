import AddHost from "./AddHost";
import ListHosts from "./ListHosts";

export default function Host() {

    return (
        <div className="w-full">
            <AddHost />
            <hr />
            <ListHosts />
        </div>
    )
}