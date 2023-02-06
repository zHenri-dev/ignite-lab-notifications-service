import { CountRecipientNotifications } from './count-recipient-notifications'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeNotification } from 'test/factories/notification-factory'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    )

    const recipientId = randomUUID()

    await notificationsRepository.create(makeNotification({ recipientId }))

    await notificationsRepository.create(makeNotification({ recipientId }))

    await notificationsRepository.create(
      makeNotification({ recipientId: randomUUID() }),
    )

    const response = await countRecipientNotifications.execute({
      recipientId,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual({ count: 2 })
  })
})
