import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SpacesModule } from './spaces/spaces.module';
import { BookingModule } from './booking/booking.module';
@Module({
  imports: [CommonModule, AuthModule, UserModule, SpacesModule, BookingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
