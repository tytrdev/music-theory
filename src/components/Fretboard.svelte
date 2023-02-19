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

	$: hideStringNumbers = microView || false;

	// Includes 0th fret
	$: NUM_FRETS = microView ? 8 : 23;

	$: tuningNotes = ALL_TUNINGS[$tuning];

	$: sequences = tuningNotes.slice().reverse().map((note, i) => {
		const sequence = new Sequence(ALL_NOTES);
		sequence.moveTo(note);

		if (hideStringNumbers) {
			return sequence.take(NUM_FRETS);
		}

		return [`${i + 1}`, ...sequence.take(NUM_FRETS)];
	});

	// Easy way to get 24 elements mapped to indices
	// Better than typing out an array with 0 - 23
	$: fretMarkers = hideStringNumbers
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

	function fretMarkerHasDot(marker) {
		return marker === 3 || marker === 5 || marker === 7 || marker === 9 || marker === 15 || marker == 17 || marker == 19 || marker == 21;
	}

	function fretMarkerHasDoubleDot(marker) {
		return marker > 1 && marker % 12 === 0;
	}

</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="flex flex-col w-11/12 p-3 self-center border rounded border-primary divide-y-2 divide-dashed divide-slate-700">
	<div class="flex w-full center justify-evenly">
		{#each fretMarkers as fretMarker}
			<div class="grow h-9 dark:text-secondary text-2xl font-bold text-center basis-0 border-2 border-transparent"
				class:fretmarker-dot={fretMarkerHasDot(fretMarker)}
				class:fretmarker-double-dot={fretMarkerHasDoubleDot(fretMarker)}>
				{fretMarker}
			</div>
		{/each}
	</div>

	{#each sequences as sequence}
		<div class="flex w-full justify-evenly divide-slate-800">
			{#each sequence as note, i}
				<div
					class="grow h-8 text-2xl font-bold text-center basis-0 relative mask m-1"
					class:active={isActive(note)}
					class:root={isRoot(note)}
					class:open={hideStringNumbers ? i === 0 : i === 1}
					class:mask-circle={hideStringNumbers ? i !== 0 : i !== 1}
					class:dark:text-secondary={!hideStringNumbers && i == 0}
				>
					{getDisplayInterval(note)}

					{#if note.length > 1}
						<span class="text-sm absolute top-0"> ♯ </span>
					{/if}
				</div>
			{/each}
		</div>
	{/each}

	<div class="flex w-full justify-evenly">
		{#each fretMarkers as fretMarker}
			<div class="grow h-8 mt-1 dark:text-secondary text-2xl font-bold text-center basis-0 border-2 border-transparent"
				class:fretmarker-dot-bottom={fretMarkerHasDot(fretMarker)}
				class:fretmarker-double-dot-bottom={fretMarkerHasDoubleDot(fretMarker)}>
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

	.fretmarker-dot {
		border-bottom-color:theme(colors.accent);
		border-style: none none solid none;
		/* border-top-color:theme(colors.accent); */
	}

	.fretmarker-double-dot {
		border-bottom-color:theme(colors.accent);
		/* border-top-color:theme(colors.accent); */
		border-style: none none double none;
		border-width:4px;
	}


	.fretmarker-dot-bottom {
		border-top-color:theme(colors.accent);
		border-style:solid none none none;
		/* border-top-color:theme(colors.accent); */
	}

	.fretmarker-double-dot-bottom {
		border-top-color:theme(colors.accent);
		/* border-top-color:theme(colors.accent); */
		border-style:double none none none;
		border-width:4px;
	}
</style>
