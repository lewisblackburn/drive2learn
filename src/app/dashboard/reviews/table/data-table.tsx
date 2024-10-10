'use client';
import {
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
import { ChevronDown, Plus } from 'lucide-react';
import * as React from 'react';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

import { columns } from '@/app/dashboard/reviews/table/columns';
import { useReviews } from '@/app/hooks/useReviews';

export function DataTable() {
  const {
    loading,
    reviews,
    addReview,
    deleteReview,
    count,
    page,
    hasMore,
    previousPage,
    loadMoreReviews,
    searchReviews,
    fetchReviews,
  } = useReviews('paged');

  const searchInputRef = React.useRef<HTMLInputElement>(null);
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
    type: 'student',
  });

  const table = useReactTable({
    data: reviews,
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
    meta: {
      deleteReview,
    },
  });

  const isFiltering = searchInputRef.current
    ? searchInputRef.current.value.length > 0
    : false;

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          ref={searchInputRef}
          placeholder='Search reviews...'
          onChange={(e) => {
            if (e.target.value.length < 2) {
              setTimeout(() => fetchReviews(1), 0);
              table.reset();
            } else {
              searchReviews(e.target.value);
              table.setPageSize(reviews.length);
            }
          }}
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
      <Sheet open={isAddReviewModalOpen} onOpenChange={setIsAddReviewModalOpen}>
        <SheetContent className='overflow-y-scroll'>
          <SheetTitle>Add Review</SheetTitle>
          <div className='mt-4'>
            <Input
              placeholder='Name'
              value={newReview.name}
              onChange={(e) =>
                setNewReview({ ...newReview, name: e.target.value })
              }
              className='mb-2'
            />
            <Textarea
              placeholder='Description'
              value={newReview.description}
              onChange={(e) =>
                setNewReview({ ...newReview, description: e.target.value })
              }
              className='mb-4'
            />
            <SheetFooter>
              <Button
                variant='outline'
                onClick={() => setIsAddReviewModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  addReview(newReview);
                  setNewReview({ name: '', description: '', type: 'student' });
                  setIsAddReviewModalOpen(false);
                }}
              >
                Add Review
              </Button>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                  colSpan={table.getHeaderGroups()[0].headers.length}
                  className='h-24 text-center'
                >
                  {loading ? (
                    <div className='flex items-center justify-center'>
                      <Spinner />
                    </div>
                  ) : (
                    'No results.'
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {isFiltering
            ? 'Showing all results'
            : `Page ${page} of ${Math.ceil(count / 5)}`}
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => previousPage()}
            disabled={loading || page <= 1 || isFiltering}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => loadMoreReviews()}
            disabled={loading || !hasMore || isFiltering}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
