import { FastifyInstance } from 'fastify';
import { db } from '../db/client.ts';
import { courses } from '../db/schema.ts';

export async function getCoursesRoute(server: FastifyInstance) {
  server.get('/courses', {
    schema: {
      tags: ['courses'],
    },
  }, async (_, reply) => {
    const result = await db.select().from(courses);
    return reply.send({ courses: result });
  });
}
