'use client';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTablePagenation } from './data-table-pagination';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const regions = [
  { label: 'カントー', value: 'kanto' },
  { label: 'ジョウト', value: 'johto' },
  { label: 'ホウエン', value: 'hoenn' },
  { label: 'シンオウ', value: 'sinnoh' },
  { label: 'イッシュ', value: 'unova' },
  { label: 'カロス', value: 'kalos' },
  { label: 'アローラ', value: 'alola' },
  { label: 'ガラル', value: 'galar' },
  { label: 'ヒスイ', value: 'hisui' },
  { label: 'パルデア', value: 'paldea' },
  { label: '未確認', value: 'unknown' },
];
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const selectableColumnIds = ['normal', 'shiny', 'shadow', 'light'];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });
  const [selectedCells, setSelectedCells] = useState<{ [key: string]: boolean }>({});
  const handleCellClick = (rowId: string, columnId: string) => {
    if (selectableColumnIds.includes(columnId)) {
      const cellId = `${rowId}-${columnId}`;
      setSelectedCells((prev) => ({
        ...prev,
        [cellId]: !prev[cellId], // 選択状態をトグル
      }));
    }
  };
  return (
    <div className="m-1">
      <div className="flex items-center pb-4 gap-2">
        <Input
          placeholder="Find Pokémon"
          className="h-8"
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                return <div></div>;
              }}
            >
              <MixerHorizontalIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <DataTableFacetedFilter
                  column={table.getColumn('region')}
                  title="Region"
                  options={regions}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="pb-4">
        <DataTablePagenation table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => {
                    const cellId = `${row.id}-${cell.column.id}`;
                    const isSelectableCell = selectableColumnIds.includes(cell.column.id);
                    const isSelectedCell = isSelectableCell && selectedCells[cellId];
                    const cellStyle = isSelectableCell
                      ? isSelectedCell
                        ? {}
                        : { opacity: 0.2 }
                      : {};
                    return (
                      <TableCell
                        key={cell.id}
                        style={cellStyle}
                        onClick={() => handleCellClick(row.id, cell.column.id)}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
