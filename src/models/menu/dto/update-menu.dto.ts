import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdateMenuDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  required_number: number;
}
