import { Notification } from '../entities/notification'
import { Content } from '../entities/content'
import { NotificationsRepository } from '../repositories/notifications-repository'
import { Either, right } from 'src/core/logic/either'
import { Injectable } from '@nestjs/common'

interface SendNotificationRequest {
  recipientId: string
  content: string
  category: string
}

type SendNotificationResponse = Either<
  Error,
  {
    notification: Notification
  }
>

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientId, content, category } = request

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    })

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}
