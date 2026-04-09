"use client";

import { formatIPAddress } from "@/lib/utils";
import { IconExclamationMark, IconLocationPin } from "@tabler/icons-react";
import { Hash, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

interface Location {
  status: "success" | "fail";
  query: string;
  message?: string;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
}

const UserLocation = ({ ip }: { ip: string }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ip) {
      setError("No IP provided");
      return; // 👈 early return to prevent fetch
    }

    setLoading(true);

    const fetchLocation = async () => {
      try {
        const response = await fetch(`http://ip-api.com/json/${ip}`); // 👈 use the actual ip variable
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        setError("Failed to fetch location"); // 👈 update error state
        console.error("Error:", error);
      } finally {
        setLoading(false); // 👈 always stop loading
      }
    };

    fetchLocation();

    return () => {
      setLoading(false);
      setError(null);
    };
  }, [ip]);

  if (loading)
    return (
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <Spinner className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">Detecting location...</span>
      </div>
    );
  if (error)
    return (
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <IconExclamationMark className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">Error: {error}</span>
      </div>
    );
  if (!location || location.status === "fail")
    if (location?.message === "reserved range") {
      return (
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <IconExclamationMark className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Reserved Address</span>
        </div>
      );
    } else
      return (
        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <IconExclamationMark className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">Unable to detect location</span>
        </div>
      );
  return (
    <>
      {/* <pre>{JSON.stringify(location, null, 2)}</pre> */}
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <Hash className="h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{formatIPAddress(ip)}</span>
      </div>
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <IconLocationPin className="h-3.5 w-3.5 shrink-0" />
        <span className="font-bold">
          {location.city}, {location.countryCode}
        </span>
      </div>
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <Wifi className="h-3.5 w-3.5 shrink-0" />
        <span className="font-bold">{location.isp}</span>
      </div>
    </>
  );
};

export default UserLocation;
