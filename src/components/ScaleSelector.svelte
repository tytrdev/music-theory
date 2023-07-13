<script lang="ts">
	import {
		ALL_NOTES,
		getScaleNotesFromRoot,
		Scales,
		type Note,
		type ScaleSequence
	} from '$lib/theory';

	// Selections
	const scales = Object.keys(Scales);

	$: selectedNote = 'D';
	$: selectedScale = 'Major';

	$: note = ALL_NOTES.find((note) => note === selectedNote);
	$: scale = Scales[selectedScale];
	$: scaleNotes = getScaleNotesFromRoot(note, scale);

	$: console.log('Scale notes done changeded! ', note, scale, scaleNotes);

	$: getScaleNotes = function () {
		return scaleNotes;
	};
</script>

<div class="self-center flex mb-1 flex-col md:flex-row">
	<span class="text-xl mr-5 self-center">Note</span>

	<select bind:value={selectedNote} class="select select-sm select-primary mr-5">
		{#each ALL_NOTES as note}
			<option>{note}</option>
		{/each}
	</select>

	<span class="text-xl mr-5 self-center">Scale</span>

	<select bind:value={selectedScale} class="select select-sm select-primary mr-5">
		{#each scales as scale}
			<option>{scale}</option>
		{/each}
	</select>
</div>
