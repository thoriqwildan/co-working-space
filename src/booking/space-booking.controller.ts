import { Body, Controller, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtRoleGuard } from 'src/common/guards/jwtrole.guard';
import { BookingService } from './booking.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Request } from 'express';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Space Booking')
@UseGuards(JwtRoleGuard)
@Controller('spaces/:id/booking')
export class SpaceBookingController {
    constructor(
        private bookingService: BookingService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ) {}

    @Post()
    async create(@Req() req: Request, @Param('id') space_id: number, @Body() createBookingDto: CreateBookingDto) {
        createBookingDto.user_id = req.user!['id']
        createBookingDto.space_id = space_id
        const result = await this.bookingService.create(createBookingDto)
        return {
            "msg": "Booking created successfully",
            data: result
        }
    }
}
