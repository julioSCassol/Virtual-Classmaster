import { z } from "zod";

const id = z.string();
const teacher = z.string();
const limit_date = z.coerce.date();
const created_at = z.coerce.date();

export const createAssignmentBody = z.object({
    teacher,
    limit_date
})

export type createAssignmentType = z.infer<typeof createAssignmentBody>

export const insertAssignmentDatabase = z.object({
    id,
    teacher,
    limit_date,
    created_at
});

export type insertAssignmentDatabaseType = z.infer<typeof insertAssignmentDatabase>