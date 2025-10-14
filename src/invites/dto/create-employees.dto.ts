import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
// import { IsEmailUnique } from '../../common/validators/is-email-unique.validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}
