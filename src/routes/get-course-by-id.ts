import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { db } from '../db/client.ts';
import { courses } from '../db/schema.ts';
import { eq } from 'drizzle-orm';

const ParamsSchema = z.object({
  id: z.string().uuid(),
});

export async function getCourseByIdRoute(server: FastifyInstance) {
  server.get('/courses/:id', {
    schema: {
      tags: ['courses'],
    },
  }, async (request, reply) => {
    const parseResult = ParamsSchema.safeParse(request.params);
    if (!parseResult.success) {
      return reply.status(400).send({ message: 'ID inválido' });
    }

    const { id } = parseResult.data;
    const result = await db.select().from(courses).where(eq(courses.id, id));

    if (result.length > 0) {
      return reply.send({ course: result[0] });
    }

    return reply.status(404).send({ message: 'Curso não encontrado' });
  });
}
