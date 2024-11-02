import { z } from "zod";

export const questionSchema = z.object({
    title: z.string().min(10, "title must be atleast 5 character").max(130, "Title cannot exceed 130 characters"),
    explanation: z.string().min(10).max(500, "explanation cannot exceed 500 characters"),
    tags: z.array(z.string().min(1).max(15)).min(1, "Please add atleast one tag").max(10, "You can add upto 10 tags"),

  });