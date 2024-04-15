import Head from 'next/head';
import { useEffect } from 'react';

function GoogleAnalytics() {
  useEffect(() => {
    if (process.env.NODE_ENV == 'production') {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', process.env.NEXT_PUBLIC_GTM_ID);
    }
  }, []);

  return (
    <Head>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
      />
    </Head>
  );
}

export default GoogleAnalytics;
