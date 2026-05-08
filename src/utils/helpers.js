/**
 * Haversine formula — calculate distance between two lat/lon points in km
 */
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Calculate ISS speed in km/h given two position + time readings
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @param {number} deltaSeconds — time difference in seconds
 */
export function calculateSpeed(lat1, lon1, lat2, lon2, deltaSeconds) {
  if (deltaSeconds <= 0) return 0;
  const distKm = haversineDistance(lat1, lon1, lat2, lon2);
  return (distKm / deltaSeconds) * 3600; // convert km/s → km/h
}

/**
 * Format a Unix timestamp to readable date-time string
 */
export function formatTimestamp(unix) {
  return new Date(unix * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Format ISO date string to readable
 */
export function formatDate(isoString) {
  if (!isoString) return 'Unknown';
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Reverse-geocode: return a rough description of ocean/region by lat/lon
 * (Offline approximation — no API key needed)
 */
export function getNearestLocation(lat, lon) {
  // Rough ocean / continent detection
  if (lat > 60) return 'Arctic Region';
  if (lat < -60) return 'Antarctic Region';
  if (lon >= -30 && lon <= 60 && lat >= 0 && lat <= 70) return 'Europe / North Africa';
  if (lon >= 60 && lon <= 150 && lat >= 0 && lat <= 70) return 'Asia / Pacific';
  if (lon >= -170 && lon <= -30 && lat >= 10 && lat <= 70) return 'North America';
  if (lon >= -90 && lon <= -30 && lat >= -60 && lat <= 10) return 'South America';
  if (lon >= -20 && lon <= 55 && lat >= -35 && lat <= 37) return 'Africa';
  if (lon >= 60 && lon <= 150 && lat >= -50 && lat <= 10) return 'Australia / Oceania';
  if (lon >= 100 && lon <= 180 && lat >= -50 && lat <= 0) return 'South Pacific Ocean';
  if (lat >= 0) return 'Northern Pacific Ocean';
  return 'Southern Ocean';
}

/**
 * Cache-based localStorage helpers
 */
export function setCacheItem(key, data, ttlMinutes = 15) {
  const item = {
    data,
    expiresAt: Date.now() + ttlMinutes * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getCacheItem(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const item = JSON.parse(raw);
    if (Date.now() > item.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return item.data;
  } catch {
    return null;
  }
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
