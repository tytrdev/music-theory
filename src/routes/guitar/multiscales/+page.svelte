<script lang="ts">
	import {
		ALL_NOTES,
		getArpeggioNotesFromRoot,
		getScaleNotesFromRoot,
		Naturals,
		Scales,
		type Note,
		type ScaleSequence
	} from '$lib/theory';
	import Fretboard from '../../../components/Fretboard.svelte';
	import MiniScaleWrapper from '../../../components/MiniScaleWrapper.svelte';
	import ScaleSelector from '../../../components/ScaleSelector.svelte';
	import Settings from '../../../components/Settings.svelte';

	// Selections
	const scales = Object.keys(Scales);

	$: startingFret = 0;
	$: selectedNote = 'A';
	$: selectedScale = 'Major';

	$: note = ALL_NOTES.find((note) => note === selectedNote);
	$: scale = Scales[selectedScale];
	$: scaleNotes = getNotes(note, scale);

	function getNotes(note: Note, scale: ScaleSequence) {
		return getScaleNotesFromRoot(note, scale);
	}

	// TODO: Make sure same exact root/scale combo can't be chosen
	function chooseRandomScale(): void {
		const noteIndex = Math.floor(Math.random() * ALL_NOTES.length);
		const scaleIndex = Math.floor(Math.random() * Object.keys(Scales).length);

		const scaleKey = Object.keys(Scales)[scaleIndex];

		selectedNote = ALL_NOTES[noteIndex];
		selectedScale = scaleKey;
	}

	$: selector1 = null;
	$: selector2 = null;
	$: selector3 = null;
	$: selector4 = null;
</script>

<div>
	<span class="text-4xl mb-5 mr-5">Multiple Scales | </span>
	<span class="text-3xl mr-5 self-center">Starting Fret</span>
	<input type="number" min="0" max="15" bind:value={startingFret} class="input input-bordered" />
</div>

<span class="divider" />

<div class="flex flex-row w-full flex-wrap">
	<div class="flex flex-col flex-grow w-1/2">
		<MiniScaleWrapper {startingFret} />
	</div>

	<div class="flex flex-col flex-grow w-1/2">
		<MiniScaleWrapper {startingFret} />
	</div>

	<div class="mt-2 flex flex-col flex-grow w-1/2">
		<MiniScaleWrapper {startingFret} />
	</div>

	<div class="mt-2 flex flex-col flex-grow w-1/2">
		<MiniScaleWrapper {startingFret} />
	</div>
</div>

<div class="flex flex-col w-half" />

<!-- <Settings /> -->
