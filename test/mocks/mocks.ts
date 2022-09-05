// import { Product, Child_category } from '@prisma/client';
// import { addHours, addMinutes } from 'date-fns';

// export const productMocks: Product[] = [
//   {
//     id: 1,
//     denomination: '個',
//     name: '牛乳瓶',
//     description: '大きめの牛乳瓶です',
//     part_number: '12345678',
//     reorder_point: 5,
//     category1_id: 1,
//     tax_id: 1,
//     created_at: new Date(2022, 6, 1, 10, 33, 12),
//     updated_at: new Date(2022, 6, 1, 10, 33, 12),
//   },
//   {
//     id: 2,
//     denomination: 'g',
//     name: 'お茶っ葉',
//     description: '大和茶',
//     part_number: "65412341",
//     reorder_point: 50,
//     category_id: 1,
//     tax_id: 2,
//     created_at: new Date(2022, 6, 3, 11, 2, 1),
//     updated_at: addHours(new Date(2022, 6, 3, 11, 2, 1), 4),
//   },
//   {
//     id: 3,
//     denomination: '本',
//     name: 'ペットボトル',
//     description: 'ポリエチレンテレフタラートボトル',
//     part_number:"" 9991182",
//     reorder_point: 1,
//     category_id: 1,
//     tax_id: 1,
//     created_at: new Date(2022, 6, 8, 1, 22, 53),
//     updated_at: new Date(2022, 6, 8, 1, 22, 53),
//   },
//   {
//     id: 4,
//     denomination: 'g',
//     name: 'ミンチ肉',
//     description: '牛肉',
//     part_number: "8881122",
//     reorder_point: 2,
//     category_id: 1,
//     tax_id: 1,
//     created_at: new Date(2022, 6, 13, 13, 13, 13),
//     updated_at: addMinutes(new Date(2022, 6, 13, 13, 13, 13), 10),
//   },
// ];

// export const categoryMocks: Child_category[] = [
//   {
//     id: 1,
//     parent_id: 2,
//     name: '小カテゴリ1 変更1 < 親カテゴリ1',
//     created_at: new Date('2022-06-17T13:22:55.005Z'),
//     updated_at: new Date('2022-06-17T17:22:09.188Z'),
//   },
//   {
//     id: 3,
//     parent_id: 1,
//     name: '小カテゴリ2 変更1 < 親カテゴリ1',
//     created_at: new Date('2022-06-17T17:36:55.698Z'),
//     updated_at: new Date('2022-06-17T17:36:55.698Z'),
//   },
//   {
//     id: 4,
//     parent_id: 2,
//     name: '小カテゴリ1 変更1 < 親カテゴリ2',
//     created_at: new Date('2022-06-17T17:37:02.742Z'),
//     updated_at: new Date('2022-06-17T17:37:02.743Z'),
//   },
//   {
//     id: 5,
//     parent_id: 2,
//     name: '小カテゴリ2 変更1 < 親カテゴリ2',
//     created_at: new Date('2022-06-17T17:37:07.723Z'),
//     updated_at: new Date('2022-06-17T17:37:07.723Z'),
//   },
// ];
