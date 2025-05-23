import { getApplicationView } from "@/lib/server/actions/join/applicant";
import { ApplicationResponse } from "@/lib/server/types/join/applicationUpdate";
import { DashContent, DashContenTitle } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import Image from "next/image";

export default async function applicationView({ params }: { params: { application: string } }) {
    const { application } = await params
    const applicationData: ApplicationResponse | { success: false } = await getApplicationView(application) as ApplicationResponse
    return (
        <DashContent>
            <h1 className="text-headline-large font-bold text-primary-container  dark:text-dark-primary-container">Application {applicationData?.application?.key} </h1>
            <Line />
            <ApplicantInfo applicationData={applicationData} />
            <Line />
            <HousingProfessionalProperty applicationData={applicationData} />

        </DashContent>
    )
}

function HousingProfessionalProperty({ applicationData }: { applicationData: ApplicationResponse }) {
    return (
        <>

            <div className="flex gap-6">
                <InfoGroup title="Professional  Information">
                    <InfoRow>
                        <Info label={'Is employed'} value={applicationData?.application?.professional?.is_employed ? 'Yes' : 'No'} />
                        <Info label={'Work Nature'} value={applicationData?.application?.professional?.work_nature ?? "N/A"} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={'Current job'} value={applicationData?.application?.professional?.current_job ?? "N/A"} />
                        <Info label={'Monthly income'} value={applicationData?.application?.professional?.monthly_income ?? "N/A"} />
                    </InfoRow>
                </InfoGroup>
                <InfoGroup title="Property Information">
                    <InfoRow>
                        <Info label={'Current Housing Type'} value={applicationData?.application?.housing?.current_housing_type ?? "N/A"} />
                        <Info label={'Previously Benefited'} value={applicationData?.application?.housing?.previously_benefited ? 'Yes' : 'No'} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={'Housing Area (m²)'} value={applicationData?.application?.housing?.housing_area ?? "N/A"} />
                        <Info label={'Other Properties'} value={applicationData?.application?.housing?.other_properties ? 'Yes' : 'No'} />
                    </InfoRow>
                </InfoGroup>
                <InfoGroup title="Medical Condition Information">
                    <InfoRow>
                        <Info label={'Chronic Illness or Disability'} value={applicationData?.application?.health?.chronic_illness_disability ?? "N/A"} />
                        <Info label={'Family Member Illness'} value={applicationData?.application?.health?.family_member_illness ?? "N/A"} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={'Relationship'} value={applicationData?.application?.health?.relationship ?? "N/A"} />
                        <Info label={'Type'} value={applicationData?.application?.health?.type ?? "N/A"} />
                    </InfoRow>
                </InfoGroup>
            </div>

        </>
    )
}

function ApplicantInfo({ applicationData }: { applicationData: ApplicationResponse }) {

    return (
        <>

            <div className="flex gap-6">
                <InfoGroup title="Applicant Information">
                    <InfoRow>
                        <Info label={'name'} value={applicationData?.application?.applicant?.name} />
                        <Info label={'last'} value={applicationData?.application?.applicant?.last} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={'Date of birth'} value={applicationData?.application?.applicant?.date_of_birth} />
                        <Info label={'Committee'} value={applicationData?.application?.applicant?.committee_id.toString()} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={'Email'} value={applicationData?.application?.applicant?.email} />
                        <Info label={'Phone'} value={applicationData?.application?.applicant?.phone} />
                    </InfoRow>

                    <InfoRow>
                        <Info label={'Gander'} value={applicationData?.application?.applicant?.gender} />
                        <Info label={'Status'} value={applicationData?.application?.applicant?.status} />
                    </InfoRow>
                </InfoGroup>
                {
                    applicationData?.application?.applicant?.status !== "single" && (
                        <InfoGroup title="Applicant Wife Information">
                            <InfoRow>
                                <Info label={'name'} value={applicationData?.application?.applicant?.wife?.name ?? "N/A"} />
                                <Info label={'last'} value={applicationData?.application?.applicant?.wife?.last ?? "N/A"} />
                            </InfoRow>
                            <InfoRow>
                                <Info label={'Date of birth'} value={applicationData?.application?.applicant?.wife?.date_of_birth ?? "N/A"} />
                                <Info label={'Place of birth'} value={applicationData?.application?.applicant?.wife?.place_of_birth ?? "N/A"} />
                            </InfoRow>
                            <InfoRow>
                                <Info label={'Residence Place'} value={applicationData?.application?.applicant?.wife?.residence_place ?? "N/A"} />
                            </InfoRow>
                            <InfoRow>
                                <Info label={'National ID Number'} value={applicationData?.application?.applicant?.wife?.national_id_number ?? "N/A"} />
                            </InfoRow>
                        </InfoGroup>
                    )
                }
                <PhotoAndQrCode applicationData={applicationData} />
            </div>

        </>

    )
}

function Info({ label, value }: { label: string, value: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-label-small text-on-surface-variant dark:text-dark-on-surface-variant">
                {label}
            </span>
            <span className="text-body-large text-on-surface dark:text-dark-on-surface">
                {value}
            </span>
        </div>
    )
}

function InfoRow({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex  gap-4">
            {children}
        </div>
    )
}

function InfoGroup({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <div className="flex flex-col gap-6 py-4">
            <h1 className="text-title-large font-semibold text-secondary  dark:text-dark-secondary">
                {title}
            </h1>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}

function PhotoAndQrCode({ applicationData }: { applicationData: ApplicationResponse }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="h-full flex flex-col justify-center items-center gap-4 p-4 border-2 border-primary  dark:border-dark-primary rounded-lg">
                <Image src={applicationData?.application?.qrcode.value} alt="Photo" width={200} height={200} />
            </div>
        </div>
    )
}

function Line() {
    return (
        <div className="h-0.5 my-6 px-8 w-full bg-primary-container  dark:bg-dark-primary-container" />
    )
}