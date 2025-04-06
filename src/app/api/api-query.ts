import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = import.meta.env.VITE_SEARCH_API_URL;

interface SWAPIResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Character[];
}

export interface Character {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string;
	films: string[];
	species: string[];
	vehicles: string[];
	starships: string[];
	created: string;
	edited: string;
	url: string;
}

interface SWAPIRequest {
	page?: number | null;
}

// инициализация api
export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: url,
	}),
	keepUnusedDataFor: 60,
	endpoints: (build) => ({
		getCharacters: build.query<SWAPIResponse, SWAPIRequest>({
			query: ({ page }) => {
				let url = 'people';
				let params = null;

				if (page) {
					params = new URLSearchParams({ page: page.toString() });
				}

				return {
					url,
					params: params ?? undefined,
				};
			},
		}),
	}),
});

export const { useGetCharactersQuery } = api;
