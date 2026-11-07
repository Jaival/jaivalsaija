'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * The path that wasn't found. The 404 page is prerendered once, so the
 * server can't know the path; it prints "…" and the browser fills in the
 * real one after hydration, with no mismatch.
 */
export default function MissingPath() {
  return useSyncExternalStore(
    subscribe,
    () => window.location.pathname,
    () => '…',
  );
}
