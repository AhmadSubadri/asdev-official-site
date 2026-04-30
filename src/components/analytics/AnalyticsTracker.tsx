'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

const milestones = [25, 50, 75, 100];

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const fired = useRef(new Set<number>());

  useEffect(() => {
    fired.current = new Set();
    trackEvent({ event: 'page_view', page: pathname });

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.round((window.scrollY / scrollable) * 100);

      for (const mark of milestones) {
        if (progress >= mark && !fired.current.has(mark)) {
          fired.current.add(mark);
          trackEvent({ event: 'scroll_depth', page: pathname, value: mark });
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}
