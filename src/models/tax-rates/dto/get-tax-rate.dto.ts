import { ApiProperty } from '@nestjs/swagger';
import { Tax_rate } from '@prisma/client';

export class GetTaxRateDto implements Tax_rate {
  @ApiProperty()
  id: number;

  @ApiProperty()
  rate: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
