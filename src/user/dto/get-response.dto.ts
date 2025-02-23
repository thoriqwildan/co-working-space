import { ApiProperty } from '@nestjs/swagger';
import { User } from '../domain/user';

export class GetResponseDto {
  @ApiProperty({
    type: User,
  })
  user: User;
}
