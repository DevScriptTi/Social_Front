import { LandingContent } from '@/lib/ui/components/local/Welcom page/landing/Content';
import { getTranslations } from 'next-intl/server';
import { Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Button from '@/lib/ui/components/global/Buttons/Button';
import Link from 'next/link';
import Image from 'next/image';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return (
    <LandingContent>
      <div className='flex flex-col gap-4  w-1/2'>
        <h1 className='text-display-large text-primary dark:text-dark-primary'>{t('title')}</h1>
        <p className='text-body-large text-on-surface dark:text-dark-on-surface'>{t('description')}</p>
        <div className='flex gap-4'>
          <Link href='/join'>
            <Button mode='outlined' >Join us</Button>
          </Link>
        </div>
        <div className="flex flex-col  gap-2 mt-4">
          <div className="flex  gap-2">
            <Phone className="text-primary dark:text-dark-primary" size={20} />
            <span className="text-on-surface dark:text-dark-on-surface">+1 (555) 123-4567</span>
            <span className="mx-2 text-on-surface dark:text-dark-on-surface">|</span>
            <span className="text-on-surface dark:text-dark-on-surface">+1 (555) 987-6543</span>
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
        <Image src={'/landing1.jpg'} alt='landing-image' className='size-full object-cover' width={500} height={500} />
      </div>
    </LandingContent>
  );
}