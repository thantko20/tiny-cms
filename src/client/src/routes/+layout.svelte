<script>
	import '../app.css';
	import GlobalWrappers from '$lib/components/GlobalWrappers.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { api } from '$lib';

	const getEntitiesMetadata = async () => {
		return api.get('/api/entities');
	};

	const entitiesMetadata = createQuery({
		queryFn: () => api.get('/api/entities')
	});
</script>

<GlobalWrappers>
	<div class="h-screen flex">
		<div class="w-[200px] bg-purple-900"></div>
		<main>
			<slot />
		</main>
	</div>
</GlobalWrappers>
