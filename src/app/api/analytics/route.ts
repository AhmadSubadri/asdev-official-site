export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

const allowedEvents = new Set(['page_view', 'scroll_depth', 'cta_click', 'form_submit']);

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!payload?.event || !allowedEvents.has(payload.event)) {
      return NextResponse.json({ success: false, message: 'Invalid event' }, { status: 400 });
    }

    console.log('[analytics]', {
      event: payload.event,
      page: payload.page,
      label: payload.label,
      value: payload.value,
      meta: payload.meta,
      ts: payload.ts,
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: 'Bad request' }, { status: 400 });
  }
}
