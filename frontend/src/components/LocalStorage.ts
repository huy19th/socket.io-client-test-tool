interface ILocalStorage {
    // connections
    hosts: string[];
    configs: {[key: string]: any};
    tokens: string[];
    // events
    events: string[];
    data: {
        [key: string]: string[]
    }
}