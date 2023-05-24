import AddConfig from "./AddConfig";
import ListConfigs from "./ListConfigs";

export default function Config() {

    return (
        <div className="w-full">
            <AddConfig />
            <hr className="border-t-[1px] border-neutral-500"/>
            <ListConfigs />
        </div>
    )
}