export default function NavBarGroup({children , grow = false}:{children:React.ReactNode , grow?:boolean}){
    return <nav className={`flex gap-2 justify-center ${grow?"grow":""}`}>
        <ul
            className="h-full flex"
        >
            {children}
        </ul>
    </nav>
}