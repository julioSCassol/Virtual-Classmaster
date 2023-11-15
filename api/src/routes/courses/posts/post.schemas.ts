import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

const id = z.string();
const teacher = z.string();
const subjects_post = z.array(z.string());
const content = z.string();
const indexed_material = z.string();
const created_at = z.coerce.date();
const updated_at = z.coerce.date().nullable().default(null);
const deleted_at = z.coerce.date().nullable().default(null);
const courseID = z.string();

export const createPostBody = z.object({
    //talvez o teacher de problema    
    // teacher,
    content,
    indexed_material,
    subjects_post,
    courseID
})
export type createPostType = z.infer<typeof createPostBody>

export const getPostsByCourseBody = z.object({
    courseID
})
export type getPostsByCourseType = z.infer<typeof getPostsByCourseBody>

export const insertPostDatabase = z.object({
    id,
    teacher,
    content,
    indexed_material,
    subjects_post,
    courseID,
    created_at
})
export type insertPostDatabaseType = z.infer<typeof insertPostDatabase>

export const PostDTO = z.object({
    id,
    teacher,
    content,
    indexed_material,
    courseID,
    subjects_post
})


// Assignments
const limit_date = z.coerce.date();
const max_points = z.number();


export const createAssignmentBody = createPostBody.extend({
    limit_date,
    max_points,
});
export type createAssignmentType = z.infer<typeof createAssignmentBody>;

export const insertAssignmentDatabase = insertPostDatabase.extend({
    limit_date,
    max_points
});
export type insertAssignmentDatabaseType = z.infer<typeof insertAssignmentDatabase>;

export const AssignmentDTO = PostDTO.extend({
    limit_date,
    max_points
});

const models = {
    createPostBody,
    getPostsByCourseBody,
    createAssignmentBody
}
  
const options = {
    $id: "postSchemas"
}
  
export const { schemas : postSchemas, $ref} = buildJsonSchemas(models, options)