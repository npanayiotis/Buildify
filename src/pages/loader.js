import React, { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the loader with no SSR to avoid hydration issues
const AnimatedLoader = dynamic(
  () => import("../components/Loader/AnimatedLoader"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Elevare</h1>
          <p className="text-gray-300">Loading your experience...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    ),
  }
);

const LoaderPage = memo(() => {
  return (
    <>
      <Head>
        <title>Elevare - Loading...</title>
        <meta
          name="description"
          content="Elevate your online presence with stunning websites created in seconds"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatedLoader />
    </>
  );
});

LoaderPage.displayName = "LoaderPage";

export default LoaderPage;
