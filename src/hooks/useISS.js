import { useState, useEffect, useRef } from "react";
import axios from "axios";

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

export const useISS = () => {
  const [issData, setIssData] = useState(null);
  const [positions, setPositions] = useState([]);
  const [speed, setSpeed] = useState(0);
  const [speedHistory, setSpeedHistory] = useState([]);
  const [astronauts, setAstronauts] = useState({ number: 0, people: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastPosition = useRef(null);
  const lastTime = useRef(null);

  const fetchISS = async () => {
    try {
      const res = await axios.get("http://api.open-notify.org/iss-now.json");
      const { latitude, longitude } = res.data.iss_position;
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      const now = Date.now();

      let calculatedSpeed = 0;
      if (lastPosition.current && lastTime.current) {
        const dist = haversine(lastPosition.current.lat, lastPosition.current.lon, lat, lon);
        const timeHours = (now - lastTime.current) / 3600000;
        calculatedSpeed = timeHours > 0 ? dist / timeHours : 27600;
      } else {
        calculatedSpeed = 27600;
      }

      lastPosition.current = { lat, lon };
      lastTime.current = now;

      setSpeed(Math.round(calculatedSpeed));
      setIssData({ lat, lon, timestamp: now });
      setPositions((prev) => [...prev.slice(-14), { lat, lon }]);
      setSpeedHistory((prev) => [
        ...prev.slice(-29),
        { time: new Date(now).toLocaleTimeString(), speed: Math.round(calculatedSpeed) },
      ]);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch ISS data");
      setLoading(false);
    }
  };

  const fetchAstronauts = async () => {
    try {
      const res = await axios.get("http://api.open-notify.org/astros.json");
      setAstronauts({ number: res.data.number, people: res.data.people });
    } catch (err) {
      console.error("Astronaut fetch failed");
    }
  };

  useEffect(() => {
    fetchISS();
    fetchAstronauts();
    const interval = setInterval(fetchISS, 15000);
    return () => clearInterval(interval);
  }, []);

  return { issData, positions, speed, speedHistory, astronauts, loading, error, refresh: fetchISS };
};
