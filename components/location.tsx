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

interface Location2 {
  ip: string;
  version: string;
  network?: string;
  city?: string;
  region?: string;
  region_code?: string;
  country?: string;
  country_name?: string;
  country_code?: string;
  country_code_iso3?: string;
  country_capital?: string;
  country_tld?: string;
  continent_code?: string;
  in_eu?: false;
  postal?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  utc_offset?: string;
  country_calling_code?: string;
  currency?: string;
  currency_name?: string;
  languages?: string;
  country_area?: number;
  country_population?: number;
  asn?: string;
  org?: string;
  error?: boolean;
  reason?: string;
  reserved?: boolean;
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
        // const response = await fetch(`https://ipapi.co/${ip}/json/`); // 👈 use the actual ip variable
        const response = await fetch(`/api/location?ip=${ip}`);
        const data = await response.json();
        setLocation(data);
        // console.log(data);
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

  const formattedIP = formatIPAddress(ip);
  const ellipsis = formattedIP.length > 20 ? "..." : "";

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
        <span className="truncate">
          Error: {error} <br />
          {location?.message}
        </span>
      </div>
    );
  if (!location || location?.status === "fail")
    if (location?.message === "reserved range") {
      return (
        <>
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <Hash className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">
              {formattedIP.slice(0, 20)}
              {ellipsis}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <IconExclamationMark className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Reserved Address</span>
          </div>
        </>
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
        <span className="truncate">
          {formattedIP.slice(0, 20)}
          {ellipsis}
        </span>
      </div>
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <IconLocationPin className="h-3.5 w-3.5 shrink-0" />
        <span className="font-bold">
          {location.city}, {location.country}
        </span>
      </div>
      <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
        <Wifi className="h-3.5 w-3.5 shrink-0" />
        <span className="font-bold capitalize">
          {location.isp?.toLowerCase()}
        </span>
      </div>
    </>
  );
};

export default UserLocation;
