export default function NavGroup({children , title }:{children:React.ReactNode , title:string}){
    return(
        <nav className="flex flex-col gap-3 justify-start border-b border-outline-variant dark:border-dark-outline-variant pb-3 ">
            <h1 className="text-label-small ps-3 text-on-surface-variant">{title}</h1>
            <ul className="w-full flex flex-col grow">
               {children} 
            </ul>
        </nav>
    )
}