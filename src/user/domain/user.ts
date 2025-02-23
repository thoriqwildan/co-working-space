import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({ type: Number })
  id: number | null;

  @ApiProperty({ type: String, example: 'John Doe' })
  name: string;

  @ApiProperty({ type: String, example: 'test@example.com' })
  email: string | null;

  @ApiProperty({ type: String, example: '08123456789' })
  phone_number: string | null;

  @ApiProperty({ type: String, example: 'https://example.com/image.jpg' })
  img_url: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @ApiProperty({ type: String, example: 'user' })
  role: string | null;
}
