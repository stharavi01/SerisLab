import * as z from "zod";

export const WaitlistSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type WaitlistSchemaType = z.infer<typeof WaitlistSchema>;
