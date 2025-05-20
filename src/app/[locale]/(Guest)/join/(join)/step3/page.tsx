import Step3Form from "@/lib/ui/forms/join/Step3Form";

export default function Step1() {
    return (
        <div className="w-2/3 flex flex-col items-center gap-8">
            <h1 className="text-headline-large mx-auto text-primary dark:text-dark-primary">Property</h1>
            <Step3Form/>
        </div>
    )
}