import { getLocale, getTranslations } from "next-intl/server";
import Navigation from "../../global/Navigations/Navigation/NavigationDemo";
import Profile from "../../global/Navigations/Navigation/Profile";
import NavItem from "../../global/Navigations/Navigation/NavItem";
import NavGroup from "../../global/Navigations/Navigation/NavGroup";
import { Building2, File, User2Icon, UserCog } from "lucide-react";
import { getUser } from "@/lib/server/actions/auth/getUser";
import { isAdmin, isCommittee, isEmployee } from "@/lib/server/tools/auth";

export default async function NavBar_() {
    const t = await getTranslations()
    const locale = await getLocale()
    const user = await getUser()
    const type = user.user?.key?.keyable_type
    // console.log("user", user)
    return (
        <Navigation>
            <Profile photo="/profile.jpg" role={user.user?.key?.keyable_type || 'user'} link={`${locale}\dashboard`}>{user.user?.key?.keyable?.name + " " + user.user?.key?.keyable?.last || ''}</Profile>
            <NavItem link={`/${locale}/dashboard`} icon={<UserCog size={18} />}>
                {t('Dashboard.NavBar.Home')}
            </NavItem>
            <NavGroup title="Main">

                {await isAdmin() && (
                    <>
                        <NavItem link={`/${locale}/dashboard/admins`} icon={<UserCog size={18} />}>
                            {t('Dashboard.NavBar.Admin')}
                        </NavItem>
                        <NavItem link={`/${locale}/dashboard/committees`} icon={<Building2 size={18} />}>
                            {t('Dashboard.NavBar.Committee')}
                        </NavItem>
                    </>
                )}
                {
                    await isCommittee() && (
                        <>
                            <NavItem link={`/${locale}/dashboard/employees`} icon={<User2Icon size={18} />}>
                                {t('Dashboard.NavBar.Employee')}
                            </NavItem>
                            <NavItem link={`/${locale}/dashboard/socials`} icon={<Building2 size={18} />}>
                                {t('Dashboard.NavBar.Social')}
                            </NavItem>
                        </>

                    )
                }
                {
                    (await isCommittee() || await isEmployee()) && (
                        <NavItem link={`/${locale}/dashboard/applications`} icon={<File size={18} />}>
                            {t('Dashboard.NavBar.Application')}
                        </NavItem>
                    )
                }



            </NavGroup>
        </Navigation>
    )
}