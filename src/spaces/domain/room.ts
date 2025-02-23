import { ApiProperty } from '@nestjs/swagger';

export class Room {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  equipment: string;
}
