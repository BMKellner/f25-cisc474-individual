import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS Configuration
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003'
  ].filter(Boolean);
  
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || undefined;
  await app.listen(port, host);
}

void bootstrap();
