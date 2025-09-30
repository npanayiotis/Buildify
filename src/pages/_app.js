import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Layout/Navigation";
import MondernaChatbot from "@/components/Chatbot/MondernaChatbot";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const shouldHideNavbar =
    router.pathname === "/loader" || router.pathname === "/customize";

  return (
    <AuthProvider>
      {!shouldHideNavbar && <Navigation />}
      <Component {...pageProps} />
      <MondernaChatbot />
    </AuthProvider>
  );
}
