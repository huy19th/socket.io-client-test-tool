import Events from "../components/Events";
import Connection from "../components/Connection";
import ConnectionStatus from "../components/Connection/Status";

export default function Home() {

    return (
        <div className="bg-neutral-100 h-screen min-h-[600px] flex justify-center content-center px-[60px]">
            <Events />
            <Connection />
            <ConnectionStatus />
        </div>
    );
};