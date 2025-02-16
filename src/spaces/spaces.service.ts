import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateSpaceDto } from './dto/spaces.dto';
import { Space } from './domain/space';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SpaceRepository } from './repositories/space.repository';
import { User } from 'src/user/domain/user';
import { NullableType } from 'src/common/types/nullable.type';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { SpaceResponseDto } from './dto/space-response.dto';

@Injectable()
export class SpacesService {
    constructor(
        private prismaService: PrismaService,
        private spaceRepository: SpaceRepository
    ) {}

    async create(createSpaceDto: CreateSpaceDto): Promise<Space> {
        const data = await this.prismaService.space.create({
            data: {
                name: createSpaceDto.name,
                location: createSpaceDto.location,
                capacity: createSpaceDto.capacity,
                type: createSpaceDto.type,
                rooms: { create: { equiment: createSpaceDto.equipment! } }
            }
        })

        const room = await this.prismaService.room.findFirst({where: {space_id: data.space_id}})

        return {
            id: data.space_id,
            name: data.name,
            location: data.location,
            capacity: data.capacity,
            type: data.type,
            equipment: room?.equiment!
        }
    }

    async findAll(paginationDto: PaginationDto) {
        return this.spaceRepository.findManyWithPagination(paginationDto)
    }

    async findById(id: User['id']) {
        return this.spaceRepository.findById(id)
    }

    async update(id: User['id'], updateSpaceDto: UpdateSpaceDto): Promise<SpaceResponseDto> {
        const data = await this.prismaService.space.findFirst({ where: {space_id: Number(id)} })
        const roomdata = await this.prismaService.room.findFirst({ where: { space_id: Number(id) } })

        if (!data) { throw new HttpException('Space not Found', 404) }

        if(updateSpaceDto.name) { data.name = updateSpaceDto.name }
        if(updateSpaceDto.location) { data.location = updateSpaceDto.location }
        if(updateSpaceDto.capacity) { data.capacity = updateSpaceDto.capacity }
        if(updateSpaceDto.type) { data.type = updateSpaceDto.type }
        if(updateSpaceDto.equipment && roomdata) { roomdata.equiment = updateSpaceDto.equipment }

        const result = await this.prismaService.space.update({
            where: { space_id: Number(id) },
            data: {
                name: data.name,
                location: data.location,
                capacity: data.capacity,
                type: data.type,
                rooms: {
                    update: {
                        where: { room_id: roomdata?.room_id },
                        data: { equiment: roomdata?.equiment }
                    }
                }
            }
        })

        return {
            id: result.space_id,
            name: result.name,
            capacity: result.capacity,
            location: result.location,
            type: result.type,
            room: {id: roomdata?.room_id!, equipment: roomdata?.equiment!}
        }
    }

    async remove(id: User['id']) {
        await this.prismaService.room.delete({ where: {space_id: Number(id)} })
        await this.prismaService.space.delete({where: {space_id: Number(id)}})
    }
}
