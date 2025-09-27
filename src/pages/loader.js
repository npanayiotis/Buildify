import React, { memo } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the loader with no SSR to avoid hydration issues
const AnimatedLoader = dynamic(() => import("../components/Loader/AnimatedLoader"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  ),
});

const LoaderPage = memo(() => {
  return (
    <>
      <Head>
        <title>Website CRM - Loading...</title>
        <meta name="description" content="Customize your superb website in seconds and be online" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatedLoader />
    </>
  );
});

LoaderPage.displayName = "LoaderPage";

export default LoaderPage;
