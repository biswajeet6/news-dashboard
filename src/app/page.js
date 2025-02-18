'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import  LoadingState  from './components/LoadingState';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && status === "unauthenticated") {
      router.replace("/login");
    } else if (isClient && status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router, isClient]);

  if (!isClient) return null;
  if (status === "loading") return <LoadingState />;
  return null;
}
