import * as fastify from 'fastify';

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { serializerCompiler, validatorCompiler, type  ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import scalarAPIReference from '@scalar/fastify-api-reference'

import { getCoursesRoute } from './routes/get-courses.ts';
import { getCourseByIdRoute } from './routes/get-course-by-id.ts';
import { createCourseRoute } from './routes/create-course.ts';
import { loginRoute } from './routes/login.ts';

import { registerRoute } from './routes/register.ts';

const server = fastify.default({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === 'development') {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Check JWT',
        version: '1.0.0'
      }
    },
    transform: jsonSchemaTransform,
  });

  server.register(fastifySwaggerUi, {
    routePrefix: '/swagger',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    },
    staticCSP: true
  });

  server.register(scalarAPIReference, {
    routePrefix: '/docs'
  });
}



server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)



server.register(registerRoute);
server.register(loginRoute)
server.register(createCourseRoute)
server.register(getCourseByIdRoute)
server.register(getCoursesRoute)


server.get('/', async (request, reply) => {
  return { message: 'API está funcionando!' };
});

export {server}