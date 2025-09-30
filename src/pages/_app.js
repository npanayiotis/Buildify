import "@/styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Layout/Navigation";
import MondernaChatbot from "@/components/Chatbot/MondernaChatbot";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const shouldHideNavbar =
    router.pathname === "/loader" || router.pathname === "/customize";

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AuthProvider>
          {!shouldHideNavbar && <Navigation />}
          <Component {...pageProps} />
          <MondernaChatbot />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}
