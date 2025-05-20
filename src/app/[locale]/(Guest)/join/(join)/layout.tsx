import JoinNavBar from "@/lib/ui/components/local/Dashboard/JoinNavBar";

export default function JoinLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex gap-4 px-6 items-center h-[calc(100vh-4rem)]">
            <JoinNavBar/>
            <div
                className="self-stretch flex items-center justify-center overflow-y-auto w-2/3"
            >
                {children}
            </div>
        </div>
    )
}