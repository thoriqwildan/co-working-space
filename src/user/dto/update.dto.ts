import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ type: String, example: 'John Doe' })
  @IsString()
  name?: string;

  @ApiProperty({ type: String, example: '08123456789' })
  @IsString()
  phone_number?: string;
}
