import { LandingContent } from '@/lib/ui/components/local/Welcom page/landing/Content';
import { getTranslations } from 'next-intl/server';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Button from '@/lib/ui/components/global/Buttons/Button';
import Link from 'next/link';
import Image from 'next/image';
import Conditions from './modal';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return (
    <LandingContent>
      <div className='flex flex-col gap-4  w-1/2'>
        <Image src={'/logo.png'} alt='logo' className='size-52 rounded-full' width={500} height={500} />
        <h1 className='text-display-large text-primary dark:text-dark-primary'>{t('title')}</h1>
        <p className='text-body-large text-on-surface dark:text-dark-on-surface'>{t('description')}</p>
        <div className='flex gap-4'>
          <Link href='/join'>
            <Button mode='filled' >{t('join')}</Button>
          </Link>
          <Conditions/>
        </div>
        <div className="flex flex-col  gap-2 mt-4">
          <div className="flex  gap-2">
            <Phone className="text-primary dark:text-dark-primary" size={20} />
            <span className="text-on-surface dark:text-dark-on-surface">+213 555678756</span>
            <span className="mx-2 text-on-surface dark:text-dark-on-surface">|</span>
            <span className="text-on-surface dark:text-dark-on-surface">+213 6562645756</span>
          </div>
          <div className="flex  gap-2">
            <Mail className="text-primary dark:text-dark-primary" size={20} />
            <span className="text-on-surface dark:text-dark-on-surface">contact@example.com</span>
          </div>

          <div className="flex gap-4 mt-2">
            <a href="#" className="text-on-surface hover:text-primary dark:text-dark-on-surface dark:hover:text-dark-primary transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-on-surface hover:text-primary dark:text-dark-on-surface dark:hover:text-dark-primary transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-on-surface hover:text-primary dark:text-dark-on-surface dark:hover:text-dark-primary transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-on-surface hover:text-primary dark:text-dark-on-surface dark:hover:text-dark-primary transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center w-1/2'>
        <Image src={'/landing1.jpg'} alt='landing-image' className='h-[calc(100vh_-_10rem)] ms-52 object-cover rounded-full transform rotate-[90]' width={500} height={500} />
      </div>
    </LandingContent>
  );
}