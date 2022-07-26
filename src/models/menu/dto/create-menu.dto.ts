import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

class required {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  required_product_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  required_number: number;
}

export class CreateMenuDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  request_product_id: number;

  @ApiProperty({ type: [required] })
  @ArrayNotEmpty()
  requires: required[];
}
