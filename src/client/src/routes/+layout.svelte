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
	import { Button } from '$lib/components/ui/button';
	import Sidebar from '$lib/components/Sidebar.svelte';

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
			<Sidebar schemas={data} />
			<main>
				<slot />
			</main>
		</div>
	{/if}
</GlobalWrappers>
