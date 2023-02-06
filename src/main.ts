import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { MicroserviceOptions } from '@nestjs/microservices/interfaces'
import { KafkaConsumerService } from './infra/messaging/kafka/kafka-consumer.service'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())

  const kafkaConsumerService = app.get(KafkaConsumerService)

  app.connectMicroservice<MicroserviceOptions>({
    strategy: kafkaConsumerService,
  })

  const config = new DocumentBuilder()
    .setTitle('Notifications Microservice')
    .setDescription('Microservice to send notifications')
    .setVersion('1.0')
    .addTag('notifications')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api-docs', app, document)

  await app.startAllMicroservices()
  await app.listen(process.env.PORT || 3333)
}

bootstrap()
