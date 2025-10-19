import React from 'react';

interface StructuredDataProps {
  data: object;
}

export default function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  );
}

// Common structured data schemas
export const schemas = {
  organization: {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "China Travel Expert",
    "description": "Expert-curated China tours, travel guides, and cultural experiences.",
    "url": process.env.NEXT_PUBLIC_WEB_URL,
    "logo": `${process.env.NEXT_PUBLIC_WEB_URL}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/chinatravelexpert",
      "https://www.instagram.com/chinatravelexpert",
      "https://twitter.com/chinatravelexp"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+86-400-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Chinese"],
      "areaServed": "CN"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN",
      "addressRegion": "Beijing"
    }
  },

  tour: (tourData: any) => ({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tourData.name,
    "description": tourData.description,
    "image": tourData.image,
    "url": tourData.url,
    "provider": {
      "@type": "TravelAgency",
      "name": "China Travel Expert"
    },
    "touristType": "International",
    "itinerary": tourData.itinerary?.map((item: any) => ({
      "@type": "TouristAttraction",
      "name": item.name,
      "description": item.description
    })),
    "offers": {
      "@type": "Offer",
      "price": tourData.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString()
    }
  }),

  destination: (destinationData: any) => ({
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": destinationData.name,
    "description": destinationData.description,
    "image": destinationData.image,
    "url": destinationData.url,
    "containedInPlace": {
      "@type": "Country",
      "name": "China"
    },
    "touristType": "International",
    "hasMap": destinationData.mapUrl,
    "attractions": destinationData.attractions?.map((attraction: any) => ({
      "@type": "TouristAttraction",
      "name": attraction.name,
      "description": attraction.description
    }))
  }),

  article: (articleData: any) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": articleData.title,
    "description": articleData.description,
    "image": articleData.image,
    "author": {
      "@type": "Organization",
      "name": "China Travel Expert"
    },
    "publisher": {
      "@type": "Organization",
      "name": "China Travel Expert",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_WEB_URL}/logo.png`
      }
    },
    "datePublished": articleData.publishedDate,
    "dateModified": articleData.modifiedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleData.url
    }
  }),

  breadcrumb: (breadcrumbItems: Array<{name: string, url: string}>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }),

  faq: (faqItems: Array<{question: string, answer: string}>) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  })
};