import { Product } from '@prisma/client';
import dayjs from 'dayjs';

export const productMocks: Product[] = [
  {
    id: 1,
    denomination: '個',
    name: '牛乳瓶',
    description: '大きめの牛乳瓶です',
    part_number: 12345678,
    reorder_point: 5,
    category_id: 1,
    tax_id: 1,
    created_at: dayjs('2022-06-01 10:33:12').toDate(),
    updated_at: dayjs('2022-06-01 10:33:12').toDate(),
  },
  {
    id: 2,
    denomination: 'g',
    name: 'お茶っ葉',
    description: '大和茶',
    part_number: 65412341,
    reorder_point: 50,
    category_id: 1,
    tax_id: 2,
    created_at: dayjs('2022-06-03 11:02:01').toDate(),
    updated_at: dayjs('2022-06-03 11:02:01').add(5, 'd').toDate(),
  },
  {
    id: 3,
    denomination: '本',
    name: 'ペットボトル',
    description: 'ポリエチレンテレフタラートボトル',
    part_number: 9991182,
    reorder_point: 1,
    category_id: 1,
    tax_id: 1,
    created_at: dayjs('2022-06-08 01:22:53').toDate(),
    updated_at: dayjs('2022-06-08 01:22:53').toDate(),
  },
  {
    id: 4,
    denomination: 'g',
    name: 'ミンチ肉',
    description: '牛肉',
    part_number: 8881122,
    reorder_point: 2,
    category_id: 1,
    tax_id: 1,
    created_at: dayjs('2022-06-13 13:13:13').toDate(),
    updated_at: dayjs('2022-06-13 13:13:13').toDate(),
  },
];
