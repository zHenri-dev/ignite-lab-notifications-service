import { GetRecipientNotifications } from './get-recipient-notifications'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeNotification } from 'test/factories/notification-factory'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    )

    const recipientId = randomUUID()

    await notificationsRepository.create(makeNotification({ recipientId }))

    await notificationsRepository.create(makeNotification({ recipientId }))

    await notificationsRepository.create(
      makeNotification({ recipientId: randomUUID() }),
    )

    const response = await getRecipientNotifications.execute({
      recipientId,
    })

    expect(response.isRight()).toBeTruthy()

    if (response.isLeft()) return

    const notifications = response.value.notifications

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    )
  })
})
