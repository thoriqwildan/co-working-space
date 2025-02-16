import { Body, Controller, Get, Inject, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { JwtRoleGuard } from 'src/common/guards/jwtrole.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(JwtRoleGuard)
@ApiTags('Booking')
@Controller('booking')
export class BookingController {
    constructor(
        private bookingService: BookingService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
    ) {}

    @Get()
    async getAll(@Query() paginationDto: PaginationDto) {
        return this.bookingService.findAll(paginationDto)
    }
}
