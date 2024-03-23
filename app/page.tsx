'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'

const imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';
const imageShinyUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny';

export default function Home() {
  const [details, setDetails] = useState<Pokemon[]>([]);
  const [clickedStates, setClickedStates] = useState<{ [key: number]: boolean }>({});
  const [shinyClickedStates, setShinyClickedStates] = useState<{ [key: number]: boolean }>({});

  const handleClick = (id: any) => {
    setClickedStates(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };
  const handleShinyClick = (id: any) => {
    setShinyClickedStates(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  useEffect(() => {
    async function fetchPokemon() {
      const pokemonList = await getPokemonList();
      const details = await getPokemonDetails(pokemonList);
      setDetails(details);
    }
    async function getPokemonDetails(pokemonList: any) {
      const pokemonDetails = [];
      for (const pokemon of pokemonList) {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        const jaNameEntry = data.names.find((nameEntry: { language: { name: string; }; }) => nameEntry.language.name === "ja-Hrkt");
        const pokemonDetail = {
          id: data.id,
          name: data.name,
          jaName: jaNameEntry.name,
        };
        pokemonDetails.push(pokemonDetail);
      }
      return pokemonDetails;
    }

    fetchPokemon();
  }, []);

  async function getPokemonList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon-species?limit=1025');
    const data = await response.json();
    return data.results;
  }

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
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Normal</th>
                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500">Shiny</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {details.map((pokemon: Pokemon) => {
                    return <tr key={pokemon.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{pokemon.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{pokemon.jaName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"><Image
                        src={`${imageUrl}/${pokemon.id}.png`}
                        width={30}
                        height={30}
                        alt={pokemon.name}
                        onClick={() => handleClick(pokemon.id)}
                        style={{ filter: clickedStates[pokemon.id] ? 'opacity(20%)' : 'none' }}
                      /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"><Image
                        src={`${imageShinyUrl}/${pokemon.id}.png`}
                        width={30}
                        height={30}
                        alt={pokemon.name}
                        onClick={() => handleShinyClick(pokemon.id)}
                        style={{ filter: shinyClickedStates[pokemon.id] ? 'opacity(20%)' : 'none' }}
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

type Pokemon = {
  id: number;
  name: string;
  jaName: string;
};