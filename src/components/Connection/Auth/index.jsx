import AddToken from "./AddToken";
import ListTokens from "./ListTokens";

export default function Auth() {

    return (
        <div className="w-full">
            <AddToken />
            <hr className="border-t-[1px] border-neutral-500"/>
            <ListTokens />
        </div>
    )

}