import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import AxiosInstance from "@/utils/AxiosInstance";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get("page");
  const perPage = searchParams.get("perPage");
  console.log("Page :: ", page);
  console.log("Per page :: ", perPage);
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  console.log("Access Token In Users api : ", accessToken);
  try {
    const res = await AxiosInstance.get(`/user?page=0&perPage=10`, {
      headers: {
        Authorization: cookieStore.get("access_token")?.value,
      },
    });
    console.log("Api Response : ", res.data.data?.users);
    return NextResponse.json({
      success: true,
      data: res.data?.data?.users,
    });
  } catch (err: any) {
    console.log("Api error :: ", err?.response?.data);
    return NextResponse.json({
      success: false,
      data: "error in user api",
    });
  }
}

export async function POST(req: NextRequest) {
  const request = await req.json();
  try {
    const res = await AxiosInstance.post("/user", request);
    console.log("Create user res :: ", res);
    if (res && res.status === 201) {
      return NextResponse.json({
        success: true,
      });
    }
  } catch (err: any) {
    console.log("Create user error : ", err);
    return NextResponse.json({
      success: false,
      data: null,
      err: err.response.data.message,
    });
  }
}
