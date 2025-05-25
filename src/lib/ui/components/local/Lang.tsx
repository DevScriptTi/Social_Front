"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function Lang() {
    return (
        <div
            className="group relative flex items-center justify-center size-10 text-primary dark:text-dark-primary cursor-pointer"
        >
            <Languages />
            <ul className="invisible group-hover:visible   absolute z-10 top-10 left-0 bg-background dark:bg-dark-background rounded-md shadow-md">
                <li className="block ">
                    <Link lang="ar" title="HomePage.UpBar.lang.ar" />
                </li>
                <li className="block ">
                    <Link lang="en" title="HomePage.UpBar.lang.en" />
                </li>
                <li className="block ">
                    <Link lang="fr" title="HomePage.UpBar.lang.fr" />
                </li>
            </ul>
        </div>
    )
}


function Link({ lang , title}: { lang: string , title: string }) {
    const t = useTranslations();
    const locale = useLocale()

    return (
        <a className={`px-2 py-1 flex items-center justify-center  ${locale !== lang ? 'text-primary dark:text-dark-primary' : 'bg-primary dark:bg-dark-primary text-on-primary dark:text-on-dark-primary'}`} href={`/${lang}`}>{t(title)}</a>
    )
}
