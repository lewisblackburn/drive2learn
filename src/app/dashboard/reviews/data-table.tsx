/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  ChevronDown,
  Plus,
  Trash, // Import Trash icon for delete action
} from 'lucide-react';
import * as React from 'react';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Review = {
  id: number;
  name: string;
  description: string;
};

const columns: ColumnDef<Review>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className='lg:w-[50px]'>{row.getValue('id')}</div>,
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
    cell: ({ row }) => {
      const review = row.original as Review | undefined;

      if (!review) {
        console.warn('Row data is undefined or missing.');
        return null;
      }

      const handleDelete = async () => {
        if (
          confirm(
            `Are you sure you want to delete review with ID: ${review.id}?`,
          )
        ) {
          try {
            const response = await fetch(`/api/reviews/delete/${review.id}`, {
              method: 'DELETE',
            });
            if (!response.ok) {
              throw new Error('Failed to delete review');
            }
            // Refresh the page or update the state to reflect the changes
            window.location.reload(); // Consider more efficient state update in practice
          } catch (err: any) {
            alert(`Error: ${err.message}`);
          }
        }
      };

      return (
        <Button variant='ghost' onClick={handleDelete} className='h-8 w-8 p-0'>
          <Trash className='h-4 w-4' />
          <span className='sr-only'>Delete review</span>
        </Button>
      );
    },
  },
];

export function DataTableDemo() {
  const [data, setData] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = React.useState(false);
  const [newReview, setNewReview] = React.useState({
    name: '',
    description: '',
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/reviews/all');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const result = await response.json();
        setData(result.reviews);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleAddReview = async () => {
    try {
      const response = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
      if (!response.ok) {
        throw new Error('Failed to add review');
      }
      window.location.reload(); // Refresh the page
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center w-full mt-20'>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter names...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger className='hidden lg:flex' asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <Button
            variant='outline'
            onClick={() => setIsAddReviewModalOpen(true)}
            className='ml-4'
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Review
          </Button>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog
        open={isAddReviewModalOpen}
        onOpenChange={setIsAddReviewModalOpen}
      >
        <DialogContent>
          <DialogTitle>Add Review</DialogTitle>
          <div className='mt-4'>
            <Input
              placeholder='Name'
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              className='mb-2'
            />
            <Input
              placeholder='Description'
              value={newReview.description}
              onChange={(e) =>
                setNewReview({ ...newReview, description: e.target.value })
              }
              className='mb-4'
            />
            <DialogFooter>
              <Button
                variant='outline'
                onClick={() => setIsAddReviewModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddReview}>Add</Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
