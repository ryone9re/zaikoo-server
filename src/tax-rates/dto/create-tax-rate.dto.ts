import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateTaxRateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1)
  rate: number;
}
