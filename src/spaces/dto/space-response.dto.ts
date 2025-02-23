import { ApiProperty } from '@nestjs/swagger';
import { Space } from '../domain/space';
import { Room } from '../domain/room';

export class SpaceResponseDto extends Space {
  @ApiProperty({
    type: Room,
  })
  room: Room;
}
