import { CancelNotification } from './cancel-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeNotification } from 'test/factories/notification-factory'
import { NotificationNotFoundError } from './errors/notification-not-found-error'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    const response = await cancelNotification.execute({
      notificationId: notification.id,
    })

    expect(notificationsRepository.notifications[0].canceledAt).toBeInstanceOf(
      Date,
    )
    expect(response.isRight()).toBeTruthy()
  })

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const response = await cancelNotification.execute({
      notificationId: randomUUID(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotificationNotFoundError)
  })
})
