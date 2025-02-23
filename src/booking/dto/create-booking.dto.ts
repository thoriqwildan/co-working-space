import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  space_id: number;

  @IsString()
  @ApiProperty({
    example: '2024-02-16T10:00:00.000Z',
    type: String,
  })
  start_time: string;

  @IsString()
  @ApiProperty({
    example: '2024-02-16T10:00:00.000Z',
    type: String,
  })
  end_time: string;

  @IsString()
  status: string;
}
