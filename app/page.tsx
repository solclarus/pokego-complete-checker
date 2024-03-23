import Image from 'next/image'

type Pokemon = {
  index: number;
  name: string;
}

const pokemons: Array<Pokemon> = [
  { index: 1, name: 'フシギダネ', },
  { index: 2, name: 'フシギソウ', },
  { index: 3, name: 'フシギバナ', },
]

const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const imageShinyUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Index</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Pokémon</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">All</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">3 Star</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Lucky</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Shadow</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Light</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Shiny</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {pokemons.map((pokemon) => {
                    return <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{pokemon.index}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{pokemon.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"><Image
                        src={`${imageUrl}/${pokemon.index}.png`}
                        width={30}
                        height={30}
                        alt={pokemon.name}
                      /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"><Image
                        src={`${imageUrl}/${pokemon.index}.png`}
                        width={30}
                        height={30}
                        alt={pokemon.name}
                      /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"><Image
                        src={`${imageUrl}/${pokemon.index}.png`}
                        width={30}
                        height={30}
                        alt={pokemon.name}
                      /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"><Image
                        src={`${imageUrl}/${pokemon.index}.png`}
                        width={30}
                        height={30}
                        alt={pokemon.name}
                      /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"><Image
                        src={`${imageUrl}/${pokemon.index}.png`}
                        width={30}
                        height={30}
                        alt={pokemon.name}
                      /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"><Image
                        src={`${imageShinyUrl}/${pokemon.index}.png`}
                        width={30}
                        height={30}
                        alt={pokemon.name}
                      /></td>

                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
