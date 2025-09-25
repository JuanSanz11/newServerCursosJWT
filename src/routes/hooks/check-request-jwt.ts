import type { FastifyRequest, FastifyReply } from "fastify";
import jwt from 'jsonwebtoken';

type JWTPayload = {
  sub: string;
  role: 'student' | 'manager';
};

export async function checkRequestJWT(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return reply.status(401).send({ message: 'Token ausente' });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET must be set');
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    request.user = payload; // 👈 isso precisa funcionar
  } catch (err) {
    console.error('Erro ao verificar token:', err);
    return reply.status(401).send({ message: 'Token inválido' });
  }
}
