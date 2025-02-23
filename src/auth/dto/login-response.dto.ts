import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/domain/user';

export class LoginResponseDto {
  @ApiProperty({
    type: User,
  })
  user: User;
}
