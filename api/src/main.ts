import { FastifyReply, FastifyRequest } from 'fastify';
import cors from '@fastify/cors';
import { insertRoutes } from './routes';
import insertSchemas from './schemas';
import app from './server';

app.register(cors, { 
  credentials: true,
});

app.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
  console.log(`${request.method} - ${request.url}`);
});

async function main() {
  try {
    await insertSchemas(app);
    await insertRoutes(app);

    app.listen({
      host: '0.0.0.0',
      port: 5000
    }).then(() => {
      console.log('Server listening on port', 5000);
    });
  } catch (e) {
    console.log(e);
  }
}

main();
