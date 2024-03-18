import { carListingData } from "@/types/car";
import carListing from "@/common/carListing";
import jwt from "jsonwebtoken";

async function carListingAction(data: any): Promise<any> {
  const decoded: any = jwt.decode(localStorage.getItem("accessToken") || "");
  const payload = {
    ...data,
    userId: decoded.id,
  };
  try {
    const response = await carListing({
      method: "post",
      url: `/upload`,
      data: payload,
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching order:", error);
    // return { data: null, error };
    throw error;
  }
}

export { carListingAction };
