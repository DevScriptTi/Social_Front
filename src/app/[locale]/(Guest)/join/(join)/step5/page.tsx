import Step5Form from "@/lib/ui/forms/join/Step5Form";

export default function Step1() {
    return (
        <div className="w-2/3 flex flex-col items-center gap-8">
            <h1 className="text-headline-large mx-auto text-primary dark:text-dark-primary">Uploading Documents</h1>
            <Step5Form/>
        </div>
    )
}