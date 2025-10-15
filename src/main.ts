import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000', // local frontend
      'http://localhost:3002', // local frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // only if you use cookies or Authorization headers
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(' Server listening on port', process.env.PORT ?? 3000);
}
bootstrap();
