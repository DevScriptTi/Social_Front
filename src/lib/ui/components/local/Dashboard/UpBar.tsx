import { getLocale, getTranslations } from "next-intl/server";
import NavBarGroup from "../../global/Navigations/NavBar/NavBarGroupd";
import NavBarItem from "../../global/Navigations/NavBar/NavBarItem";
import UpBar from "../../global/Navigations/NavBar/NavBar";
import Lang from "../Lang";
import Mode from "../Mode";

export default async function UpBarDash() {
    const t = await getTranslations()
    const locale = await getLocale()
    return (
        <UpBar>
            <NavBarGroup>
                <NavBarItem link={`/${locale}/`}>{t('Dashboard.UpBar.Leave')}</NavBarItem>
                <NavBarItem link={`/${locale}/dashboard`}>{t('Dashboard.UpBar.Home')}</NavBarItem>
                <Mode />
                <Lang />
            </NavBarGroup>
        </UpBar>
    )
}