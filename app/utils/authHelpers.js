// Function to store session in session storage
function saveSessionToStorage(session) {
  sessionStorage.setItem("supabaseSession", JSON.stringify(session));
}

// Function to retrieve session from session storage
function getSessionFromStorage() {
  const sessionStr = sessionStorage.getItem("supabaseSession");
  return sessionStr ? JSON.parse(sessionStr) : null;
}

// Function to delete session from session storage
function deleteSessionFromStorage() {
  sessionStorage.removeItem("supabaseSession");
}

// Function to check if session has expired
function isSessionExpired(session) {
  return session && new Date(session.expires_at) < new Date();
}

// Check if session exists in storage
const storedSession = getSessionFromStorage();

if (storedSession) {
  if (isSessionExpired(storedSession)) {
    // Session expired, delete it from storage
    deleteSessionFromStorage();
  } else {
    // Session is still valid, use it
    console.log("Stored session:", storedSession);
    // Perform authenticated operations using stored session
  }
} else {
  console.log("No session found.");
}

export {};
