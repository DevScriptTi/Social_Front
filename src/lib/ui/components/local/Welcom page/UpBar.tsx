import { getLocale, getTranslations } from "next-intl/server";
import UpBar from "../../global/Navigations/NavBar/NavBar";
import NavBarGroup from "../../global/Navigations/NavBar/NavBarGroupd";
import NavBarItem from "../../global/Navigations/NavBar/NavBarItem";
import { isAuth } from "@/lib/server/tools/auth";
import Logout from "./Logout";

export default async function UpBarGuest() {
    const auth = await isAuth()
    const t = await getTranslations()
    const locale = await getLocale()
    // console.log(locale)
    return (
        <UpBar isClient>
            <NavBarGroup>
                {
                    !auth ? (
                        <>
                            <NavBarItem link={`/${locale}/login`} ellips={true}>
                                {t('HomePage.UpBar.login')}
                            </NavBarItem>
                            <NavBarItem link={`/${locale}/register`} ellips={true} >
                                {t('HomePage.UpBar.register')}
                            </NavBarItem>
                        </>
                    ) : (
                        <>
                            <NavBarItem link={`/${locale}/dashboard`} ellips={true}>
                                {t('HomePage.UpBar.dashboard')}
                            </NavBarItem>
                            <Logout/>
                        </>

                    )
                }
            </NavBarGroup>
            <NavBarGroup grow>
                <NavBarItem link={`/${locale}/`}>
                    {t('HomePage.UpBar.home')}
                </NavBarItem>
            </NavBarGroup>
            <NavBarGroup>
                <NavBarItem link={`/${locale}/login`}>
                    Logo
                </NavBarItem>
            </NavBarGroup>
        </UpBar>
    )
} 
