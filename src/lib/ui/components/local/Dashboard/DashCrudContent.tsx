import { Eye, Pencil, Trash } from "lucide-react"
import Link from "next/link"
import Button from "../../global/Buttons/Button"

export function DashContent({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col p-4 grow overflow-hidden">
            {children}
        </div>
    )
}
export function DashContenTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-start">
            <h1 className="text-title-large font-bold text-on-background dark:text-dark-on-background">{children}</h1>
        </div>
    )
}

export function DashContentStat({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-start gap-4 py-4">
            {children}
        </div>
    )
}

export function DashContentStatItem({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-start gap-4 p-4 bg-surface-container dark:bg-dark-surface-container text-on-surface dark:text-dark-on-surface rounded-lg ">
            <span className="size-20">{icon}</span>
            <div className="flex flex-col gap-1">
                <span className="text-headline-large">{value}</span>
                <span className="text-body-large">{title}</span>
            </div>
        </div>
    )
}

export function DashContentStatItemSkeleton() {
    return (
        <div className="animate-pulse flex items-center justify-start gap-4 p-4 bg-surface-container dark:bg-dark-surface-container rounded-lg">
            <div className="size-20 rounded-lg bg-surface-container-high dark:bg-dark-surface-container-high " />
            <div className="flex flex-col gap-1">
                <div className="h-8 w-24 bg-surface-container-high dark:bg-dark-surface-container-high rounded animate-pulse" />
                <div className="h-6 w-32 bg-surface-container-high dark:bg-dark-surface-container-high rounded animate-pulse" />
            </div>
        </div>
    )
}


export function DashContentAction({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-start">
            {children}
        </div>
    )
}

export function DashContentTable({ children }: { children?: React.ReactNode }) {
    return (

        <div className="relative overflow-x-auto py-4">
            <table className="w-full text-sm text-left rtl:text-right text-on-surface dark:text-dark-on-surface">
                {children}
            </table>
        </div>

    )
}

export function TableThead({ list }: { list: string[] }) {
    return (
        <thead className="text-label-large  uppercase bg-surface-container-low dark:bg-dark-surface-container-low ">
            <tr>
                {list.map((item, index) => (
                    <th key={index} scope="col" className="px-6 py-3">
                        {item}
                    </th>
                ))}
            </tr>
        </thead>
    )
}

export function TableTr({ children }: { children: React.ReactNode }) {
    return (
        <tr className="bg-surface-container-lowest  dark:bg-dark-surface-container-lowest border-b  border-outline-variant dark:border-dark-outline-variant" >
            {children}
        </tr>
    )
}

export function TableTdMain({ value }: { value: string }) {
    return (
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {value}
        </th>
    )
}

export function TableTd({ children }: { children: React.ReactNode }) {
    return (
        <td className="px-6 py-4">
            {children}
        </td>
    )
}

export function DashContentTableSkeleton() {
    return (
        <div className="relative overflow-x-auto py-4">
            <table className="w-full text-sm text-left rtl:text-right text-on-surface dark:text-dark-on-surface">
                <thead className="text-label-large uppercase bg-surface-container-low dark:bg-dark-surface-container-low">
                    <tr>
                        {[...Array(4)].map((_, index) => (
                            <th key={index} scope="col" className="px-6 py-3">
                                <div className="h-4 w-24 bg-surface-container-high dark:bg-dark-surface-container-high rounded animate-pulse" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, rowIndex) => (
                        <tr key={rowIndex} className="bg-surface-container-lowest dark:bg-dark-surface-container-lowest border-b border-outline-variant dark:border-dark-outline-variant">
                            {[...Array(4)].map((_, colIndex) => (
                                <td key={colIndex} className="px-6 py-4">
                                    <div className="h-4 w-20 bg-surface-container-high dark:bg-dark-surface-container-high rounded animate-pulse" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export function DashCrudOp({ type }: { type: "delete" | "view" | "edit" }) {

    const className = `flex items-center justify-center bg-transparent hover:opacity-60 transform transition-all duration-300 `;
    const deleteClassName = `text-error dark:text-dark-error`;
    const viewClassName = `text-indigo-700 dark:text-indigo-400`;
    const editClassName = `text-green-700 dark:text-green-400`;
    return (
        <span className={
            `cursor-pointer
            ${className}
            ${type === "delete" ? deleteClassName : type === "view" ? viewClassName : type === "edit" ? editClassName : ""}
            `} >
            {type === "delete" ? <Trash /> : type === "view" ? <Eye /> : type === "edit" ? <Pencil /> : ""}
        </span>
    )
}

export function DashContentPaginationSkeleton() {
    return (
        <div className="flex items-center justify-center gap-2">
            {[...Array(5)].map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center bg-surface-container-high dark:bg-dark-surface-container-high rounded-lg p-4 w-12 h-12 animate-pulse"
                />
            ))}
        </div>
    )
}

export  function DashContentPagination({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center gap-2">
            {children}
        </div>
    )
}
export function DashContentPaginationItem({ children, href }: { children: React.ReactNode, href: string }) {
    const isActive = href.includes("active");
    return (
        <a
            href={href}
            className={`flex items-center justify-center rounded-lg p-4 transition-colors duration-200
                ${isActive
                    ? 'bg-primary dark:bg-dark-primary text-on-primary dark:text-dark-on-primary'
                    : 'bg-secondary-container dark:bg-dark-secondary-container hover:bg-secondary-container-high dark:hover:bg-dark-secondary-container-high'
                }`}
        >
            {children}
        </a>
    )
}


export function DeleteButton({ children }: { children: React.ReactNode }) {
    return (
        <Button>
            <Trash />
        </Button>
    )
}



