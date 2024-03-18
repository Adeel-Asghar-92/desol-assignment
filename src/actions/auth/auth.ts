import { loginCrediantial } from "@/types/auth";
import auth from "../../common/auth";

async function login(credentials: loginCrediantial): Promise<any> {
  try {
    const response = await auth({
      method: "post",
      url: `/sign-in`,
      data: credentials,
    });

    return { data: response.data, error: null };
  } catch (error) {
    console.error("Error fetching order:", error);
    // return { data: null, error };
    throw error;
  }
}

export { login };
