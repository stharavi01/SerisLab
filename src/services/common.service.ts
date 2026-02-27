import axiosInstance from "@/lib/axios";

export async function joinWaitlist(
  email: string,
  source: string = "landing-page",
) {
  try {
    const res = await axiosInstance.post("/waitlist/join", { email, source });
    return res.data;
  } catch (err: any) {
    throw err;
  }
}
