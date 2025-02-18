import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BookingRepository } from './repositories/booking.repository';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingResponseDto } from './dto/booking-response.dto';

@Injectable()
export class BookingService {
    constructor(
        private prismaService: PrismaService,
        private bookingRepository: BookingRepository
    ) {}

    async create(createBookingDto: CreateBookingDto): Promise<BookingResponseDto> {
        const spaceMustExist = await this.prismaService.space.findFirst({where: {space_id: Number(createBookingDto.space_id)}})
        if (!spaceMustExist) { throw new HttpException('Space not Found', 404) }
        const spaceMustBeNotAvailable = await this.prismaService.booking.findFirst({ 
            where: { 
                space_id: Number(createBookingDto.space_id),
                AND: {status: 'In-progress'} 
            } 
        })
        if (spaceMustBeNotAvailable) {throw new HttpException('Space is booked', 400)}

        const data = await this.prismaService.booking.create({
            data: {
                user_id: Number(createBookingDto.user_id),
                space_id: Number(createBookingDto.space_id),
                start_time: new Date(createBookingDto.start_time),
                end_time: new Date(createBookingDto.end_time),
                status: 'In-progress'
            }
        })
        return {
            booking_id: data.booking_id,
            space_id: data.space_id,
            start_time: data.start_time.toISOString(),
            end_time: data.end_time?.toISOString()!,
            status: data.status
        }
    }

    async findAll(paginationDto: PaginationDto) {
        return this.bookingRepository.findManyWithPagination(paginationDto)
    }

    async update(updateBookingDto: UpdateBookingDto): Promise<BookingResponseDto> {
        const data = await this.prismaService.booking.findFirst({ where: {booking_id: updateBookingDto.booking_id} })

        if (!data) { throw new HttpException('Booking not Found', 404) }

        if (updateBookingDto.user_id) { data.user_id = updateBookingDto.user_id }
        if (updateBookingDto.space_id) { data.space_id = updateBookingDto.space_id }
        if (updateBookingDto.start_time) { data.start_time = new Date(updateBookingDto.start_time) }
        if (updateBookingDto.end_time) { data.end_time = new Date(updateBookingDto.end_time) }

        const result = await this.prismaService.booking.update({
            where: { booking_id: updateBookingDto.booking_id },
            data: data
        })

        return {
            booking_id: data.booking_id,
            space_id: data.space_id,
            start_time: data.start_time.toISOString(),
            end_time: data.end_time?.toISOString()!,
            status: data.status
        }
    }

    async cancel(booking_id: number): Promise<BookingResponseDto> {
        const data = await this.prismaService.booking.findFirst({ where: { booking_id: booking_id } })

        if (!data) { throw new HttpException('Booking not Found', 404) }
        const result = await this.prismaService.booking.update({
            where: { booking_id: booking_id },
            data: { status: 'Cancelled' }
        })
        return {
            booking_id: result.booking_id,
            space_id: result.space_id,
            start_time: result.start_time.toISOString(),
            end_time: result.end_time?.toISOString()!,
            status: result.status
        }
    }
}
