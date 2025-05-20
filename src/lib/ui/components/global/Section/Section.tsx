export default function DashSection({children}:{children:React.ReactNode}){
    return(
        <section className="grow flex flex-col w-full px-3 py-4 h-[400rem]">
            {children}
        </section>
    )
}