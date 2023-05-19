interface ILocalStorage {
    // connections
    hosts: string[];
    connectOptions: {[key: string]: any};
    tokens: string[];
    // events
    events: string[];
    data: {
        [key: string]: string[]
    }
}