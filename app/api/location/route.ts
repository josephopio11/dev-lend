import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ip = searchParams.get("ip");

  if (!ip) {
    return NextResponse.json({ error: "No IP provided" }, { status: 400 });
  }

  try {
    // The server makes the request, bypassing browser CORS rules
    const response = await fetch(`http://ip-api.com/json/${ip}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    // const response = await fetch(`https://ipapi.co/${ip}/json/`, {
    //   headers: {
    //     "User-Agent":
    //       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    //     Accept: "application/json",
    //   },
    // });
    const data = await response.json();
<<<<<<< HEAD
    // console.log("===========================================================");
    // console.log(data);
    // console.log("===========================================================");
=======
>>>>>>> auth_pages

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 },
    );
  }
}
