/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { ColumnDef } from '@tanstack/react-table';
import { Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Review } from '@/app/hooks/useReviews';
import { capitalizeFirstLetter } from '@/lib/utils';

export const columns: ColumnDef<Review>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <div className='lg:w-[50px]'>
        {capitalizeFirstLetter(row.getValue('type'))}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='lg:w-[200px]'>{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className='truncate lg:text-wrap'>{row.getValue('description')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const review = row.original as Review | undefined;

      if (!review) {
        console.warn('Row data is undefined or missing.');
        return null;
      }

      return (
        <Button
          variant='ghost'
          // @ts-expect-error - `meta` is a custom property on the table options
          onClick={() => table.options.meta?.deleteReview(row.original.id)}
          className='h-8 w-8 p-0'
        >
          <Trash className='h-4 w-4' />
          <span className='sr-only'>Delete review</span>
        </Button>
      );
    },
  },
];
