import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';
import { IsNumber } from 'class-validator';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  user_id?: number | undefined;

  space_id?: number | undefined;

  @IsNumber()
  booking_id: number;

  @ApiPropertyOptional({ example: '2024-02-16T10:00:00.000Z', type: String })
  start_time?: string | undefined;

  @ApiPropertyOptional({ example: '2024-02-16T10:00:00.000Z', type: String })
  end_time?: string | undefined;
}
