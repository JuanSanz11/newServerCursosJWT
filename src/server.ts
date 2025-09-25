import { server } from './app.ts'
import dotenv from 'dotenv';
dotenv.config();

// 🚀 ON Server
server.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('Http ON: http://localhost:3000');
  console.log('Swagger UI: http://localhost:3000/docs');
});
