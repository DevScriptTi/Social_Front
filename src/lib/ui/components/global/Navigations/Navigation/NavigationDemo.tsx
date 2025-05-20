
export default function Navigation({children}:{children:React.ReactNode}){
    
    return(
        <aside className={` min-w-52 p-4 bg-surface-container dark:bg-dark-surface-container sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto )`}>
            <ul className="flex flex-col gap-4">
               {children}
            </ul>
        </aside>
    )
}