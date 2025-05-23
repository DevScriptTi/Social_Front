import { getApplication } from "@/lib/server/actions/join/applicant";
import Step2Form from "@/lib/ui/forms/join/Step2Form";
import { Suspense } from "react";

export default async function Step2() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Step2_ />
        </Suspense>
    )
}
async function Step2_() {
    const application = await getApplication();
    return (
        <div className="w-2/3 flex flex-col items-center gap-8">
            <h1 className="text-headline-large mx-auto text-primary dark:text-dark-primary">Professional Status</h1>
            <Step2Form applicationResponse={application} />
        </div>
    )
}