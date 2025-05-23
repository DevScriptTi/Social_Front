export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        
        <div className="flex items-center gap-4 px-6 h-[calc(100vh_-_4rem)]">
            {children}
        </div>
    );
}