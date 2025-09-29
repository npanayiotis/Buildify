import React, { memo } from "react";
import Head from "next/head";
import Navigation from "./Navigation";
import { motion } from "framer-motion";

const Layout = memo(({
  children,
  title = "Elevare",
  description = "Elevate your online presence with stunning websites created in seconds",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Navigation />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pt-16"
        >
          {children}
        </motion.main>
      </div>
    </>
  );
});

Layout.displayName = "Layout";

export default Layout;
