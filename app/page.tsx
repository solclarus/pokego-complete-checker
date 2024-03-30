import { Pokemon, columns } from "./columns"
import { DataTable } from "./data-table"
import { createClient } from '@/utils/supabase/server'

async function getData(): Promise<any> {
  const supabase = createClient()
  const { data: pokemons, error } = await supabase
    .from('pokemons')
    .select('id, name, region, all, shiny')
    .range(500, 800)
    .order('id')

  return pokemons
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <DataTable columns={columns} data={data} />
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}
