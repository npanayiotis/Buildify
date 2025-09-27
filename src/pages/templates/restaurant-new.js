import React, { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the Restaurant template with no SSR
const RestaurantTemplate = dynamic(
  () => import("../../templates/restaurant/components/RestaurantTemplate"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">🍽️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Restaurant...
          </h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        </div>
      </div>
    ),
  }
);

const RestaurantPage = memo(() => {
  return (
    <>
      <Head>
        <title>Bella Vista Restaurant - Fine Dining Experience</title>
        <meta
          name="description"
          content="Experience exquisite cuisine in an elegant atmosphere. Fresh ingredients, masterful preparation, and exceptional service at Bella Vista Restaurant."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Bella Vista Restaurant - Fine Dining Experience" />
        <meta
          property="og:description"
          content="Experience exquisite cuisine in an elegant atmosphere. Fresh ingredients, masterful preparation, and exceptional service."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bella Vista Restaurant - Fine Dining Experience" />
        <meta
          name="twitter:description"
          content="Experience exquisite cuisine in an elegant atmosphere. Fresh ingredients, masterful preparation, and exceptional service."
        />
      </Head>
      <RestaurantTemplate />
    </>
  );
});

RestaurantPage.displayName = "RestaurantPage";

export default RestaurantPage;
