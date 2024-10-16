'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { capitalizeFirstLetter } from '@/lib/utils';

import Spinner from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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

const FormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  type: z.enum(['student', 'instructor'], {
    required_error: 'Please select a type.',
  }),
});

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'student',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    addReview(data);
    form.reset();
    setIsAddReviewModalOpen(false);
  };

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
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-4'
            >
              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a course to book' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['student', 'instructor'].map((type) => (
                          <SelectItem key={type} value={type}>
                            {capitalizeFirstLetter(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can change your course selection above.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Description' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <Button
                  variant='outline'
                  onClick={() => setIsAddReviewModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type='submit'>Add Review</Button>
              </SheetFooter>
            </form>
          </FormProvider>
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
