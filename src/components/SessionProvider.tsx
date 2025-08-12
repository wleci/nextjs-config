"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function SessionProvider({ children }: Props) {
  return (
    <NextAuthSessionProvider
      refetchInterval={10 * 60} // Sprawdzaj sesję co 10 minut
      refetchOnWindowFocus={true} // Sprawdź przy powrocie do okna
      refetchWhenOffline={false} // Nie sprawdzaj gdy offline
    >
      {children}
    </NextAuthSessionProvider>
  );
}
