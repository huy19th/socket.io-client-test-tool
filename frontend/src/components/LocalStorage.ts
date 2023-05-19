interface ILocalStorage {
    // connections
    hosts: string[];
    connectionConfigs: {[key: string]: any};
    tokens: string[];
    // events
    events: string[];
    data: {
        [key: string]: string[]
    }
}