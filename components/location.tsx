"use client";

import { useEffect, useState } from "react";

interface Location {
  ip: string;
  city: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  isp: string;
}

const UserLocation = ({ ip }: { ip: string }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ip) {
      setError("No IP address provided");
      setLoading(false);
      return;
    }

    fetch("/api/location?ip=" + ip)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setLocation(data);
      })
      .catch((err) => {
        setError(err.message ?? "Failed to fetch location");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ip]);

  if (loading) return <span>Detecting location...</span>;
  if (error) return <span>Error: {error}</span>;
  if (!location) return <span>Unable to detect location</span>;
  return (
    <div>
      <pre>{JSON.stringify(location, null, 2)}</pre>
      <h1>Your Approximate Location</h1>
      <p>IP: {location.ip}</p>
      <p>City: {location.city}</p>
      <p>Region: {location.region}</p>
      <p>Country: {location.country}</p>
      <p>
        Coordinates: {location.lat}, {location.lon}
      </p>
      <p>ISP: {location.isp}</p>
    </div>
  );
};

export default UserLocation;
