'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { CLIENT_ENV } from '@/lib/env/client';

const convex = new ConvexReactClient(CLIENT_ENV.NEXT_PUBLIC_CONVEX_URL);

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
