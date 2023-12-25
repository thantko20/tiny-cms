<script>
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import { ModeWatcher } from 'mode-watcher';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<ModeWatcher defaultMode="dark" />
	<slot />
</QueryClientProvider>
