import Header from '@/components/Header';
import Contact from '@/components/Contact';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, CheckCircle2, ShieldCheck, TrendingUp } from 'lucide-react';

export default async function FranchisesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('FranchisesPage');
  const common = await getTranslations({ locale, namespace: 'Common' });

  const pillars = [
    {
      icon: ShieldCheck,
      title: t('pillars.legalTitle'),
      desc: t('pillars.legalDesc')
    },
    {
      icon: TrendingUp,
      title: t('pillars.growthTitle'),
      desc: t('pillars.growthDesc')
    },
    {
      icon: CheckCircle2,
      title: t('pillars.executionTitle'),
      desc: t('pillars.executionDesc')
    }
  ];

  return (
    <main className="min-h-screen bg-primary">
      <Header />

      <section className="pt-40 pb-20 bg-primary border-b border-white/5 relative overflow-hidden">
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-secondary/30 blur-3xl" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <p className="text-accent uppercase tracking-[0.35em] text-xs mb-4">{t('eyebrow')}</p>
          <h1 className="text-4xl md:text-6xl font-playfair text-accent leading-tight max-w-4xl mb-6">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-10">
            {t('subtitle')}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-[#fff] font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              {t('primaryCta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/80 hover:text-accent hover:border-accent/50 transition-colors"
            >
              {t('secondaryCta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-playfair text-accent mb-10">{t('advantageTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <article key={pillar.title} className="glass-elegant premium-card premium-card--strong rounded-2xl p-7 border border-white/10">
                  <div className="icon-shell w-12 h-12 rounded-full border flex items-center justify-center mb-5">
                    <Icon className="icon-glyph w-6 h-6" strokeWidth={1.7} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-playfair text-white/90 sm:text-white mb-3">{pillar.title}</h3>
                  <p className="text-white/70 leading-relaxed">{pillar.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/60 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-playfair text-accent mb-10">{t('flowTitle')}</h2>
          <div className="space-y-5">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="premium-card premium-card--soft rounded-2xl border border-white/10 bg-primary/60 px-6 py-5 flex flex-col md:flex-row md:items-center gap-4">
                <div className="text-accent font-bold tracking-[0.2em] text-sm min-w-20">0{step}</div>
                <div>
                  <h3 className="text-lg sm:text-xl text-white/90 sm:text-white font-playfair mb-1">{t(`flow.step${step}Title`)}</h3>
                  <p className="text-white/70 leading-relaxed">{t(`flow.step${step}Desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-playfair text-accent mb-10">{t('faqTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4].map((item) => (
              <article key={item} className="premium-card premium-card--soft rounded-2xl border border-white/10 bg-secondary/30 px-6 py-5">
                <h3 className="text-lg sm:text-xl font-playfair text-white/90 sm:text-white mb-2">{t(`faq.q${item}`)}</h3>
                <p className="text-white/70 leading-relaxed">{t(`faq.a${item}`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Contact />

      <footer className="py-8 bg-primary border-t border-white/5 text-center">
        <p className="text-white/40 text-sm tracking-wide">
          {common('footerRights', { year: new Date().getFullYear() })}
        </p>
      </footer>
    </main>
  );
}
