import { useState, useEffect, useRef } from "react";
import axios from "axios";

// ─── HTTPS endpoints — safe for Vercel production ────────────────────────────
const ISS_API      = "https://api.wheretheiss.at/v1/satellites/25544";
const ASTROS_API   = "https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json";

// wheretheiss.at returns velocity in km/h directly — no Haversine needed.
export const useISS = () => {
  const [issData,      setIssData]      = useState(null);
  const [positions,    setPositions]    = useState([]);
  const [speed,        setSpeed]        = useState(0);
  const [speedHistory, setSpeedHistory] = useState([]);
  const [astronauts,   setAstronauts]   = useState({ number: 0, people: [] });
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  const fetchISS = async () => {
    try {
      // wheretheiss.at response: { latitude, longitude, altitude, velocity, timestamp, ... }
      const res = await axios.get(ISS_API);
      const { latitude: lat, longitude: lon, velocity, timestamp } = res.data;
      const now = timestamp ? timestamp * 1000 : Date.now();

      // velocity is already km/h — no manual speed calculation required
      const kmh = Math.round(velocity);

      setSpeed(kmh);
      setIssData({ lat, lon, timestamp: now });

      setPositions(prev => [...prev.slice(-14), { lat, lon }]);

      setSpeedHistory(prev => [
        ...prev.slice(-29),
        { time: new Date(now).toLocaleTimeString(), speed: kmh },
      ]);

      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("ISS fetch error:", err);
      setError("Failed to fetch ISS data");
      setLoading(false);
    }
  };

  const fetchAstronauts = async () => {
    try {
      // corquaid API response shape: { number: N, people: [{ name, biopic, ... }] }
      const res = await axios.get(ASTROS_API);
      const data = res.data;

      // Normalise — the corquaid API puts ISS crew in data directly or nested
      const people = Array.isArray(data.people)
        ? data.people.map(p => ({ name: p.name, craft: p.craft || "ISS" }))
        : [];

      setAstronauts({ number: people.length, people });
    } catch (err) {
      console.error("Astronaut fetch failed:", err);
    }
  };

  useEffect(() => {
    // Initial load
    fetchISS();
    fetchAstronauts();

    // Poll ISS every 15 seconds; cleanup on unmount
    const interval = setInterval(fetchISS, 15000);
    return () => clearInterval(interval);
  }, []);

  return {
    issData,
    positions,
    speed,
    speedHistory,
    astronauts,
    loading,
    error,
    refresh: fetchISS,
  };
};
