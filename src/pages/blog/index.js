import { useEffect } from "react";
import { useRouter } from "next/router";

export default function BlogIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to blog home page
    router.replace("/blog/home");
  }, [router]);

  return null;
}
