import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the animated loader page
    router.push("/loader");
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
          <span className="text-white font-bold text-lg">WC</span>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Website CRM</h1>
        <p className="text-gray-300">Loading your experience...</p>
      </div>
    </div>
  );
}
