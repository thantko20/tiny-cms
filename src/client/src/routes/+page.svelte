<script lang="ts">
	let isLoading = false;
	let data: {
		name: string;
		table_name: string;
		schema: object;
	}[] = [];

	async function getEntities() {
		isLoading = true;
		try {
			await new Promise((res) => setTimeout(res, 2000));
			data = await fetch('http://localhost:3000/api/entities').then((res) => res.json());
			console.log(data);
		} catch (error) {
			console.error(error);
		} finally {
			isLoading = false;
		}
		return data;
	}
	let promise = getEntities();
</script>

{#await promise}
	<p>loading...</p>
{:then data}
	{#each data as entity}
		<h2>{entity.name}</h2>
		<pre>{JSON.stringify(entity.schema, null, 2)}</pre>
	{/each}
{/await}
