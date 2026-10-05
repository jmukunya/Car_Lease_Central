import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSessionData } from "../../../lib/actions";

export const GET = async () => {
  // const cookieStore = await cookies();
  // const accessToken = cookieStore.get("access_token")?.value;
  // const refreshToken = cookieStore.get("refresh_token")?.value;
  // const id = cookieStore.get("user_id")?.value;
  // const role = cookieStore.get("user_role")?.value;
  // const status = cookieStore.get("user_status")?.value;

  // console.log(accessToken);
  
  // return NextResponse.json( { accessToken, refreshToken,  id,  role,  status} );
  return NextResponse.json( await getSessionData());
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
