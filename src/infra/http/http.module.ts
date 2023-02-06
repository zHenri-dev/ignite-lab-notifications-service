import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { NotificationsController } from './controllers/notifications.controller'

import { SendNotification } from 'src/application/use-cases/send-notification'
import { CountRecipientNotifications } from 'src/application/use-cases/count-recipient-notifications'
import { GetRecipientNotifications } from 'src/application/use-cases/get-recipient-notifications'
import { CancelNotification } from 'src/application/use-cases/cancel-notification'
import { ReadNotification } from 'src/application/use-cases/read-notification'
import { UnreadNotification } from 'src/application/use-cases/unread-notification'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
