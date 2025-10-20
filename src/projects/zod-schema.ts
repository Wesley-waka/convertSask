import {z} from 'zod';

export const createProjectSchema = z.object({
    name: z.string(),
    age: z.string(),
    breed: z.string()
}).required();

export type CreateProjectDto = z.infer<typeof createProjectSchema>