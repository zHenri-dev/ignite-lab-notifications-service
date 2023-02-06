import { ReadNotification } from './read-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeNotification } from 'test/factories/notification-factory'
import { NotificationNotFoundError } from './errors/notification-not-found-error'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    const notification = makeNotification()

    await notificationsRepository.create(notification)

    const response = await readNotification.execute({
      notificationId: notification.id,
    })

    expect(response.isRight()).toBeTruthy()
    expect(notificationsRepository.notifications[0].readAt).toBeInstanceOf(Date)
  })

  it('should not be able to read a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const readNotification = new ReadNotification(notificationsRepository)

    const response = await readNotification.execute({
      notificationId: randomUUID(),
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toBeInstanceOf(NotificationNotFoundError)
  })
})
