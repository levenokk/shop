import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, 'static', 'public'));
  app.setBaseViewsDir(join(__dirname, 'static', 'views'));
  app.setViewEngine('ejs');

  await app.listen(3000);
}
bootstrap();
