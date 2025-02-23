import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  Equals,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { lowerCaseTransformer } from 'src/common/helpers/lower-case.helper';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', type: String })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'test@example.com', type: String })
  @IsEmail()
  @Transform(lowerCaseTransformer)
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '08123456789', type: String })
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  confirm_password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'test@example.com', type: String })
  @IsEmail()
  @Transform(lowerCaseTransformer)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}

export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.password)
  @Equals('password', { message: 'Password do not match' })
  confirm_password: string;
}
