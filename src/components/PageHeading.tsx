export default function ({heading}: {heading: string}) {
    return (
        <div className="grid grid-cols-[1fr_auto_1fr]">
            <div className="text-right">
                <img src="/h1-petals.png" alt="Header banner" className="inline h-10 sm:h-12" />
            </div>
            <h1 className="xs:px-2 sm:px-4 font-heading font-bold text-4xl sm:text-5xl text-transparent drop-shadow-[0px_4px_20px_#FFA2B4] bg-clip-text bg-gradient-to-b from-[#915D3A] to-[#613E26] to-75%">{heading}</h1>
            <div className="text-left">
                <img src="/h1-petals.png" alt="Header banner" className="inline h-10 sm:h-12 -scale-x-100" />
            </div>
        </div>
    )
}