export default function Card({ children }) {
    return (
        <div className={`relative flex flex-col min-w-0 break-words bg-white mb-6 rounded shadow-lg`}
        >
            <div className="px-4 py-3 flex-auto ">
                <div className="tab-content tab-space">
                    {children}
                </div>
            </div>
        </div>
    )
}