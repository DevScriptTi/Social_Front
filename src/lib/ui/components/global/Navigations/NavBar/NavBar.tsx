export default function UpBar({ children, isClient = false }: { children: React.ReactNode, isClient?: boolean }) {
    
    return <header className={`sticky top-0 h-16 z-10 flex items-center px-2 md:px-4 ${!isClient ? "bg-surface-container dark:bg-dark-surface-container" : ""} `}>
        {children}
    </header>
}

