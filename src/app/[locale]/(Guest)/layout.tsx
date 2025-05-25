import { Ellipse1, Ellipse3 } from "@/lib/ui/components/local/Welcom page/landing/Content";
import UpBar from "@/lib/ui/components/local/Welcom page/UpBar";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Ellipse1 className='absolute -z-10 -bottom-24 start-0 text-primary dark:text-dark-primary rtl:scale-x-[-1]' />
            {/* <Ellipse2 className='absolute -z-10 bottom-0 end-0 text-primary dark:text-dark-primary' /> */}
            <Ellipse3 className='absolute -z-10 -top-24 start-0 text-primary dark:text-dark-primary rtl:scale-x-[-1]' />
            <UpBar />
            {children}
        </>
    )
}