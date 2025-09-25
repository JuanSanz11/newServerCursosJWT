import type { FastifyRequest, FastifyReply } from 'fastify'
import { getAuthenticateUserFromRequest } from '../../utils/get-authenticated-user-from-request.ts'


export function checkUserRole(role: 'student' | 'manager') {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = getAuthenticateUserFromRequest(request)

    if (user.role !== role) {
      return reply.status(401).send()
    }
  }
}