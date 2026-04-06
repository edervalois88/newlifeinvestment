import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://newlifeinvestments.mx';
  const lastModified = new Date();
  const locales = ['es', 'en', 'ar'] as const;
  const staticRoutes = ['', '/about', '/services', '/process', '/gateway', '/contact', '/franchises'] as const;

  return staticRoutes.flatMap((route) => {
    const alternates = Object.fromEntries(
      locales.map((locale) => [locale, `${baseUrl}/${locale}${route}`])
    );

    return locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified,
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? (locale === 'es' ? 1.0 : 0.8) : route === '/franchises' ? 0.9 : 0.75,
      alternates: {
        languages: alternates
      }
    }));
  });
}
