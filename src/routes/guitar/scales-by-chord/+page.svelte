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
	import Arpeggios from '../arpeggios.svelte';

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
</script>

<h1 class="text-4xl mb-5">Fretboard Visualizer - Scales by Chord</h1>

<p>A listing of same-root scales that could theoretically be used over a chord.</p>

<div class="flex mb-5 flex-col md:flex-row">
	<span class="text-3xl mr-5 self-center">Note</span>

	<select bind:value={selectedNote} class="select select-lg select-primary mr-5">
		{#each ALL_NOTES as note}
			<option>{note}</option>
		{/each}
	</select>

	<span class="text-3xl mr-5 self-center">Arpeggio</span>

	<select bind:value={selectedArpeggio} class="select select-lg select-primary mr-5">
		{#each arpeggios as arpeggio}
			<option>{arpeggio}</option>
		{/each}
	</select>
</div>

<div class="flex flex-col w-full">
	<!-- <Fretboard root={note} notes={scaleNotes} /> -->
</div>
