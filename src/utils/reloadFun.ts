export function preventClose(e: BeforeUnloadEvent) {
  e.preventDefault();
  e.returnValue = '';
}

export function detectReload() {
  const entries = performance.getEntriesByType('navigation')[0];
  const entriesNavTiming = entries as PerformanceNavigationTiming;
  if (entriesNavTiming.type == 'reload') return true;
  else return false;
}
