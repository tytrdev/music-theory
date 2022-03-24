<script lang="ts">
	import { Sequence } from '$lib/sequence';
	import { ALL_NOTES, getScaleNotesFromRoot, Naturals, Scales, type Note } from '$lib/theory';
    import Fretboard from '../../components/Fretboard.svelte';

	const tuning: Array<Note> = [
        Naturals.E,
        Naturals.A,
        Naturals.D,
        Naturals.G,
        Naturals.B,
        Naturals.E
    ].reverse();

	const sequences = tuning.map((note) => {
		const sequence = new Sequence(ALL_NOTES);
		sequence.moveTo(note);
		return sequence.take(25);
	});

    // Easy way to get 24 elements mapped to indices
    // Better than typing out an array with 0 - 23
	const fretMarkers = Array(25)
		.fill(0)
		.map((_, i) => i);

    // Selections
    const scales = Object.keys(Scales);

    $: selectedNote = 'A';
    $: selectedScale = 'Major';

    $: note = ALL_NOTES.find(note => note === selectedNote);
    $: scale = Scales[selectedScale];
    $: scaleNotes = getScaleNotesFromRoot(note, scale);

    $: isActive = function (note: Note): Boolean {
        return scaleNotes.includes(note);
    }

    $: isRoot = function (note: Note): Boolean {
        return note === selectedNote;
    }
</script>

<h1>Fretboard Tools</h1>

<div class="selections">
    <div class="select-container">
        <span>Note</span>

        <select bind:value={selectedNote}>
            {#each ALL_NOTES as note}
                <option>{note}</option>
            {/each}
        </select>
    </div>

    <div class="select-container">
        <span>Scale</span>

        <select bind:value={selectedScale}>
            {#each scales as scale}
                <option>{scale}</option>
            {/each}
        </select>
    </div>
</div>

<div class="fretboard">
    <Fretboard root={note} notes={scaleNotes} />
</div>

<style>
    .selections {
        font-size: 2em;
    }

    select {
        font-size: 1em;
    }

    .fretboard {
        width: 90%;
    }
</style>
