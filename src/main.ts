import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonService } from './common/logger.service';
import { HttpExceptionFilter } from './common/filters/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WinstonService))
  app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
