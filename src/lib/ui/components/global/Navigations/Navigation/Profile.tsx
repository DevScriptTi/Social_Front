import Link from "next/link";

export default function Profile({children , role , photo="#" ,link }:{children:React.ReactNode , role:string , photo:string , link:string}){
    return(
        <Link href={link} className="flex items-center gap-2 ps-2 hover:opacity-60">
            <img src={photo} alt="profile image" className="block rounded-full size-14 object-center object-fill" />
            <div className="flex flex-col gap-1 items-start">
                <h1 className="text-title-medium text-on-surface dark:text-dark-on-surface ">{children}</h1>
                <h3 className="text-label-small text-secondary dark:text-dark-secondary">{role}</h3>
            </div>
        </Link>
    )
}