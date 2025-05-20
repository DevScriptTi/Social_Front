"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavItem({children , icon , link }:{children:React.ReactNode , icon:React.ReactNode , link:string }){
    const path = usePathname()
    const isActive = path === link && path !== '/'
    console.log(path);
    const baseClass = `h-8 flex gap-2 ps-2 items-center justify-start text-label-large rounded-md ${!isActive?"text-on-surface dark:text-dark-on-surface hover:bg-surface-variant hover:bg-dark-surface-variant hover:text-on-surface-variant hover:text-dark-on-surface-variant ":""}`
    return(
        <li className={`block size-auto`}>
            <Link href={link} className={`${baseClass} ${isActive?"bg-secondary dark:bg-dark-secondary hover:bg-secondary/55 hover:dark:bg-dark-secondary/55  text-on-secondary dark:text-dark-on-secondary":""}`}>
                <span>{icon}</span>
                <span>{children}</span>
            </Link>
        </li>
    )
}