import { FastifyReply, FastifyRequest } from 'fastify';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import { env } from './env';
import userRoutes from './routes/user/user.routes';

const app = require('fastify')();

app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
  console.log(`${request.method} - ${request.url}`);
});

// app.register(cors); // Register the fastify-cors plugin

app.get('/healthcheck', async (request: FastifyRequest, reply: FastifyReply) => {
  reply.code(200).send('Everything is good!');
});

app.register(cookie);

app.register(require('@fastify/jwt'), {
  secret: env.JWTTOKEN,
});

export default app;
