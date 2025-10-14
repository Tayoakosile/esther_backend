// src/admin/dto/create-admin.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
// import { IsEmailUnique } from '../../common/validators/is-email-unique.validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  // @Validate(IsEmailUnique) // custom validator to check DB for uniqueness
  readonly email: string;

  @IsOptional()
  readonly is_verified?: boolean;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
export class loginAdminDto {
  @IsNotEmpty()
  @IsEmail()
  // @Validate(IsEmailUnique) // custom validator to check DB for uniqueness
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
