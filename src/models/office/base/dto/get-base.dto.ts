import { ApiProperty } from '@nestjs/swagger';
import { Base } from '@prisma/client';

export class GetBaseDto implements Base {
  @ApiProperty()
  id: number;

  @ApiProperty()
  base_name: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  email_address: string;

  @ApiProperty()
  division_name: string;

  @ApiProperty()
  responsible_name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
