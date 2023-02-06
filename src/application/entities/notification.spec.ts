import { Notification } from './notification'
import { Content } from './content'
import { makeNotification } from 'test/factories/notification-factory'
import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      recipientId: randomUUID(),
      content: new Content('You have received a new friend request!'),
      category: 'social',
    })

    expect(notification).toBeInstanceOf(Notification)
  })

  it('should be able to read a notification', () => {
    const notification = makeNotification()

    notification.read()

    expect(notification.readAt).toBeInstanceOf(Date)
  })

  it('should be able to unread a notification', () => {
    const notification = makeNotification({
      readAt: new Date(),
    })

    notification.unread()

    expect(notification.readAt).toEqual(null)
  })

  it('should be able to cancel a notification', () => {
    const notification = makeNotification()

    notification.cancel()

    expect(notification.canceledAt).toBeInstanceOf(Date)
  })
})
