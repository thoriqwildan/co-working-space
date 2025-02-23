import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Space } from '@prisma/client';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { NullableType } from 'src/common/types/nullable.type';
import { User } from 'src/user/domain/user';
import { SpaceResponseDto } from '../dto/space-response.dto';
import { FilterSpaceDto } from '../dto/query-space.dto';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class SpaceRepository {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  async findById(id: User['id']): Promise<SpaceResponseDto> {
    const result = await this.prismaService.space.findFirst({
      where: { space_id: Number(id) },
    });
    const roomdata = await this.prismaService.room.findFirst({
      where: { space_id: Number(id) },
    });

    return {
      id: result?.space_id!,
      name: result?.name!,
      capacity: result?.capacity!,
      location: result?.location!,
      type: result?.type!,
      price: result?.price!,
      room: { id: roomdata?.room_id!, equipment: roomdata?.equiment! },
    };
  }

  async findManyWithPagination(
    paginationDto: FilterSpaceDto,
  ): Promise<PaginationResponseDto<Space>> {
    const { page, limit } = paginationDto;
    const skip = (page! - 1) * limit!;
    const filters: Prisma.SpaceWhereInput[] = [];

    if (paginationDto.filter) {
      filters.push({
        type: { contains: paginationDto.filter },
      });
    }

    if (paginationDto.price_gte || paginationDto.price_lte) {
      filters.push({
        price: {
          gte: paginationDto.price_gte
            ? Number(paginationDto.price_gte)
            : undefined,
          lte: paginationDto.price_lte
            ? Number(paginationDto.price_lte)
            : undefined,
        },
      });
    }

    this.logger.info(`Greater than: ${paginationDto.price_gte}`);
    this.logger.info(`Less than: ${paginationDto.price_lte}`);

    const [data, total] = await Promise.all([
      this.prismaService.space.findMany({
        where: {
          AND: filters,
        },
        skip,
        take: Number(limit),
        orderBy: { space_id: 'asc' },
      }),
      this.prismaService.space.count(),
    ]);

    return {
      data: data,
      total,
      page: Number(page!) || 0,
      limit: Number(limit!),
      totalPages: Math.ceil(total / limit!),
    };
  }
}
