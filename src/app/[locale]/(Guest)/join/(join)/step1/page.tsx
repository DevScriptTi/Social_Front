import Step1Form from "@/lib/ui/forms/join/Step1Form";

export default function Step1() {
    return (
        <div className="w-2/3 flex flex-col items-center gap-8">
            <h1 className="text-headline-large mx-auto text-primary dark:text-dark-primary">Civil Status</h1>
            <Step1Form/>
        </div>
    )
}