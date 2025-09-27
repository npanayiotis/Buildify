import React, { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the Travel Agency Template with no SSR
const TravelAgencyTemplate = dynamic(
  () => import("../../templates/travel-agency/components/TravelAgencyTemplate"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">✈️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Travel Agency...
          </h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    ),
  }
);

const TravelAgencyNew = memo(() => {
  return (
    <>
      <Head>
        <title>Travel Agency - Adventure Template</title>
        <meta
          name="description"
          content="A modern travel agency template with destination showcases, booking forms, and travel packages."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TravelAgencyTemplate />
    </>
  );
});

TravelAgencyNew.displayName = "TravelAgencyNew";

export default TravelAgencyNew;
