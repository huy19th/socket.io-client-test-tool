import AddToken from "./AddToken";
import ListTokens from "./ListTokens";

export default function Auth() {

    return (
        <div className="w-full">
            <AddToken />
            <hr />
            <ListTokens />
        </div>
    )

}