<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	const query = createQuery({
		queryKey: ['entities'],
		queryFn: getEntities
	});

	async function getEntities() {
		await new Promise((res) => setTimeout(res, 2000));
		return fetch('http://localhost:3000/api/entities').then((res) => res.json());
	}
</script>

{#if $query.isLoading}
	<p>loading...</p>
{:else if $query.data}
	{#each $query.data as entity}
		<h2>{entity.name}</h2>
		<pre>{JSON.stringify(entity.schema, null, 2)}</pre>
	{/each}
{/if}
