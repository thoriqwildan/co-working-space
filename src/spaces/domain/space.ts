import { ApiProperty } from '@nestjs/swagger';

export class Space {
  @ApiProperty({
    type: Number,
  })
  id: number;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  location: string;

  @ApiProperty({
    type: Number,
  })
  capacity: number;

  @ApiProperty({
    type: String,
  })
  type: string;

  @ApiProperty({
    type: Number,
  })
  price: number;

  @ApiProperty({
    type: String,
  })
  equipment?: string;
}
