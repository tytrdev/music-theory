<script lang="ts">
	import { Sequence } from '$lib/sequence';
	import { ALL_NOTES, intervalBetween, type Note, type ScaleType } from '$lib/theory';
	import { ALL_TUNINGS } from '$lib/tunings';

	import { tuning } from '../stores';

	export let root: Note;
	export let root_relative: Note;
	export let scale_type: ScaleType;
	export let notes: Array<Note>;
	export let showIntervals = false;

	// Includes 0th fret
	const NUM_FRETS = 23;

	$: tuningNotes = ALL_TUNINGS[$tuning];

	$: sequences = tuningNotes.reverse().map((note, i) => {
		const sequence = new Sequence(ALL_NOTES);
		sequence.moveTo(note);
		return [`${i + 1}`, ...sequence.take(NUM_FRETS)];
	});

	// Easy way to get 24 elements mapped to indices
	// Better than typing out an array with 0 - 23
	const fretMarkers = [
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

	$: isRelative = function (note: Note): boolean {
		// todo:  figure out if a scale is major or minor and flip this accordingly
		return note === root_relative;
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
			{#each sequence as note}
				<div
					class="grow h-9 text-2xl font-bold text-center basis-0 relative p-1"
					class:active-note={isActive(note)}
					class:root-note={isRoot(note)}
					class:relative-note={isRelative(note)}
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
		<span class="active-example p-5">
			{root}
		</span>

		<span> In scale/arpeggio </span>
	</div>

	<div class="mt-10">
		<span class="root-example p-5">
			{root}
		</span>

		<span> Root note </span>
	</div>

	{#if root_relative}
		<div class="mt-10">
			<span class="active-example relative-example p-4">
				{root}
			</span>

			<span> Relative {scale_type} </span>
		</div>
	{/if}

	<div class="mt-10">
		<span class="p-5">
			{root}
		</span>

		<span>Not in scale/arpeggio</span>
	</div>
</div>

<style lang="postcss">
	.root-example {
		background: theme(colors.primary) !important;
	}

	.active-example {
		background: theme(colors.secondary);
	}

	.relative-example {
		border-color: theme(colors.primary);
		border-width: .25rem;
	}

	.root-note {
		background: theme(colors.primary) !important;
		padding:0.25rem;
	}

	.active-note {
		background: theme(colors.secondary);
		padding:0.25rem;
	}

	.relative-note {
		border-color: theme(colors.primary);
		border-width: .25rem;
		padding:0rem;
	}
</style>
