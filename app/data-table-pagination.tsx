'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface DataTablePagenationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagenation<TData, TValue>({ table }: DataTablePagenationProps<TData>) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Show</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="bottom">
            {[10, 50, 100].map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={`${pageSize}`}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Go to</p>
        <Input
          type="number"
          className="h-8 w-[70px]"
          value={`${table.getState().pagination.pageIndex + 1}`}
          onChange={(event) => {
            let page = event.target.value ? Number(event.target.value) - 1 : 0;
            const finalPageIndex = table.getPageCount() - 1;
            if (page > finalPageIndex) {
              page = finalPageIndex;
            } else if (page < 0) {
              page = 0;
            }
            table.setPageIndex(page);
          }}
        ></Input>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
