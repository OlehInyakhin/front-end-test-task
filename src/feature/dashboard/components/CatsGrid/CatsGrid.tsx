import { ChangeEvent, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useGetCatsQuery } from "@/feature/dashboard/services/catsService";
import { useDebounce } from "@/hooks";

type SortValues = 'name' | 'adaptability' | 'affection_level' | '';

export function CatsGrid () {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('sort') ?? '');
    const [sort, setSort] = useState<SortValues>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: cats, refetch } = useGetCatsQuery({ q: debouncedSearchTerm });
    const sortedCats = sort ? cats?.slice().sort((a, b) => +a[sort] - +b[sort]) : cats;

    const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.currentTarget;
        setSort(value as SortValues);
        searchParams.set('sort', value);
        setSearchParams(searchParams);
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        const trimValue = value.trimStart()
        
        e.currentTarget.value = trimValue;

        if (!value) {
            searchParams.delete('q');
        } else {
            searchParams.set('q', trimValue);
        }
        setSearchParams(searchParams);
        setSearchTerm(trimValue);
    };

    useEffect(() => {
        refetch();
    }, [debouncedSearchTerm]);

    return (
        <div className="w-full mt-12">
            <div className="flex items-start mb-6 gap-4">
                <div className="max-w-sm space-y-3">
                    <input onInput={handleSearch} type="text" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search..." />
                </div>
                <div className="flex justify-end items-center ms-auto gap-4">
                    <p>Sort by</p>
                    <select onChange={handleSort} className="w-xxs py-3 px-4 pe-9 block border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                        <option value='name'>Name</option>
                        <option value='adaptability'>Adaptability</option>
                        <option value='affection_level'>Affection Level</option>
                    </select>
                </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCats?.length
                    ? sortedCats.map((cat) => (
                        <div
                            key={`cat-${cat.name.replaceAll(' ', '-')}`}
                            className="group flex flex-col h-full bg-white dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-gray-900 shadow-sm rounded-xl">
                            <div className="p-4 md:p-6">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-inherit mb-2">
                                    {cat.name}
                                </h3>
                                <span className="block mb-1 text-xs font-semibold uppercase text-blue-600">
                                    Origin: {cat.origin ?? "Unknown"}
                                </span>
                                <p className="mt-3 text-gray-500 line-clamp-3">
                                    {cat.description ?? "No description available"}
                                </p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span>Adaptability:</span>
                                        <span>{cat.adaptability ?? "Unknown"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Affection Level:</span>
                                        <span>{cat.affection_level ?? "Unknown"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Life Span:</span>
                                        <span>{cat.life_span ? `${cat.life_span} years` : "Unknown"} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : <p className="col-span-full text-3xl text-gray-800 text-center dark:text-white">No Cats Found</p>
                }
            </div>
        </div>
    )
}