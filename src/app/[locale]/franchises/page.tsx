import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import StrategicBlocks from '@/components/StrategicBlocks';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, ShieldCheck, TrendingUp, CheckCircle2, Target, Users, Zap } from 'lucide-react';

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
    }
  ];

  const benefits = [
    { icon: Target, title: "Pre-vetted Opportunities", desc: "Access to carefully selected franchise brands with proven business models and strong growth potential." },
    { icon: Users, title: "Expert Advisory Team", desc: "Navigate complex legal agreements and financial models with guidance from experienced franchise professionals." },
    { icon: Zap, title: "Accelerated Launch", desc: "Fast-track from decision to opening with coordinated site selection, training, and operational setup." }
  ];

  return (
    <main className="min-h-screen bg-primary">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-primary border-b border-white/5 relative overflow-hidden">
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-secondary/30 blur-3xl" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <p className="text-accent uppercase tracking-[0.35em] text-xs mb-4">{t('eyebrow')}</p>
          <h1 className="text-4xl md:text-6xl font-playfair text-white leading-tight max-w-4xl mb-6">
            {t('title')}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl leading-relaxed mb-10">
            {t('subtitle')}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-primary font-semibold tracking-wide hover:opacity-90 transition-opacity"
            >
              {t('primaryCta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white hover:text-accent hover:border-accent/60 transition-all"
            >
              {t('secondaryCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Franchises Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-6">Why Franchise Investment?</h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg">
              Franchise opportunities provide a proven business model, established brand recognition, ongoing operational support, and scalable growth potential with reduced risk compared to starting from scratch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="glass-elegant premium-card premium-card--strong rounded-2xl p-8 border border-white/10 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full border border-accent/30 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-playfair text-white mb-3">{benefit.title}</h3>
                  <p className="text-white/70 leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-24 bg-secondary/40 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-4">{t('advantageTitle')}</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Our comprehensive approach ensures every investment is protected, analyzed, and executed with institutional rigor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="glass-elegant premium-card premium-card--strong rounded-2xl p-8 border border-white/10">
                  <div className="w-14 h-14 bg-accent/10 rounded-full border border-accent/30 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-playfair text-white mb-3">{pillar.title}</h3>
                  <p className="text-white/70 leading-relaxed">{pillar.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Franchise Brands */}
      <section className="py-24 bg-primary">
        <StrategicBlocks />
      </section>

      {/* Five-Step Process */}
      <section className="py-24 bg-secondary/40 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-4">{t('flowTitle')}</h2>
            <p className="text-white/70 max-w-2xl mx-auto">A structured, transparent process from initial consultation to successful franchise launch and ongoing support.</p>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="premium-card premium-card--soft rounded-2xl border border-white/10 bg-primary/50 p-6 flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">{step}</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-playfair text-white mb-2">{t(`flow.step${step}Title`)}</h3>
                  <p className="text-white/70 leading-relaxed">{t(`flow.step${step}Desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair text-accent mb-4">{t('faqTitle')}</h2>
            <p className="text-white/70 max-w-2xl mx-auto">Get answers to common franchise investment questions and learn how we can help you succeed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <article key={item} className="premium-card premium-card--soft rounded-2xl border border-white/10 bg-secondary/30 p-8">
                <h3 className="text-lg font-playfair text-accent mb-4">{t(`faq.q${item}`)}</h3>
                <p className="text-white/70 leading-relaxed">{t(`faq.a${item}`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-20 bg-secondary/60 border-y border-white/5 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-accent/8 blur-3xl" />
        <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-playfair text-white mb-6">{t('bookCta')}</h2>
          <p className="text-lg text-white/70 mb-10">{t('bookDesc')}</p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent text-primary font-semibold tracking-wide hover:opacity-90 transition-opacity"
          >
            Schedule My Appointment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
