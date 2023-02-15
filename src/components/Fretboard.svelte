<script lang="ts">
	import { Sequence } from '$lib/sequence';
	import { ALL_NOTES, intervalBetween, type Note } from '$lib/theory';
	import { ALL_TUNINGS } from '$lib/tunings';

	import { tuning } from '../stores';

	export let root: Note;
	export let notes: Array<Note>;
	export let showIntervals = false;

	const minWidthForFullFretboard = 1000;
	let windowWidth = Infinity;

	$: microView = windowWidth < minWidthForFullFretboard;

	// Includes 0th fret
	$: NUM_FRETS = microView ? 8 : 23;

	$: tuningNotes = ALL_TUNINGS[$tuning];

	$: sequences = tuningNotes.reverse().map((note, i) => {
		const sequence = new Sequence(ALL_NOTES);
		sequence.moveTo(note);

		if (microView) {
			return sequence.take(NUM_FRETS);
		}

		return [`${i + 1}`, ...sequence.take(NUM_FRETS)];
	});

	// Easy way to get 24 elements mapped to indices
	// Better than typing out an array with 0 - 23
	$: fretMarkers = microView
		? Array(NUM_FRETS)
				.fill(0)
				.map((_, i) => i)
		: [
				' ',
				...Array(NUM_FRETS)
					.fill(0)
					.map((_, i) => i)
		  ];

	// These are reactive so that they can be changed by parent components
	$: isActive = function (note: Note): boolean {
		return notes.includes(note);
	};

	$: isRoot = function (note: Note): boolean {
		return note === root;
	};

	$: getDisplayInterval = function (note) {
		if (showIntervals) {
			return intervalBetween(root, note);
		}

		if (note.length === 1) {
			return note;
		}

		return note[0];
	};

	function toggleIntervalNames() {
		showIntervals = !showIntervals;
	}
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="flex flex-col w-11/12 p-3 self-center border rounded border-primary">
	<div class="flex w-full center justify-evenly">
		{#each fretMarkers as fretMarker}
			<div class="grow h-12 dark:text-secondary text-2xl font-bold text-center basis-0">
				{fretMarker}
			</div>
		{/each}
	</div>

	{#each sequences as sequence}
		<div class="flex w-full justify-evenly">
			{#each sequence as note, i}
				<div
					class="grow h-8 text-2xl font-bold text-center basis-0 relative mask mask-circle m-1"
					class:active={isActive(note)}
					class:root={isRoot(note)}
					class:open={i === 0}
				>
					{getDisplayInterval(note)}

					{#if note.length > 1}
						<span class="text-sm absolute top-0"> ♯ </span>
					{/if}
				</div>
			{/each}
		</div>
	{/each}

	<div class="flex w-full mt-5 justify-evenly">
		{#each fretMarkers as fretMarker}
			<div class="grow h-12 dark:text-secondary text-2xl font-bold text-center basis-0">
				{fretMarker}
			</div>
		{/each}
	</div>
</div>

<button class="btn btn-lg btn-primary self-center max-w-fit mt-5" on:click={toggleIntervalNames}>
	{#if showIntervals}
		Show Note Names
	{:else}
		Show Interval Names
	{/if}
</button>

<div class="self-center mt-5">
	<h3 class="text-4xl self-center">Legend</h3>

	<div class="mt-6">
		<span class="active p-5">
			{root}
		</span>

		<span> In scale/arpeggio </span>
	</div>

	<div class="mt-10">
		<span class="root p-5">
			{root}
		</span>

		<span> Root note </span>
	</div>

	<div class="mt-10">
		<span class="open p-5">
			{root}
		</span>

		<span> Open String </span>
	</div>

	<div class="mt-10">
		<span class="border border-primary p-5">
			{root}
		</span>

		<span>Not in scale/arpeggio</span>
	</div>
</div>

<style lang="postcss">
	.root {
		background: theme(colors.primary) !important;
	}

	.active {
		background: theme(colors.secondary);
	}

	.open {
		background: theme(colors.accent);
	}
</style>
