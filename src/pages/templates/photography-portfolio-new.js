import React, { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the Photography Portfolio template with no SSR
const PhotographyPortfolioTemplate = dynamic(
  () => import("../../templates/photography-portfolio/components/PhotographyPortfolioTemplate"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">📸</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Loading Photography Portfolio...
          </h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    ),
  }
);

const PhotographyPortfolioPage = memo(() => {
  return (
    <>
      <Head>
        <title>Alex Photography - Professional Photography Portfolio</title>
        <meta
          name="description"
          content="Professional photography services for weddings, portraits, events, and commercial work. Capturing moments that tell stories."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Alex Photography - Professional Photography Portfolio" />
        <meta
          property="og:description"
          content="Professional photography services for weddings, portraits, events, and commercial work. Capturing moments that tell stories."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alex Photography - Professional Photography Portfolio" />
        <meta
          name="twitter:description"
          content="Professional photography services for weddings, portraits, events, and commercial work. Capturing moments that tell stories."
        />
      </Head>
      <PhotographyPortfolioTemplate />
    </>
  );
});

PhotographyPortfolioPage.displayName = "PhotographyPortfolioPage";

export default PhotographyPortfolioPage;
