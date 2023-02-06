import { NotificationsRepository } from '../repositories/notifications-repository'
import { NotificationNotFoundError } from './errors/notification-not-found-error'
import { Either, left, right } from 'src/core/logic/either'
import { Injectable } from '@nestjs/common'

interface ReadNotificationRequest {
  notificationId: string
}

type ReadNotificationResponse = Either<NotificationNotFoundError, null>

@Injectable()
export class ReadNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: ReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request

    const notification = await this.notificationsRepository.findById(
      notificationId,
    )

    if (!notification) {
      return left(new NotificationNotFoundError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right(null)
  }
}
