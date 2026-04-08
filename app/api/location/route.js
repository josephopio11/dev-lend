// app/api/location/route.js
import { NextResponse } from "next/server";

export async function handler(req, res) {
  // Get IP from headers (works on Vercel, Netlify, etc.)

  let { ip } = req.query;

  ip = ip ? ip : "8.8.8.8"; // fallback for localhost

  // Fetch location from a free IP geolocation API
  res = await fetch(`http://ip-api.com/json/${ip}`);
  const data = await res.json();

  return NextResponse.json({
    ip,
    city: data.city,
    region: data.regionName,
    country: data.country,
    lat: data.lat,
    lon: data.lon,
    isp: data.isp,
  });
}
