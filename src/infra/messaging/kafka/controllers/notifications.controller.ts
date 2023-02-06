import { Controller } from '@nestjs/common'
import { EventPattern, Payload } from '@nestjs/microservices'
import { SendNotification } from 'src/application/use-cases/send-notification'

interface SendNotificationPayload {
  recipientId: string
  content: string
  category: string
}

@Controller()
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @EventPattern('notifications.send-notification')
  async handleSendNotification(@Payload() payload: SendNotificationPayload) {
    const { recipientId, content, category } = payload

    await this.sendNotification.execute({
      recipientId,
      content,
      category,
    })
  }
}
