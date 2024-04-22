import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { columns } from './columns';
import { DataTable } from './data-table';
import { createClient } from '@/utils/supabase/server';

async function getData(): Promise<any> {
  const supabase = createClient();
  const { data: pokemons, error } = await supabase
    .from('pokemons')
    .select('id, name, region, normal, shiny, shadow, light')
    .range(0, 1100)
    .order('id');

  return pokemons;
}

export default async function HomePage() {
  const data = await getData();

  return (
    <div className="flex flex-col mx-auto p-24">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <DataTable
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </div>
  );
}
