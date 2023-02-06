import { IsNotEmpty, IsUUID, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { randomUUID } from 'node:crypto'

export class CreateNotificationBody {
  @ApiProperty({
    description: 'The UUID id of the recipient of the notification.',
    example: randomUUID(),
  })
  @IsNotEmpty()
  @IsUUID()
  recipientId: string

  @ApiProperty({
    description:
      'The content of the notification. Must be between 5 and 240 characters',
    example: 'You have received a new friend request!',
  })
  @IsNotEmpty()
  @Length(5, 240)
  content: string

  @ApiProperty({
    description: 'The category of the notification.',
    example: 'social',
  })
  @IsNotEmpty()
  category: string
}
