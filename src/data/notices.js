// ─────────────────────────────────────────────────────────────────────────────
//  notices.js — single source of truth for GST & Income Tax Notices
//  This is a manually curated notices system. Add/Edit entries below
//  whenever there is a real government portal update worth flagging.
// ─────────────────────────────────────────────────────────────────────────────

export const noticesData = [
  // PLACEHOLDER NOTICE 1 (Triggering popup alert on home/global view)
  {
    id: 'placeholder-gst-due-date-2026',
    title: 'GSTR-3B Filing Due Date Extended for Select Taxpayers',
    summary: 'The GST portal announces an extension for filing GSTR-3B returns for June tax periods. Verify status details to avoid automatic interest calculations.',
    source: 'gst',
    link: 'https://www.gst.gov.in/',
    date: '2026-07-05',
    important: true
  },
  // PLACEHOLDER NOTICE 2 (Browsable notice, not showing popup alert)
  {
    id: 'placeholder-itr-e-filing-2026',
    title: 'Income Tax Return (ITR) e-Filing Verification Window Revised',
    summary: 'The Central Board of Direct Taxes has reduced the ITR-V submission timeline to 30 days post e-filing. Ensure e-verification is finished to keep your return active.',
    source: 'itr',
    link: 'https://www.incometax.gov.in/',
    date: '2026-07-04',
    important: false
  }
];

export default noticesData;
