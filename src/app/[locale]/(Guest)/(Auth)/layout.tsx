export default function Layout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    return (
        
        <div className="flex items-center gap-4 px-6 h-[calc(100vh_-_4rem)]">
            {children}
        </div>
    );
}