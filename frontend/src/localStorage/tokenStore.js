const tokenStore = {
    getTokens: () => {
        return JSON.parse(localStorage.getItem("tokens"));
    }
}

export default tokenStore;