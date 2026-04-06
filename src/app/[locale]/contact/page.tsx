import { getTranslations, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Contact from '@/components/Contact';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Common' });

  return (
    <main className="min-h-screen bg-primary">
      <Header />
      <section className="pt-24 sm:pt-28" />
      <Contact />
      <footer className="py-8 bg-primary border-t border-white/5 text-center">
        <p className="text-white/40 text-sm tracking-wide">
          {t('footerRights', { year: new Date().getFullYear() })}
        </p>
      </footer>
    </main>
  );
}
