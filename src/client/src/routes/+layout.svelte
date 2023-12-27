<script lang="ts">
	import '../app.css';
	import GlobalWrappers from '$lib/components/GlobalWrappers.svelte';
	import type { EntitySchema } from '$lib/types';
	import {
		getEntitiesMetadataCtx,
		setEntitiesMetadataCtx
	} from '$lib/contexts/entitiesMetadata.ctx';
	import { onMount } from 'svelte';
	import { getEntities } from '$lib/entities';

	let data: EntitySchema[] | null = null;
	let isLoadingMetadata = true;

	onMount(async () => {
		try {
			data = await getEntities();
			setEntitiesMetadataCtx(data);
		} catch (error) {
			console.log(error);
		} finally {
			isLoadingMetadata = false;
		}
	});
</script>

<GlobalWrappers>
	{#if isLoadingMetadata}
		<p>loading metadata</p>
	{:else if data}
		<div class="h-screen flex">
			<div class="w-[250px] border-r border-r-gray-800 p-2">
				{#each data as schema}
					<button class="hover:bg-neutral-800 w-full text-left py-1 px-2 rounded-sm"
						>{schema.name}</button
					>
				{/each}
			</div>
			<main>
				<slot />
			</main>
		</div>
	{/if}
</GlobalWrappers>
