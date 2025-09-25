import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { db } from '../db/client.ts';
import { users } from '../db/schema.ts';
import { z } from 'zod';
import { hash } from 'argon2';
import { eq } from'drizzle-orm'

export const registerRoute: FastifyPluginAsyncZod = async (server) => {
  server.post('/users', {
    schema: {
      tags: ['auth'],
      summary: 'Registro de usuário',
      body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['student', 'manager']).default('student'),
      }),
      response: {
        201: z.object({ userId: z.string().uuid() }),
        400: z.object({ message: z.string() }),
      },
    },
  }, async (request, reply) => {
    const { name, email, password, role } = request.body;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser.length > 0) {
      return reply.status(400).send({ message: 'Email já está em uso' });
    }

    const hashedPassword = await hash(password);

    const result = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      role,
    }).returning();

    return reply.status(201).send({ userId: result[0].id });
  });
};
