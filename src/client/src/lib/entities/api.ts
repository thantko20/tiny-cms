import { api } from '$lib';
import { createQuery } from '@tanstack/svelte-query';

export const getEntities = async () => {
	return api.get('/entities').json<
		{
			name: string;
			table_name: string;
			schema: object;
		}[]
	>();
};

export const entitiesQuery = createQuery({
	queryKey: ['entities'],
	queryFn: getEntities
});
