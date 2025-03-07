import { z } from "zod";

export const paginationSchema = z.object({
    page: z.number().int().min(0).default(0),
    pageSize: z.number().int().min(1).max(100).default(10),
});
