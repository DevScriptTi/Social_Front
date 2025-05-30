"use client"

import Button from "@/lib/ui/components/global/Buttons/Button"
import Modal, { openModal } from "@/lib/ui/components/global/Modal/Modal"
import { useTranslations } from "use-intl"

export default function Conditions() {
    const t = useTranslations('HomePage.conditions')
    const tModal = useTranslations('HomePage.conditions.modal.eligibility_requirements')
    const tDocs = useTranslations('HomePage.conditions.modal.required_documents')
    
    // Manually list the items since we can't use arrays directly
    const previousBenefitsItems = [
        tModal('previous_benefits.items.0'),
        tModal('previous_benefits.items.1'),
        tModal('previous_benefits.items.2'),
        tModal('previous_benefits.items.3'),
        tModal('previous_benefits.items.4')
    ]

    const personalDocs = [
        tDocs('personal_documents.0'),
        tDocs('personal_documents.1'),
        tDocs('personal_documents.2'),
        tDocs('personal_documents.3'),
        tDocs('personal_documents.4')
    ]

    const adminDocs = [
        tDocs('administrative_documents.0'),
        tDocs('administrative_documents.1'),
        tDocs('administrative_documents.2'),
        tDocs('administrative_documents.3'),
        tDocs('administrative_documents.4')
    ]

    const otherDocs = [
        tDocs('other_documents.0'),
        tDocs('other_documents.1'),
        tDocs('other_documents.2')
    ]

    return (
        <>
            <Button mode='outlined' click={() => openModal('conditions')}>{t('title')}</Button>
            <Modal id="conditions">
                <div  className="w-1/2 h-screen bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden flex flex-col transition-colors duration-300">
                    <div className="bg-primary-light dark:bg-primary-dark p-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-white">{t('title')}</h1>
                        <button id="themeToggle" className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 text-gray-800 dark:text-gray-200">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">{t('title')}</h2>
                            <ul className="space-y-4 list-disc pr-5">
                                <li className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                    {tModal('monthly_income')}
                                </li>
                                <li className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                    {tModal('property_ownership')}
                                </li>
                                <li className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                    {tModal('previous_benefits.description')}
                                    <ul className="mt-2 space-y-2 list-circle pr-5 text-gray-600 dark:text-gray-400">
                                        {previousBenefitsItems.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="border-b border-gray-200 dark:border-gray-700 pb-3">
                                    {tModal('residency')}
                                </li>
                                <li>
                                    {tModal('age')}
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-primary-light dark:text-primary-dark">Required Documents</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h3 className="font-medium text-secondary-light dark:text-secondary-dark mb-2">Personal Documents</h3>
                                    <ul className="space-y-2 text-sm">
                                        {personalDocs.map((doc, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="mr-2">•</span>
                                                <span>{doc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                    <h3 className="font-medium text-secondary-light dark:text-secondary-dark mb-2">Administrative Documents</h3>
                                    <ul className="space-y-2 text-sm">
                                        {adminDocs.map((doc, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="mr-2">•</span>
                                                <span>{doc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg md:col-span-2">
                                    <h3 className="font-medium text-secondary-light dark:text-secondary-dark mb-2">Other Documents</h3>
                                    <ul className="space-y-2 text-sm">
                                        {otherDocs.map((doc, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="mr-2">•</span>
                                                <span>{doc}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 p-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} All Rights Reserved
                    </div>
                </div>
            </Modal>
        </>
    )
}