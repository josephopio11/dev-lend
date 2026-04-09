import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get("ip");

  if (!ip) {
    return NextResponse.json({ error: "No IP provided" }, { status: 400 });
  }

  try {
    // The server can safely make HTTP requests
    // const response = await fetch(`http://ip-api.com/json/${ip}`);
    const response = await fetch(`/api/location?ip=${ip}`);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
