"use client";
import { useEffect, useState } from "react";
import QrScanner from "./QrScanner";
import { getNationalCard } from "@/lib/server/actions/join/NationalCardAction";
import { useRouter } from "next/navigation";

export default function QrPage() {
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fetchNationalCard = async () => {
            if (result) {
                setIsLoading(true);
                const response = await getNationalCard({ national_card_id: result });
                if (response.success) {
                    router.push('/join/step1');
                }
            }
        };
        fetchNationalCard();
    }, [result]);
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Scan a QR Code</h1>
            <QrScanner onScanSuccess={(data) => setResult(data)} />
            {result && (
                <div className={`mt-4 ${isLoading ? 'animate-pulse' : ''}`}>
                    <strong>Scanned:</strong> {result}
                </div>
            )}
        </div>
    );
}
