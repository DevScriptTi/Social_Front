import NnationalCardForm from "@/lib/ui/forms/join/NnationalCardForm";
import QRCodeScanner  from "./QrCode";
export default function JoinPage() {
    return (
        <div
            className="flex items-center justify-center h-[calc(100vh-4rem)]"
        >
           <QRCodeScanner />
           <NnationalCardForm />
        </div>
    )
}