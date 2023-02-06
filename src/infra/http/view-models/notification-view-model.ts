import { Notification } from 'src/application/entities/notification'

export interface HttpNotification {
  id: string
  recipientId: string
  content: string
  category: string
}

export class NotificationViewModel {
  static toHTTP(notification: Notification): HttpNotification {
    return {
      id: notification.id,
      recipientId: notification.recipientId,
      content: notification.content.value,
      category: notification.category,
    }
  }
}
