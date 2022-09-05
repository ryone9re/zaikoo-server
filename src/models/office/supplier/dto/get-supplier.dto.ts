import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from '@prisma/client';

export class GetSupplierDto implements Supplier {
  @ApiProperty()
  id: number;

  @ApiProperty()
  supplier_name: string;

  @ApiProperty()
  postal_code: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  email_address: string;

  @ApiProperty()
  phone_number: string;

  @ApiProperty()
  division_name: string;

  @ApiProperty()
  responsible_name: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}

export class GetSupplierNameListDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  supplier_name: string;
}
