import {
  Notification,
  NotificationProps,
} from 'src/application/entities/notification'
import { Content } from 'src/application/entities/content'
import { randomUUID } from 'node:crypto'

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    recipientId: randomUUID(),
    content: new Content('You have received a new friend request!'),
    category: 'social',
    ...override,
  })
}
