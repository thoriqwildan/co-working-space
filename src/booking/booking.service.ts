import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BookingRepository } from './repositories/booking.repository';

@Injectable()
export class BookingService {
    constructor(
        private prismaService: PrismaService,
        private bookingRepository: BookingRepository
    ) {}

    async create(createBookingDto: CreateBookingDto) {
        const spaceMustExist = await this.prismaService.space.findFirst({where: {space_id: Number(createBookingDto.space_id)}})
        if (!spaceMustExist) { throw new HttpException('Space not Found', 404) }
        const spaceMustBeNotAvailable = await this.prismaService.booking.findFirst({ where: { space_id: Number(createBookingDto.space_id) } })
        if (spaceMustBeNotAvailable) {throw new HttpException('Space is booked', 400)}

        const data = await this.prismaService.booking.create({
            data: {
                user_id: Number(createBookingDto.user_id),
                space_id: Number(createBookingDto.space_id),
                start_time: new Date(createBookingDto.start_time),
                end_time: new Date(createBookingDto.end_time),
                status: createBookingDto.status
            }
        })
        return data
    }

    async findAll(paginationDto: PaginationDto) {
        return this.bookingRepository.findManyWithPagination(paginationDto)
    }
}
