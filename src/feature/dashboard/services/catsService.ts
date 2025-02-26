import { BaseQueryApi, BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, BaseQueryExtraOptions } from "@reduxjs/toolkit/query/react";

export interface CatModel {
	weight: { imperial: string; metric: string };
	id: string;
	name: string;
	cfa_url: string;
	vetstreet_url: string;
	vcahospitals_url: string;
	temperament: string;
	origin: string;
	country_codes: string;
	country_code: string;
	description: string;
	life_span: string;
	indoor: number;
	lap: number;
	alt_names: string;
	adaptability: number;
	affection_level: number;
	child_friendly: number;
	dog_friendly: number;
	energy_level: number;
	grooming: number;
	health_issues: number;
	intelligence: number;
	shedding_level: number;
	social_needs: number;
	stranger_friendly: number;
	vocalisation: number;
	experimental: number;
	hairless: number;
	natural: number;
	rare: number;
	rex: number;
	suppressed_tail: number;
	short_legs: number;
	wikipedia_url: string;
	hypoallergenic: number;
	reference_image_id: string;
	image?: {
		id: string;
		width: number;
		height: number;
		url: string;
	};
}

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,
});

const baseQueryWithRetry = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: BaseQueryExtraOptions<BaseQueryFn>) => {
	let result = await baseQuery(args, api, extraOptions);
	if (result.error) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		result = await baseQuery(args, api, extraOptions);
	}
	return result;
};

export const catsApi = createApi({
	reducerPath: "catsApi",
	baseQuery: baseQueryWithRetry,
	tagTypes: ['Cats'],
	endpoints: (builder) => ({
		getCats: builder.query<CatModel[], { q?: string }>({
			query: ({ q }) => {
				return `/breeds${q ? `/search?q=${q}` : ''}`;
			},
		}),
	}),
});

export const { useGetCatsQuery } = catsApi;
