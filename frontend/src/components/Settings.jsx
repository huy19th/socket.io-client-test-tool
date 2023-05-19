export default function Settings() {
    return (
        <>
            <h1>Settings</h1>
            <div className="mb-3 pt-0">
                <input type="text" placeholder="Placeholder" id="add-host"
                    className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring"
                />
                <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                    Add Host
                </button>
            </div>
        </>

    )
}