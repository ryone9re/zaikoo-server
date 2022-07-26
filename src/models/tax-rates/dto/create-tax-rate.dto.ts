import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';

export class CreateTaxRateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(1)
  rate: number;
}
