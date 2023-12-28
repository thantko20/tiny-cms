<script lang="ts">
	import type { EntitySchema } from '$lib/types';
	import { Button } from './ui/button';
	import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

	export let schemas: EntitySchema[];

	let isDialogOpen = false;
</script>

<div class="w-[250px] border-r border-r-gray-800 p-2 flex flex-col gap-2">
	{#each schemas as schema}
		<button class="hover:bg-neutral-800 w-full text-left py-1 px-2 rounded-sm">{schema.name}</button
		>
	{/each}
	<Dialog bind:open={isDialogOpen}>
		<DialogTrigger asChild>
			<Button variant="outline" class="w-full" on:click={() => (isDialogOpen = true)}
				>Add New</Button
			>
		</DialogTrigger>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Add a new entity</DialogTitle>
			</DialogHeader>
			<div>hello</div>
		</DialogContent>
	</Dialog>
</div>
