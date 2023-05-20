export default function Card({ children, className }) {

    let style = `relative flex flex-col min-w-0 break-words bg-white mb-6 rounded shadow-lg`;
    style = `${style} ${className ? className : ""}`;
    
    return (
        <div className={style}
        >
            <div className="px-4 py-3 flex-auto ">
                <div className="tab-content tab-space">
                    {children}
                </div>
            </div>
        </div>
    )
}