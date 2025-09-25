import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { db } from '../db/client.ts';
import { courses } from '../db/schema.ts';

import z from 'zod'

import { checkRequestJWT } from './hooks/check-request-jwt.ts'
import { checkUserRole } from './hooks/check-user-role.ts'



export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/courses', {
    preHandler: [
      checkRequestJWT,
      checkUserRole('manager'),
    ],
    schema: {
      tags: ['courses'],
      summary: 'Create a course',
      body: z.object({
        title: z.string().min(5, 'Titulo necesita de 5 caracteres'),
        description: z.string().optional().default(''),
      }),
      response: { 
        201: z.object({ courseId: z.string().uuid() }).describe('Curso creado con exito')
    }
  },
}, async (request, reply) => {

 const { title, description } = request.body;
 

const result = await db
  .insert(courses)
  .values({ 
    title,
    description, // 👈 valor padrão para evitar erro no banco
  })
  .returning();

  return reply.status(201).send({ courseId: result[0].id })

})

}