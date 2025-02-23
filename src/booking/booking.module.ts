import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingRepository } from './repositories/booking.repository';
import { SpaceBookingController } from './space-booking.controller';

@Module({
  providers: [BookingService, BookingRepository],
  controllers: [BookingController, SpaceBookingController],
})
export class BookingModule {}
