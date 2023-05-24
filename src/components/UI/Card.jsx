export default function Card({ children, className }) {

    let style = `relative flex flex-col min-w-0 break-words mb-3 rounded shadow-lg`;
    style = `${style} ${className ? className : ""}`;
    
    return (
        <div className={style}
        >
            <div className="px-4 py-3 h-full">
                    {children}
            </div>
        </div>
    )
}