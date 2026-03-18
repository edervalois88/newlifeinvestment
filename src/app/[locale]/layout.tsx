import {NextIntlClientProvider} from 'next-intl';
import { getTranslations, getMessages, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import {routing} from '@/i18n/routing';
import { Inter, Playfair_Display, Lora } from 'next/font/google';
import '../globals.css';
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    keywords: t('keywords'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es-MX': '/es',
        'en-US': '/en',
        'ar-SA': '/ar'
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!routing.locales.includes(locale as "es" | "en" | "ar")) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const isRtl = locale === 'ar';

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${lora.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
