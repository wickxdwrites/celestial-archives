/**
 * Archive Updates Data
 * 
 * To add a new update:
 * 1. Add a new object to the beginning of the updates array (most recent first)
 * 2. Use a unique ID (increment from the last one)
 * 3. Include proper date and timestamp in ISO format
 * 4. Choose an appropriate label that fits the archive theme
 * 
 * Date format: "YYYY-MM-DD"
 * Timestamp format: "HH:MM UTC" (24-hour format)
 */

const archiveUpdates = [
  {
    id: 3,
    label: "COSMIC EVENT",
    text: "Mysterious meteor shower detected! Click the moon five times quickly to witness an otherworldly spectacle. Alien visitors may be involved... 🛸",
    date: "2026-04-16",
    timestamp: "17:15 UTC",
    priority: "high"
  },
  {
    id: 1,
    label: "CURRENT SIGNAL",
    text: "This website is constantly updating and currently under construction. Explore with caution! Currently working on setting up the fic pages",
    date: "2026-04-16",
    timestamp: "16:42 UTC",
    priority: "high" // high, medium, low - for future styling variations
  },
  {
    id: 2,
    label: "AUTHOR NOTE", 
    text: "This archive is still under construction, and I am tired as all hell.",
    date: "2026-04-16",
    timestamp: "08:36 UTC",
    priority: "medium"
  }
  // Add new updates here at the top of the array
];

/**
 * Helper functions for formatting and managing updates
 */

// Format date for display
export const formatUpdateDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Get the most recent update
export const getLastUpdateDate = () => {
  if (archiveUpdates.length === 0) return null;
  return archiveUpdates[0]; // Assuming sorted by most recent first
};

// Add a new update (for future programmatic use)
export const addUpdate = (label, text, priority = 'medium') => {
  const now = new Date();
  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD format
  const timestamp = `${now.getUTCHours().toString().padStart(2, '0')}:${now.getUTCMinutes().toString().padStart(2, '0')} UTC`;
  
  const newUpdate = {
    id: Math.max(...archiveUpdates.map(u => u.id)) + 1,
    label,
    text,
    date,
    timestamp,
    priority
  };
  
  archiveUpdates.unshift(newUpdate); // Add to beginning
  return newUpdate;
};

// Get updates by priority
export const getUpdatesByPriority = (priority) => {
  return archiveUpdates.filter(update => update.priority === priority);
};

export default archiveUpdates;