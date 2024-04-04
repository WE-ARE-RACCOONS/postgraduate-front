export function preventClose(e: BeforeUnloadEvent) {
  e.preventDefault();
  e.returnValue = '';
}

export function detectReload() {
  const entries = performance.getEntriesByType('navigation')[0];
  const entriesNavTiming = entries as PerformanceNavigationTiming;

  if (entriesNavTiming.type == 'reload') { // 새로고침인 경우
    window.location.href = window.location.origin + '/signup/select';
  }
}
