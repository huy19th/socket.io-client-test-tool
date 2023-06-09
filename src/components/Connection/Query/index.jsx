import AddQuery from "./AddQuery";
import ListQueries from "./ListQueries";

export default function Header() {

    return (
        <div className="w-full">
            <AddQuery />
            <hr className="border-t-[1px] border-neutral-500"/>
            <ListQueries />
        </div>
    )
}