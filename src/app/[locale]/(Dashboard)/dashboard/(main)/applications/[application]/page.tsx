import { getApplicationView } from "@/lib/server/actions/join/applicant";
import { ApplicationResponse } from "@/lib/server/types/join/applicationUpdate";
import { DashContent } from "@/lib/ui/components/local/Dashboard/DashCrudContent";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AcceptOrReject from "./AcceptOrReject";

export default async function applicationView({ params }: { params: { application: string } }) {
    const { application } = await params
    const t = await getTranslations('Dashboard.content.applications.view');
    const t2 = await getTranslations('Dashboard.content.applications.table');
    const applicationData: ApplicationResponse | { success: false } = await getApplicationView(application) as ApplicationResponse
    console.log(applicationData.application.status);
    return (
        <DashContent>
            <h1 className="text-headline-large font-bold text-primary-container  dark:text-dark-primary-container">{t('title')} {applicationData?.application?.key} </h1>
            <div
                className="mt-4 flex items-center gap-2"
            >
                {
                    applicationData?.application?.status === 'pending' && <span className="text-yellow-700 dark:text-yellow-400">{t2('pending')}</span> ||
                    applicationData?.application?.status === 'on-review' && <span className="text-blue-700 dark:text-blue-400">{t2('completed')}</span> ||
                    applicationData?.application?.status === 'not-classed' && <span className="text-orange-700 dark:text-orange-400">{t2('accepted')}</span> ||
                    applicationData?.application?.status === 'accepted' && <span className="text-green-700 dark:text-green-400">{t2('classed')}</span> ||
                    applicationData?.application?.status === 'denied' && <span className="text-red-700 dark:text-red-400">{t2('denied')}</span>
                }
                {
                    applicationData?.application?.status === 'on-review' && <AcceptOrReject applicationData={applicationData} />
                }
            </div>
            <Line />
            <div className="flex gap-4">
                <span
                    className="text-title-large text-on-surface-variant dark:text-dark-on-surface-variant"
                >{t('grade')}: {applicationData?.application?.grade ?? t('n/a')} </span>
            </div>
            <Line />
            <ApplicantInfo applicationData={applicationData} />
            <Line />
            <HousingProfessionalProperty applicationData={applicationData} />

        </DashContent>
    )
}

async function HousingProfessionalProperty({ applicationData }: { applicationData: ApplicationResponse }) {
    const t = await getTranslations('Dashboard.content.applications.view');
    return (
        <>

            <div className="flex gap-6">
                <InfoGroup title={t('professional_information')}>
                    <InfoRow>
                        <Info label={t('is_employed')} value={applicationData?.application?.professional?.is_employed ? 'Yes' : 'No'} />
                        <Info label={t('work_nature')} value={applicationData?.application?.professional?.work_nature ?? "N/A"} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={t('current_job')} value={applicationData?.application?.professional?.current_job ?? "N/A"} />
                        <Info label={t('monthly_income')} value={applicationData?.application?.professional?.monthly_income ?? "N/A"} />
                    </InfoRow>
                </InfoGroup>
                <InfoGroup title={t('property_information')}>
                    <InfoRow>
                        <Info label={t('current_housing_type')} value={applicationData?.application?.housing?.current_housing_type ?? "N/A"} />
                        <Info label={t('previously_benefited')} value={applicationData?.application?.housing?.previously_benefited ? 'Yes' : 'No'} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={t('housing_area')} value={applicationData?.application?.housing?.housing_area ?? "N/A"} />
                        <Info label={t('other_properties')} value={applicationData?.application?.housing?.other_properties ? 'Yes' : 'No'} />
                    </InfoRow>
                </InfoGroup>
                <InfoGroup title={t('medical_condition_information')}>
                    <InfoRow>
                        <Info label={t('chronic_illness_disability')} value={applicationData?.application?.health?.chronic_illness_disability ?? "N/A"} />
                        <Info label={t('family_member_illness')} value={applicationData?.application?.health?.family_member_illness ?? "N/A"} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={t('relationship')} value={applicationData?.application?.health?.relationship ?? "N/A"} />
                        <Info label={t('type')} value={applicationData?.application?.health?.type ?? "N/A"} />
                    </InfoRow>
                </InfoGroup>
            </div>

        </>
    )
}

async function ApplicantInfo({ applicationData }: { applicationData: ApplicationResponse }) {
    const t = await getTranslations('Dashboard.content.applications.view');
    return (
        <>

            <div className="flex gap-6">
                <InfoGroup title="Applicant Information">
                    <InfoRow>
                        <Info label={t('name')} value={applicationData?.application?.applicant?.name} />
                        <Info label={t('last')} value={applicationData?.application?.applicant?.last} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={t('date_of_birth')} value={applicationData?.application?.applicant?.date_of_birth} />
                        <Info label={t('committee')} value={applicationData?.application?.applicant?.committee_id.toString()} />
                    </InfoRow>
                    <InfoRow>
                        <Info label={t('email')} value={applicationData?.application?.applicant?.email} />
                        <Info label={t('phone')} value={applicationData?.application?.applicant?.phone} />
                    </InfoRow>

                    <InfoRow>
                        <Info label={t('gander')} value={applicationData?.application?.applicant?.gender} />
                        <Info label={t('status')} value={applicationData?.application?.applicant?.status} />
                    </InfoRow>
                </InfoGroup>
                {
                    applicationData?.application?.applicant?.status !== "single" && (
                        <InfoGroup title={t('applicant_wife_information')}>
                            <InfoRow>
                                <Info label={t('wife_name')} value={applicationData?.application?.applicant?.wife?.name ?? t('n/a')} />
                                <Info label={t('wife_last')} value={applicationData?.application?.applicant?.wife?.last ?? t('n/a')} />
                            </InfoRow>
                            <InfoRow>
                                <Info label={t('wife_date_of_birth')} value={applicationData?.application?.applicant?.wife?.date_of_birth ?? t('n/a')} />
                                <Info label={t('wife_place_of_birth')} value={applicationData?.application?.applicant?.wife?.place_of_birth ?? t('n/a')} />
                            </InfoRow>
                            <InfoRow>
                                <Info label={t('wife_residence_place')} value={applicationData?.application?.applicant?.wife?.residence_place ?? t('n/a')} />
                            </InfoRow>
                            <InfoRow>
                                <Info label={t('wife_national_id_number')} value={applicationData?.application?.applicant?.wife?.national_id_number ?? t('n/a')} />
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