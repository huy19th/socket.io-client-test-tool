import AddConfig from "./AddConfig";
import ListConfigs from "./ListConfigs";

export default function Config() {

    return (
        <div className="w-full">
            <AddConfig />
            <hr />
            <ListConfigs />
        </div>
    )
}