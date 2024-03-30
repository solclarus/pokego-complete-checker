"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Pokemon = {
    id: number
    name: string
    region: "kanto" | "johto" | "hoenn" | "sinnoh" | "unova" | "kalos" | "alola" | "galar" | "hisui" | "paldea" | "unknown"
    all: boolean
    shiny: boolean
}
const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const imageShinyUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny';

export const columns: ColumnDef<Pokemon>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "all",
        header: "Normal",
        cell: ({ row }) => {
            return row.original.all ? (
                <Image
                    src={`${imageUrl}/${row.original.id}.png`}
                    width={30}
                    height={30}
                    alt={row.original.name}
                />
            ) : null;
        },
    },
    {
        accessorKey: "id",
        header: "Shiny",
        cell: ({ row }) => {
            return row.original.shiny ? (
                <Image
                    src={`${imageShinyUrl}/${row.original.id}.png`}
                    width={30}
                    height={30}
                    alt={row.original.name}
                />
            ) : null;
        },
    },
    {
        accessorKey: "region",
        header: "Region",
    },
]
