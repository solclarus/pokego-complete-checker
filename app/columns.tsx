'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export type Region = {
  region:
    | 'kanto'
    | 'johto'
    | 'hoenn'
    | 'sinnoh'
    | 'unova'
    | 'kalos'
    | 'alola'
    | 'galar'
    | 'hisui'
    | 'paldea'
    | 'unknown';
};

export type Pokemon = {
  id: number;
  name: string;
  region: Region;
  normal: boolean;
  shiny: boolean;
  shadow: boolean;
  light: boolean;
};
const imageUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const imageShinyUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny';

export const columns: ColumnDef<Pokemon>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'normal',
    header: 'Normal',
    cell: ({ row }) => {
      return row.original.normal ? (
        <div className="flex justify-center items-center">
          <Image
            className="place-self-center"
            src={`${imageUrl}/${row.original.id}.png`}
            width={30}
            height={30}
            alt={row.original.name}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <span>-</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'shiny',
    header: 'Shiny',
    cell: ({ row }) => {
      return row.original.shiny ? (
        <div className="flex justify-center items-center">
          <Image
            className="place-self-center"
            src={`${imageShinyUrl}/${row.original.id}.png`}
            width={30}
            height={30}
            alt={row.original.name}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <span>-</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'shadow',
    header: 'Shadow',
    cell: ({ row }) => {
      return row.original.shadow ? (
        <div className="flex justify-center items-center">
          <Image
            className="place-self-center"
            src={`${imageUrl}/${row.original.id}.png`}
            width={30}
            height={30}
            alt={row.original.name}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <span>-</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'light',
    header: 'Light',
    cell: ({ row }) => {
      return row.original.light ? (
        <div className="flex justify-center items-center">
          <Image
            className="place-self-center"
            src={`${imageUrl}/${row.original.id}.png`}
            width={30}
            height={30}
            alt={row.original.name}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <span>-</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'region',
    header: 'Region',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
