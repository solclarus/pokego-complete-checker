import { ThemeSwitch } from '@/components/theme-switch';
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col">
        <div className="min-w-full inline-block align-middle">
          <div className="flex pb-16 items-center justify-between">
            <div className="text-xl font-bold">Pokémon Go Complete Checker</div>
            <div className="flex gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ThemeSwitch />
            </div>
          </div>
          <div className="overflow-hidden">
            <DataTable
              columns={columns}
              data={data}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
