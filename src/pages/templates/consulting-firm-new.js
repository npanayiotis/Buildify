import React, { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the Consulting Firm template with no SSR
const ConsultingFirmTemplate = dynamic(
  () => import("../../templates/consulting-firm/components/ConsultingFirmTemplate"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">💼</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Consulting Firm...
          </h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    ),
  }
);

const ConsultingFirmPage = memo(() => {
  return (
    <>
      <Head>
        <title>Strategic Partners Consulting - Business Transformation Experts</title>
        <meta
          name="description"
          content="Transform your business with strategic consulting, digital innovation, and proven methodologies. Expert consulting services for sustainable growth."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Strategic Partners Consulting - Business Transformation Experts" />
        <meta
          property="og:description"
          content="Transform your business with strategic consulting, digital innovation, and proven methodologies. Expert consulting services for sustainable growth."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Strategic Partners Consulting - Business Transformation Experts" />
        <meta
          name="twitter:description"
          content="Transform your business with strategic consulting, digital innovation, and proven methodologies. Expert consulting services for sustainable growth."
        />
      </Head>
      <ConsultingFirmTemplate />
    </>
  );
});

ConsultingFirmPage.displayName = "ConsultingFirmPage";

export default ConsultingFirmPage;
