import { Body, Controller, Delete, Inject, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtRoleGuard } from 'src/common/guards/jwtrole.guard';
import { BookingService } from './booking.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Request } from 'express';
import { CreateBookingDto } from './dto/create-booking.dto';
import { ApiBearerAuth, ApiOkResponse, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingResponseDto } from './dto/booking-response.dto';

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
    @ApiProperty({
        title: 'Create Booking'
    })
    async create(@Req() req: Request, @Param('id') space_id: number, @Body() createBookingDto: CreateBookingDto) {
        createBookingDto.user_id = req.user!['id']
        createBookingDto.space_id = space_id
        const result = await this.bookingService.create(createBookingDto)
        return {
            "msg": "Booking created successfully",
            data: result
        }
    }

    @Patch(':booking_id')
    async update(
        @Req() req: Request, 
        @Param('id') space_id: number,
        @Param('booking_id') booking_id: number,
        @Body() updateBookingDto: UpdateBookingDto
    ) {
        updateBookingDto.user_id = req.user!['id']
        updateBookingDto.space_id = Number(space_id)
        updateBookingDto.booking_id = Number(booking_id)
        const result = await this.bookingService.update(updateBookingDto)
        return {
            "msg": "Booking updated successfully",
            data: result
        }
    }

    @Delete(':booking_id')
    async cancel(@Param('booking_id', ParseIntPipe) booking_id: number) {
        const result = await this.bookingService.cancel(booking_id)
        return {
            "msg": "Booking cancelled successfully",
            data: result
        }
    }
}
