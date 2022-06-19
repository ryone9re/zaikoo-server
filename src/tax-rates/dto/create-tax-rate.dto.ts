import { IsNotEmpty, IsNumber, IsPositive, Max, Min } from 'class-validator';

export class CreateTaxRateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Min(0)
  @Max(1)
  rate: number;
}
