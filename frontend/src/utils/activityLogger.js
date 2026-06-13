export const logActivity = (message) => {
  try {
    const current = JSON.parse(localStorage.getItem("prime-holiday-activities") || "[]");
    // Add to top, keep only the latest 6 activities
    const updated = [message, ...current].slice(0, 6);
    localStorage.setItem("prime-holiday-activities", JSON.stringify(updated));
    
    // Dispatch an event so the Dashboard can update in real-time
    window.dispatchEvent(new Event("activityUpdated"));
  } catch (e) {
    console.error("Failed to log activity", e);
  }
};
