import Host from "./Host";
import Token from "./Token";
import Config from "./Config";

export default function Settings(props) {

    return (
        <>
            <h1>Settings</h1>
            <Host {...props} />
            <Token {...props} />
            <Config {...props} />
        </>

    )
}