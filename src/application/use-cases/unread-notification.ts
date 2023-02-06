import { NotificationsRepository } from '../repositories/notifications-repository'
import { NotificationNotFoundError } from './errors/notification-not-found-error'
import { Either, left, right } from 'src/core/logic/either'
import { Injectable } from '@nestjs/common'

interface UnreadNotificationRequest {
  notificationId: string
}

type UnreadNotificationResponse = Either<NotificationNotFoundError, null>

@Injectable()
export class UnreadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request

    const notification = await this.notificationsRepository.findById(
      notificationId,
    )

    if (!notification) {
      return left(new NotificationNotFoundError())
    }

    notification.unread()

    await this.notificationsRepository.save(notification)

    return right(null)
  }
}
