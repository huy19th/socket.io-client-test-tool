import Host from "./Host";
import Token from "./Token";
import Config from "./Config";
import Card from "../UI/Card";

export default function Connection(props) {

    return (
        <div className="justify-center  w-1/2 min-w-[600px]">
            
            <Card>
                <h1 className="text-center text-2xl pb-5">Settings</h1>
                <Host {...props} />
                <Token {...props} />
                <Config {...props} />
            </Card>
        </div>

    )
}