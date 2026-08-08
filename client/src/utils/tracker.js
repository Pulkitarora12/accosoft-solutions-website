// Session and activity tracking utility

const SESSION_KEY = 'accosoft_session_id';
const LOGS_KEY = 'accosoft_session_logs';

export function getSessionId() {
  let sessionId = sessionStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    // Generate a unique session ID
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + '_' + Date.now();
    sessionStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

function getStoredLogs() {
  const data = sessionStorage.getItem(LOGS_KEY);
  return data ? JSON.parse(data) : { pageHistory: [], searchHistory: [] };
}

function saveLogs(logs) {
  sessionStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

// Log a page view and update the duration of the previous page
export function logPageView(path) {
  const logs = getStoredLogs();
  const now = Date.now();
  const timestamp = new Date().toISOString();

  // 1. Update duration of the last page view if one exists
  if (logs.pageHistory.length > 0) {
    const lastPage = logs.pageHistory[logs.pageHistory.length - 1];
    if (lastPage.path === path) return; // Prevent duplicate logs on re-renders
    
    const duration = Math.round((now - new Date(lastPage.enteredAt).getTime()) / 1000);
    lastPage.duration = duration > 0 ? duration : 1; // Minimum 1 second
  }

  // 2. Add new page log
  logs.pageHistory.push({
    path,
    enteredAt: timestamp,
    duration: null // Will be updated on next page navigation or exit
  });

  saveLogs(logs);
}

// Handle browser exit/close to calculate the last page's time spent
export function logPageExit() {
  const logs = getStoredLogs();
  if (logs.pageHistory.length > 0) {
    const lastPage = logs.pageHistory[logs.pageHistory.length - 1];
    if (lastPage.duration === null) {
      const now = Date.now();
      const duration = Math.round((now - new Date(lastPage.enteredAt).getTime()) / 1000);
      lastPage.duration = duration > 0 ? duration : 1;
      saveLogs(logs);
    }
  }
}

// Log search queries with a debounce safeguard
let lastQueryText = '';
export function logSearchQuery(query, path) {
  const cleanQuery = query.trim();
  if (!cleanQuery || cleanQuery === lastQueryText) return;
  
  lastQueryText = cleanQuery;
  const logs = getStoredLogs();
  const timestamp = new Date().toISOString();

  // Limit search queries recorded per session to prevent spam
  if (logs.searchHistory.length >= 50) {
    logs.searchHistory.shift();
  }

  logs.searchHistory.push({
    query: cleanQuery,
    path,
    timestamp
  });

  saveLogs(logs);
}

// Get final session packet
export function getTrackingPayload() {
  // Update last page view duration before getting payload
  logPageExit();
  
  const logs = getStoredLogs();
  return {
    sessionId: getSessionId(),
    pageHistory: logs.pageHistory,
    searchHistory: logs.searchHistory
  };
}

// Clear logs after lead form submission
export function clearTrackingLogs() {
  sessionStorage.removeItem(LOGS_KEY);
  // Keep the session ID so subsequent actions in the same tab are under the same session ID
}
