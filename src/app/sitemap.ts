import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://newlifeinvestments.mx';

  // Prioritizing the Mexican division's subpaths
  return [
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'es': `${baseUrl}/es`,
          'en': `${baseUrl}/en`,
          'ar': `${baseUrl}/ar`
        }
      }
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          'es': `${baseUrl}/es`,
          'en': `${baseUrl}/en`,
          'ar': `${baseUrl}/ar`
        }
      }
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'es': `${baseUrl}/es`,
          'en': `${baseUrl}/en`,
          'ar': `${baseUrl}/ar`
        }
      }
    },
  ];
}
