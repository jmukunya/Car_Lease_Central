"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const frontend = process.env.FRONTEND_URL;
const backend = process.env.BACKEND_URL;

export const verifySessionWithBackend = cache(async () => {
  const session = await getSessionData();
  const { access_token } = session;
  if (!access_token) redirect("/login");

  try {
    // Validate the token against your external backend
    const user = await apiRequest(
      `${backend}/auth/me`,
      "GET",
      undefined,
      access_token,
    );

    if (user == null) throw new Error("Invalid token");

    return { isAuth: true, user };
  } catch (error) {
    // If the token is expired/invalid, force a redirect
    redirect("/login");
  }
});

export const payInvoice = async () => {
  const data = await getSessionData();
  const driver = data.user_id;
  const token = data.access_token;

  return (
    await apiRequest(
      `${backend}/billing/invoice/${driver}/pay`,
      "PATCH",
      undefined,
      token,
    ),
    "Rental invoice payment successfully transmitted."
  );
};

export const reportCarDefect = async (
  lease: string,
  type: string,
  description: string,
) => {
  const data = await getSessionData();
  const token = data.access_token;

  return (
    await apiRequest(
      `${backend}/maintenance/report`,
      "POST",
      { lease_id: lease, type, description },
      token,
    ),
    "Telemetry hazard incident report filed to compliance logs."
  );
};

export const fetchDriverLeases = async () => {
  const data = await getSessionData();
  const driver = data.user_id;
  const token = data.access_token;

  return await apiRequest(
    `${backend}/leases/driver/${driver}`,
    "GET",
    undefined,
    token,
  );
};

export const fetchDriverUnpaidInvoices = async () => {
  const data = await getSessionData();
  const driver = data.user_id;
  const token = data.access_token;

  return await apiRequest(
    `${backend}/billing/driver/${driver}/unpaid`,
    "GET",
    undefined,
    token,
  );
};

export const fetchAllVehicles = async () => {
  const data = await getSessionData();
  return apiRequest(`${backend}/vehicles`, "GET", undefined, data.access_token);
};

export const fetchAllIncidents = async () => {
  const data = await getSessionData();
  return apiRequest(
    `${backend}/maintenance`,
    "GET",
    undefined,
    data.access_token,
  );
};

export const approveCarOnboard = async (id: string) => {
  const data = await getSessionData();
  return apiRequest(
    `${backend}/vehicles/${data.user_id}/activate`,
    "PATCH",
    undefined,
    data.access_token,
  );
};

export const fetchOwnerCarsData = async () => {
  const data = await getSessionData();
  return apiRequest(
    `${backend}/vehicles/owner/${data.user_id}`,
    "GET",
    undefined,
    data.access_token,
  );
};

export async function apiRequest(
  endpoint: string,
  method: string,
  body?: any,
  token?: string,
) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const fetchOptions = {
    method,
    headers,
    body,
  };

  if (body) fetchOptions.body = JSON.stringify(body);

  const res = await fetch(endpoint, fetchOptions);

  if (!res) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.message || "System connectivity trace error context.",
    );
  }

  return res.json();
}

export const authenticateUser = async (formData: FormData) => {
  const cookieStore = await cookies();
  const email = formData.get("email");
  const password = formData.get("password");
  try { 
    const res = await apiRequest(`${backend}/auth/login`, "POST", {
      email,
      password,
    });

    const { tokens, user } = res;
    const access_token = tokens.accessToken;
    const refresh_token = tokens.refreshToken;
    const user_email = user.email;
    const user_id = user.id;
    const user_role = user.role;
    const user_status = user.status;

    //set cookies
    cookieStore.set("access_token", access_token);
    cookieStore.set("refresh_token", refresh_token);
    cookieStore.set("user_email", user_email);
    cookieStore.set("user_id", user_id);
    cookieStore.set("user_role", user_role);
    cookieStore.set("user_status", user_status);

    if (res.user.role === "ADMIN") return  "/admin-dashboard"; 
    else if (res.user.role === "OWNER") return "/owner-portal";
    else if (res.user.role === "DRIVER") return "/driver-portal";
    else return "/login";
  } catch (error) {
    throw new Error(error) || "Invalid Login Credentials";
  }
};

export const endSession = async () => {
  const cookieStore = await cookies();

  //Delete all session cookies
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("user_id");
  cookieStore.delete("user_role");
  cookieStore.delete("user_status");
  redirect("/login");
};

export const onBoardVehicle = async (
  make_model_year: string,
  plate: string,
) => {
  const sessionData = await getSessionData();
  const user = sessionData.user_id;
  const token = sessionData.access_token;
  try {
    const res = await apiRequest(
      `${backend}/vehicles`,
      "POST",
      {
        owner_id: user,
        make_model_year: make_model_year,
        license_plate: plate,
      },
      token,
    );

    console.log(res);

    return res;
  } catch (error) {
    throw new Error("Cannot Onboard Car");
  }
};

export const getSessionData = async () => {
  const cookieStore = await cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const refresh_token = cookieStore.get("refresh_token").value;
  const user_id = cookieStore.get("user_id").value;
  const user_email = cookieStore.get("user_email").value;
  const user_role = cookieStore.get("user_role").value;
  const user_status = cookieStore.get("user_status").value;
  return {
    access_token,
    refresh_token,
    user_id,
    user_email,
    user_role,
    user_status,
  };
};
