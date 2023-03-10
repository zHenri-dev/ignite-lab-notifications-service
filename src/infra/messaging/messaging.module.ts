import { Module } from '@nestjs/common'
import { SendNotification } from 'src/application/use-cases/send-notification'
import { DatabaseModule } from '../database/database.module'
import { NotificationsController } from '../messaging/kafka/controllers/notifications.controller'
import { KafkaConsumerService } from './kafka/kafka-consumer.service'

@Module({
  imports: [DatabaseModule],
  providers: [KafkaConsumerService, SendNotification],
  controllers: [NotificationsController],
})
export class MessagingModule {}
