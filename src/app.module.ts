import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SpacesModule } from './spaces/spaces.module';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';
@Module({
  imports: [CommonModule, AuthModule, UserModule, SpacesModule, BookingModule, PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
