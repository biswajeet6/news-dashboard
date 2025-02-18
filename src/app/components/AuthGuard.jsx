'use client';

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import  LoadingState  from './LoadingState';

const publicPaths = ['/login', '/register', '/forgot-password'];

export function AuthGuard({ children }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    if (status === "unauthenticated" && !publicPaths.includes(pathname)) {
      router.replace("/login");
    } else if (status === "authenticated" && publicPaths.includes(pathname)) {
      router.replace("/dashboard");
    }
  }, [status, router, pathname, isClient]);

  if (!isClient) return null;
  if (status === "loading") return <LoadingState />;

  if (
    (status === "authenticated" && !publicPaths.includes(pathname)) ||
    (status === "unauthenticated" && publicPaths.includes(pathname))
  ) {
    return children;
  }

  return null;
}
