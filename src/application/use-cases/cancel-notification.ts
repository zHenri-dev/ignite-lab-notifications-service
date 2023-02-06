import { NotificationsRepository } from '../repositories/notifications-repository'
import { NotificationNotFoundError } from './errors/notification-not-found-error'
import { Either, left, right } from 'src/core/logic/either'
import { Injectable } from '@nestjs/common'

interface CancelNotificationRequest {
  notificationId: string
}

type CancelNotificationResponse = Either<NotificationNotFoundError, null>

@Injectable()
export class CancelNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { notificationId } = request

    const notification = await this.notificationsRepository.findById(
      notificationId,
    )

    if (!notification) {
      return left(new NotificationNotFoundError())
    }

    notification.cancel()

    await this.notificationsRepository.save(notification)

    return right(null)
  }
}
