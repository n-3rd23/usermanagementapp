import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function Middleware(req, res) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  console.log("Access token in middleware : ", accessToken);
  if (!accessToken?.value) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/users"],
};
