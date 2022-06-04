import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? 4000;
  const app = await NestFactory.create(AppModule);
  await app
    .listen(port)
    .then(() => {
      console.log(`
      
      🔥🔥🔥 The api is running on port ${port} 🔥🔥🔥 `);
    })
    .catch((error) => {
      console.error(`
      
      🔥🔥🔥 Te api not started because of ${error?.message}`);
    });
}
bootstrap();
