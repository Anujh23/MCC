// Class strings for the logged-in app (/client/*, /admin/): flat, sharp 2px corners, borders not shadows, no pills.
// The marketing site keeps its own rounded `btn` utilities; use these inside AppShell pages and their dialogs.

const button =
  'inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xs px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:cursor-wait disabled:opacity-60';

export const ui = {
  card: 'rounded-xs border border-ink-200 bg-white',
  cardHead: 'flex min-h-14 items-center justify-between gap-3 border-b border-ink-200 px-4 sm:px-5',
  h2: 'text-sm font-semibold text-ink-900',
  primary: `${button} bg-brand-600 text-white hover:bg-brand-700`,
  secondary: `${button} border border-ink-300 bg-white text-ink-900 hover:bg-ink-50`,
  /** Text-only action (Edit, Docs…): 44px tap target on phones, compact from sm up. Add a colour. */
  link: 'inline-flex min-h-11 items-center rounded-xs px-2 text-sm font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-brand-500 sm:min-h-8',
  dialog: 'm-auto w-[min(28rem,calc(100%-2rem))] rounded-xs border border-ink-200 p-0 shadow-xl backdrop:bg-ink-950/50',
  error: 'rounded-xs border border-rose-200 bg-rose-50 p-3 text-sm font-medium text-rose-900 empty:hidden',
  th: 'px-4 py-2.5 text-left text-xs font-semibold text-ink-500 sm:px-5',
  td: 'border-t border-ink-100 px-4 py-3 align-top sm:px-5',
};
