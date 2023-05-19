const hostStore = {
    getHosts: () => {
        return JSON.parse(localStorage.getItem("hosts")) || [];
    },
    saveHosts: (hosts) => {
        localStorage.setItem("hosts", JSON.stringify(hosts));
    }
}