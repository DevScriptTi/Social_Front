import NavBar from "@/lib/ui/components/local/Dashboard/NavBar";
import UpBar from "@/lib/ui/components/local/Dashboard/UpBar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <UpBar />
            <div className="flex">
                <NavBar />
                {children}
            </div>
        </>
    )
}