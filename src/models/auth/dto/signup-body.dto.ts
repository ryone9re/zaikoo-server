import { IsEmail, IsString } from 'class-validator';

export class SignupBody {
  @IsEmail()
  readonly emailAddress: string;

  @IsString()
  readonly password: string;
}
