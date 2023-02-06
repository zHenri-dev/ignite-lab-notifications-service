import { NotificationsRepository } from '../repositories/notifications-repository'
import { Either, right } from 'src/core/logic/either'
import { Injectable } from '@nestjs/common'

interface CountRecipientNotificationsRequest {
  recipientId: string
}

type CountRecipientNotificationsResponse = Either<
  Error,
  {
    count: number
  }
>

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    )

    return right({
      count,
    })
  }
}
