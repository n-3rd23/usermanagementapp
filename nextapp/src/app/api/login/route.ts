import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import AxiosInstance from "@/utils/AxiosInstance";

export async function POST(req: NextRequest) {
  const request = await req.json();
  try {
    const res = await AxiosInstance.post("/auth/login", request);
    if (res && res.status === 200) {
      console.log("Response access token : ", res.data.data.access_token);
      const cookieStore = cookies();
      cookieStore.set("access_token", res.data.data.access_token);
    }
    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    throw err;
    // return NextResponse.json({
    //   success: false,
    // });
  }
}
