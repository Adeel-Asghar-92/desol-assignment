import { z } from "zod";

export const CarListingSchema = z.object({
  model: z
    .string({
      required_error: "Model is required",
    })
    .min(3, "Model is required"),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1, "Price is required"),
  maxImages: z
    .number({
      required_error: "Images is required",
    })
    .min(1, "Please select at least 1 image")
    .max(10, "Cannot select images more than 10"),
  phoneNumber: z
    .string({
      required_error: "PhoneNumber is required",
    })
    .length(11, "Phone number must be exactly 11 characters long"),
  city: z
    .string({
      required_error: "City is required",
    })
    .min(1, "City is required"),
  images: z.object({}),
});

export type CarListingInput = z.infer<typeof CarListingSchema>;
