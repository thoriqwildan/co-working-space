import { Injectable } from "@nestjs/common";
import { Space } from "@prisma/client";
import { PaginationResponseDto } from "src/common/dto/pagination-response.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PrismaService } from "src/common/prisma/prisma.service";
import { NullableType } from "src/common/types/nullable.type";
import { User } from "src/user/domain/user";
import { SpaceResponseDto } from "../dto/space-response.dto";

@Injectable()
export class SpaceRepository {
    constructor(private prismaService: PrismaService) {}

    async findById(id: User['id']): Promise<SpaceResponseDto> {
        const result = await this.prismaService.space.findFirst({ where: {space_id: Number(id)} })
        const roomdata = await this.prismaService.room.findFirst({ where: { space_id: Number(id) } })

        return {
            id: result?.space_id!,
            name: result?.name!,
            capacity: result?.capacity!,
            location: result?.location!,
            type: result?.type!,
            room: {id: roomdata?.room_id!, equipment: roomdata?.equiment!}
        }
    }

    async findManyWithPagination(paginationDto: PaginationDto): Promise<PaginationResponseDto<Space>> {
        const { page, limit } = paginationDto
        const skip = (page! - 1) * limit!

        const [data, total] = await Promise.all([
            this.prismaService.space.findMany({
                skip,
                take: Number(limit),
                orderBy: { space_id: 'asc' }
            }),
            this.prismaService.space.count()
        ])

        return {
            data,
            total,
            page: Number(page!),
            limit: Number(limit!),
            totalPages: Math.ceil(total! / limit!)
        }
    }
}