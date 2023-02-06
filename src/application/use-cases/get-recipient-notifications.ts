import { NotificationsRepository } from '../repositories/notifications-repository'
import { Notification } from '../entities/notification'
import { Either, right } from 'src/core/logic/either'
import { Injectable } from '@nestjs/common'

interface GetRecipientNotificationsRequest {
  recipientId: string
}

type GetRecipientNotificationsResponse = Either<
  Error,
  {
    notifications: Notification[]
  }
>

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: GetRecipientNotificationsRequest,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = request

    const notifications =
      await this.notificationsRepository.findManyByRecipientId(recipientId)

    return right({
      notifications,
    })
  }
}
