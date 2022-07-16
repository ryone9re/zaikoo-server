import { IsString } from 'class-validator';

export class SignupBody {
  @IsString()
  readonly userName: string;
}
