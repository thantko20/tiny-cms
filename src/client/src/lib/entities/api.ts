import { api } from '$lib';
import type { EntitySchema } from '$lib/types';

export const getEntities = async () => {
	return api.get<EntitySchema[]>('/entities').then((res) => res.data);
};
