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
	import Fretboard from '../../components/Fretboard.svelte';
	import Settings from '../../components/Settings.svelte';

	// Selections
	const scales = Object.keys(Scales);

	enum VisualizationType {
		Scales,
		Arpeggios
	}

	let visualizationType = VisualizationType.Scales;

	$: selectedNote = 'A';
	$: selectedScale = 'Major';

	$: note = ALL_NOTES.find((note) => note === selectedNote);
	$: scale = Scales[selectedScale];
	$: scaleNotes = getNotes(note, scale);

	function getNotes(note: Note, scale: ScaleSequence) {
		if (visualizationType === VisualizationType.Scales) {
			return getScaleNotesFromRoot(note, scale);
		}

		// Arpeggios
		return getArpeggioNotesFromRoot(note, scale);
	}

	// TODO: Make sure same exact root/scale combo can't be chosen
	function chooseRandomScale(): void {
		const noteIndex = Math.floor(Math.random() * ALL_NOTES.length);
		const scaleIndex = Math.floor(Math.random() * Object.keys(Scales).length);

		const scaleKey = Object.keys(Scales)[scaleIndex];

		selectedNote = ALL_NOTES[noteIndex];
		selectedScale = scaleKey;
	}

	function setScales() {
		visualizationType = VisualizationType.Scales;
	}

	function setArpeggios() {
		visualizationType = VisualizationType.Arpeggios;
	}
</script>

<h1 class="text-4xl mb-5">Fretboard Visualizer</h1>

<div class="btn-group mb-5">
	<button
		class="btn btn-lg"
		class:btn-active={visualizationType === VisualizationType.Scales}
		on:click={setScales}
	>
		Scales
	</button>
	<button
		class="btn btn-lg"
		class:btn-active={visualizationType === VisualizationType.Arpeggios}
		on:click={setArpeggios}
	>
		Arpeggios
	</button>
</div>

<div class="flex mb-5 flex-col md:flex-row">
	<span class="text-3xl mr-5 self-center">Note</span>

	<select bind:value={selectedNote} class="select select-lg select-primary mr-5">
		{#each ALL_NOTES as note}
			<option>{note}</option>
		{/each}
	</select>

	<span class="text-3xl mr-5 self-center">Scale</span>

	<select bind:value={selectedScale} class="select select-lg select-primary mr-5">
		{#each scales as scale}
			<option>{scale}</option>
		{/each}
	</select>

	<button on:click={chooseRandomScale} class="btn btn-lg btn-primary">Random Scale</button>
</div>

<div class="flex flex-col w-full">
	<Fretboard root={note} notes={scaleNotes} />
</div>

<Settings />
