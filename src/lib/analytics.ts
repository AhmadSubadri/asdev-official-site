export type AnalyticsPayload = {
  event: string;
  page?: string;
  label?: string;
  value?: number;
  meta?: Record<string, string | number | boolean | null>;
};

export async function trackEvent(payload: AnalyticsPayload) {
  if (typeof window === 'undefined') return;

  const body = {
    ...payload,
    page: payload.page || window.location.pathname,
    ts: Date.now(),
  };

  try {
    if ((window as any).dataLayer) {
      (window as any).dataLayer.push(body);
    }

    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics', blob);
      return;
    }

    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch {
    // Swallow error: tracking should never break user flow.
  }
}
