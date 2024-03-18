import { z } from "zod";

export const CarListingSchema = z.object({
  model: z
    .string({
      required_error: "Model is required",
    })
    .min(1, "Email is required"),
  price: z
    .string({
      required_error: "Price is required",
    })
    .min(1, "Price is required"),
  phoneNumber: z
    .string({
      required_error: "PhoneNumber is required",
    })
    .min(1, "PhoneNumber is required"),
  city: z
    .string({
      required_error: "City is required",
    })
    .min(1, "City is required"),
  // images: z.array(z.string()),
});

export type CarListingInput = z.infer<typeof CarListingSchema>;
