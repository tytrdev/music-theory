<script lang="ts">
	import {
		ALL_NOTES,
		getArpeggioNotesFromRoot,
        Arpeggios,
		type Note,
		type ScaleSequence
	} from '$lib/theory';
	import Fretboard from '../../../components/Fretboard.svelte';
	import Settings from '../../../components/Settings.svelte';

	// Selections
	const arpeggios = Object.keys(Arpeggios);

	$: selectedNote = 'A';
	$: selectedArpeggio = 'Major';

	$: note = ALL_NOTES.find((note) => note === selectedNote);
	$: arpeggio = Arpeggios[selectedArpeggio];
	$: arpeggioNotes = getNotes(note, arpeggio);

	function getNotes(note: Note, arpeggio: ScaleSequence) {
        return getArpeggioNotesFromRoot(note, arpeggio);
	}

	// TODO: Make sure same exact root/scale combo can't be chosen
	function chooseRandomAreppegio(): void {
		const noteIndex = Math.floor(Math.random() * ALL_NOTES.length);
		const arpeggioIndex = Math.floor(Math.random() * Object.keys(Arpeggios).length);

		const arpeggioKey = Object.keys(Arpeggios)[arpeggioIndex];

		selectedNote = ALL_NOTES[noteIndex];
		selectedArpeggio = arpeggioKey;
	}
</script>

<h1 class="text-4xl mb-5">Fretboard Visualizer - Arpeggios</h1>

<div class="flex mb-5 flex-col md:flex-row">
	<span class="text-3xl mr-5 self-center">Note</span>

	<select bind:value={selectedNote} class="select select-lg select-primary mr-5">
		{#each ALL_NOTES as note}
			<option>{note}</option>
		{/each}
	</select>

	<span class="text-3xl mr-5 self-center">Scale</span>

	<select bind:value={selectedArpeggio} class="select select-lg select-primary mr-5">
		{#each arpeggios as arpeggio}
			<option>{arpeggio}</option>
		{/each}
	</select>

	<button on:click={chooseRandomAreppegio} class="btn btn-lg btn-primary">Random Arpeggio</button>
</div>

<div class="flex flex-col w-full">
	<Fretboard root={note} notes={arpeggioNotes} />
</div>

<Settings />
