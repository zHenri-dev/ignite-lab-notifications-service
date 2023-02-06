import { Content } from './content'
import { describe, expect, it } from 'vitest'

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('You have received a new friend request!')

    expect(content).toBeInstanceOf(Content)
  })

  it('should able to create a notification content with 240 characters', () => {
    const content = new Content('a'.repeat(240))

    expect(content).toBeInstanceOf(Content)
  })

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('abc')).toThrow()
  })

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow()
  })
})
