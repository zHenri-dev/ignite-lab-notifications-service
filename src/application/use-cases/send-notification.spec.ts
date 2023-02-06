import { SendNotification } from './send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepository)

    const response = await sendNotification.execute({
      recipientId: randomUUID(),
      content: 'You have received a new friend request!',
      category: 'social',
    })

    expect(response.isRight()).toBeTruthy()

    if (response.isLeft()) return

    expect(notificationsRepository.notifications).toHaveLength(1)
    expect(notificationsRepository.notifications[0]).toEqual(
      response.value.notification,
    )
  })
})
