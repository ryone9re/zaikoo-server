import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

class required {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  required_product_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  required_number: number;
}

export class CreateMenuDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  request_product_id: number;

  @ArrayNotEmpty()
  requires: required[];
}
