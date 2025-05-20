import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function LandingContent({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-[calc(100vh_-_4rem)] flex  gap-4 items-center px-6">
            <Ellipse1 className='absolute -z-10 -bottom-24 start-0 text-primary dark:text-dark-primary' />
            <Ellipse2 className='absolute -z-10 bottom-0 end-0 text-primary dark:text-dark-primary' />
            <Ellipse3 className='absolute -z-10 -top-24 start-0 text-primary dark:text-dark-primary' />
            {children}
        </section>
    )
}

function Ellipse1({ className }: { className: string }) {
    return (
        <svg width="561" height="292" viewBox="0 0 561 292" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M-29 401.5C-29 523.279 660.338 0 548.5 0C436.662 0 -29 399.279 -29 277.5C-29 155.721 61.6623 57 173.5 57C285.338 57 -29 279.721 -29 401.5Z" fill="currentColor" />
        </svg>
    )
}

function Ellipse2({ className }: { className: string }) {
    return (
        <svg width="690" height="778" viewBox="0 0 690 778" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <g filter="url(#filter0_d_10_555)">
                <ellipse cx="419.5" cy="568.5" rx="415.5" ry="568.5" fill="currentColor" />
            </g>
            <defs>
                <filter id="filter0_d_10_555" x="0" y="0" width="839" height="1145" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_555" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10_555" result="shape" />
                </filter>
            </defs>
        </svg>
    )
}

function Ellipse3({ className }: { className: string }) {
    return (
        <svg width="266" height="212" viewBox="0 0 266 212" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <ellipse cx="84.5" cy="54" rx="181.5" ry="158" fill="currentColor" />
        </svg>
    )
}