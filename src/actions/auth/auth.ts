import { loginCrediantial } from "@/types/auth";
import auth from "../../common/auth";

// Function to get an order by ID

async function login(credentials: loginCrediantial): Promise<any> {
  try {
    // Assuming your API endpoint is /orders/{orderId}
    const response = await auth({
      method: "post",
      url: `/sign-in`,
      data: credentials,
    });

    // Return the order data from the response
    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { data: null, error };
  }
}

export { login };
