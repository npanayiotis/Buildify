import React, { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the Restaurant Admin Dashboard with no SSR
const AdminDashboard = dynamic(
  () => import("../../templates/restaurant/components/AdminDashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">🍽️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Admin Dashboard...
          </h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
        </div>
      </div>
    ),
  }
);

const RestaurantAdminPage = memo(() => {
  return (
    <>
      <Head>
        <title>Restaurant Admin Dashboard - Bella Vista Restaurant</title>
        <meta
          name="description"
          content="Manage your restaurant menu, reservations, and operations with our comprehensive admin dashboard."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminDashboard />
    </>
  );
});

RestaurantAdminPage.displayName = "RestaurantAdminPage";

export default RestaurantAdminPage;
