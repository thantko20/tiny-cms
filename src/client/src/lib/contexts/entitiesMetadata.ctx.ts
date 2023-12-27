import type { EntitySchema } from '$lib/types';
import { setContext, getContext } from 'svelte';

export const ENTITIES_METADATA_CTX = 'ENTITIES_METADATA_CTX';

export const setEntitiesMetadataCtx = (data: EntitySchema[]) => {
	setContext(ENTITIES_METADATA_CTX, data);
};

export const getEntitiesMetadataCtx = () => {
	return getContext<EntitySchema[]>(ENTITIES_METADATA_CTX) || null;
};
