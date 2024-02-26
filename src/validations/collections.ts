import { z } from "zod";

export const fieldInfoSchema = z.object({
  type: z.enum(["string", "integer"]),
  name: z.string(),
  constraints: z.object({
    length: z.number().positive().int().optional(),
    nullable: z.boolean().default(true),
    default: z.any()
  })
});

export const addCollectionSchema = z.object({
  name: z
    .string()
    .min(1, "Display name is required")
    .max(255)
    .trim()
    .regex(/^[^a-zA-z]+$/, "You can only have letters"),
  fields: z.array(fieldInfoSchema).optional()
});

export type AddCollectionDto = z.infer<typeof addCollectionSchema>;
