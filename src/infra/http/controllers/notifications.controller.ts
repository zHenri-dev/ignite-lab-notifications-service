import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common'

import { ApiTags } from '@nestjs/swagger'

import { SendNotification } from 'src/application/use-cases/send-notification'
import { CountRecipientNotifications } from 'src/application/use-cases/count-recipient-notifications'
import { GetRecipientNotifications } from 'src/application/use-cases/get-recipient-notifications'
import { CancelNotification } from 'src/application/use-cases/cancel-notification'
import { ReadNotification } from 'src/application/use-cases/read-notification'
import { UnreadNotification } from 'src/application/use-cases/unread-notification'

import { CreateNotificationBody } from '../dtos/create-notification-body'
import { NotificationViewModel } from '../view-models/notification-view-model'
import { NotificationNotFoundError } from 'src/application/use-cases/errors/notification-not-found-error'

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Post()
  async send(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body

    const result = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST)
      }
    }

    return {
      notification: NotificationViewModel.toHTTP(result.value.notification),
    }
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const result = await this.countRecipientNotifications.execute({
      recipientId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST)
      }
    }

    return {
      count: result.value.count,
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const result = await this.getRecipientNotifications.execute({
      recipientId,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST)
      }
    }

    return {
      notifications: result.value.notifications.map(
        NotificationViewModel.toHTTP,
      ),
    }
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    const result = await this.cancelNotification.execute({
      notificationId: id,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NotificationNotFoundError:
          throw new HttpException(result.value.message, HttpStatus.NOT_FOUND)
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    const result = await this.readNotification.execute({
      notificationId: id,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NotificationNotFoundError:
          throw new HttpException(result.value.message, HttpStatus.NOT_FOUND)
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST)
      }
    }
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    const result = await this.unreadNotification.execute({
      notificationId: id,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NotificationNotFoundError:
          throw new HttpException(result.value.message, HttpStatus.NOT_FOUND)
        default:
          throw new HttpException(result.value.message, HttpStatus.BAD_REQUEST)
      }
    }
  }
}
