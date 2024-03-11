import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as dayjs from 'dayjs';
import 'dayjs/plugin/timezone';
import 'dayjs/plugin/isToday';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getQueueName } from './microservice.providers';

dayjs.extend(require('dayjs/plugin/timezone'));
dayjs.extend(require('dayjs/plugin/isToday'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  const provider = configService.get<string>('provider');
  const logger = new Logger();

  const config = new DocumentBuilder()
  .setTitle('DashBoard')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ],
      queue: getQueueName(provider),
      queueOptions: {
        durable: false,
      },
    },
  })

  app.startAllMicroservices();
  await app.listen(port, () => {
    logger.log(`
      Application ${provider} started listen on port ${port}
      Local Timezone guess: ${dayjs.tz.guess()}
      Local Date: ${dayjs().toDate().toISOString()} ~ ${dayjs().format(
        'YYYY-MM-DD HH:mm:ss',
      )}
    `);
  });
}
bootstrap();
