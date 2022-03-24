<script lang="ts">
	import { ALL_NOTES, getScaleNotesFromRoot, Naturals, Scales, type Note } from '$lib/theory';
    import Fretboard from '../../components/Fretboard.svelte';

    // Selections
    const scales = Object.keys(Scales);

    $: selectedNote = 'A';
    $: selectedScale = 'Major';

    $: note = ALL_NOTES.find(note => note === selectedNote);
    $: scale = Scales[selectedScale];
    $: scaleNotes = getScaleNotesFromRoot(note, scale);
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
        display: flex;
        font-size: 2em;
    }

    .selections select {
        margin-right: 10px;
    }

    select {
        font-size: 1em;
    }

    .fretboard {
        width: 90%;
    }
</style>
