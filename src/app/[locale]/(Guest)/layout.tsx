import UpBar from "@/lib/ui/components/local/Welcom page/UpBar";

export default function layout({children}: {children : React.ReactNode}) {
    return (
        <>
            <UpBar />
            {children}
        </>
    )
}