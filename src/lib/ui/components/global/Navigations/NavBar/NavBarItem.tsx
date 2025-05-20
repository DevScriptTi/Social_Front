'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBarItem({ children, link = "#" , ellips = false }: { children: React.ReactNode, link: string , ellips?: boolean }) {
    const path = usePathname()
    const isActive = path == link
    return <li className="block h-full">
        <Link href={link} className={`h-full px-2 text-title-large flex items-center justify-center ${!ellips ? "text-on-surface dark:text-dark-on-surface  hover:text-on-surface-variant dark:hover:text-dark-on-surface-variant":"text-on-primary dark:text-dark-on-primary  hover:text-on-primary-variant dark:hover:text-dark-on-primary-variant"} ${isActive?"text-secondary dark:text-dark-secondary font-semibold":""}`}>
            {children}
        </Link>
    </li>
}