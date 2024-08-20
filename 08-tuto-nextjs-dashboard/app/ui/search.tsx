'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// useSearchParams : Permet d'accéder aux paramètres de l'URL actuelle. Par exemple, les paramètres de recherche pour cette URL /dashboard/invoices?page=1&query=pendingressembleraient à ceci : {page: '1', query: 'pending'}.
// usePathname : Permet de lire le chemin d'accès de l'URL actuelle. Par exemple, pour la route /dashboard/invoices, usePathnamerenverrait '/dashboard/invoices'.
// useRouter : Permet la navigation entre les itinéraires au sein des composants clients par programmation.

import { useDebouncedCallback } from 'use-debounce';

// Le debouncing est une pratique de programmation qui limite la vitesse à laquelle une fonction peut se déclencher. Dans notre cas, vous ne souhaitez interroger la base de données que lorsque l'utilisateur a arrêté de taper. En anti-rebond, vous pouvez réduire le nombre de requêtes envoyées à votre base de données, économisant ainsi des ressources.

export default function Search({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {

    console.log(`Searching... ${term}`);


    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
