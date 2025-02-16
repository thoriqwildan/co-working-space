import { Inject } from "@nestjs/common";
import { Booking } from "@prisma/client";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PaginationResponseDto } from "src/common/dto/pagination-response.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PrismaService } from "src/common/prisma/prisma.service";
import { Logger } from "winston";

export class BookingRepository {
    constructor( private prismaService: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger ) {}

    async findManyWithPagination(paginationDto: PaginationDto): Promise<PaginationResponseDto<Booking>> {
        const { page, limit } = paginationDto
        const skip = (page! - 1) * limit!

        const [data, total] = await Promise.all([
            this.prismaService.booking.findMany({
                skip,
                take: Number(limit),
                orderBy: {booking_id: 'asc'}
            }),
            this.prismaService.booking.count()
        ])

        this.logger.info(`Data booking: ${data}`)

        return {
            data,
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit!)
        }
    }
}