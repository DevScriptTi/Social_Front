import { getApplication } from "@/lib/server/actions/join/applicant";
import Step4Form from "@/lib/ui/forms/join/Step4Form";
import Step6 from "@/lib/ui/forms/join/step6";
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
            <Step6 applicationResponse={application} />
        </div>
    )
}