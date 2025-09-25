import { FastifyRequest } from "fastify"


export function getAuthenticateUserFromRequest(request: FastifyRequest) {
  
  const user = request.user

  if (!user){
    throw new Error('Autenticación invalida')
  }

  return user
}