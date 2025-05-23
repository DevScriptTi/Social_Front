import { getApplication } from "@/lib/server/actions/join/applicant";
import Step4Form from "@/lib/ui/forms/join/Step4Form";
import { Suspense } from "react";
export default function Step1() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Step4_ />
        </Suspense>
    )
}

async function Step4_() {
    const application = await getApplication();
    return (
        <div className="w-2/3 flex flex-col items-center gap-8">
            <h1 className="text-headline-large mx-auto text-primary dark:text-dark-primary">Medical Condition</h1>
            <Step4Form applicationResponse={application} />
        </div>
    )
}