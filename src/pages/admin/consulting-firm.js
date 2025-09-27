import React, { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the Consulting Firm Admin Dashboard with no SSR
const AdminDashboard = dynamic(
  () => import("../../templates/consulting-firm/components/AdminDashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">💼</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Loading Admin Dashboard...
          </h2>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    ),
  }
);

const ConsultingFirmAdminPage = memo(() => {
  return (
    <>
      <Head>
        <title>Consulting Firm Admin Dashboard - Strategic Partners Consulting</title>
        <meta
          name="description"
          content="Manage your consulting services, case studies, and client engagements with our comprehensive admin dashboard."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminDashboard />
    </>
  );
});

ConsultingFirmAdminPage.displayName = "ConsultingFirmAdminPage";

export default ConsultingFirmAdminPage;
