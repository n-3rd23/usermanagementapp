import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import AxiosInstance from "@/utils/AxiosInstance";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");
  try {
    const res = await AxiosInstance.delete(`/user/${params.id}`);
    return NextResponse.json({
      success: true,
    });
  } catch (err: any) {
    console.log("Axios Error : ", err);
    return NextResponse.json({
      success: false,
      data: null,
      err: err.response.data.message,
    });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const res = await AxiosInstance.get(`/user/${params.id}`);
    return NextResponse.json({
      success: true,
      data: res?.data?.data,
    });
  } catch (err: any) {
    console.log("Axios Error : ", err);
    return NextResponse.json({
      success: false,
      data: null,
      err: err.response.data.message,
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const request = await req.json();
  console.log("update req data : ", request);
  try {
    const res = await AxiosInstance.patch(`/user/${params.id}`, request);
    return NextResponse.json({
      success: true,
      data: res?.data?.data,
    });
  } catch (err: any) {
    console.log("Axios Error : ", err);
    return NextResponse.json({
      success: false,
      data: null,
      err: err.response.data.message,
    });
  }
}
