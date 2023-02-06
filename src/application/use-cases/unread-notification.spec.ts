import { UnreadNotification } from './unread-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeNotification } from 'test/factories/notification-factory'
import { NotificationNotFoundError } from './errors/notification-not-found-error'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationsRepository)

    const notification = makeNotification({
      readAt: new Date(),
    })

    await notificationsRepository.create(notification)

    const response = await unreadNotification.execute({
      notificationId: notification.id,
    })

    expect(response.isRight()).toBeTruthy()
    expect(notificationsRepository.notifications[0].readAt).toBe(null)
  })

  it('should not be able to unread a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const unreadNotification = new UnreadNotification(notificationsRepository)

    const response = await unreadNotification.execute({
      notificationId: randomUUID(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotificationNotFoundError)
  })
})
