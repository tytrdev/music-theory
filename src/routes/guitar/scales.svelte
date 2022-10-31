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

    function chooseRandomScale(): void {
        const noteIndex = Math.floor(Math.random() * ALL_NOTES.length);
        const scaleIndex = Math.floor(Math.random() * Object.keys(Scales).length);

        const scaleKey = Object.keys(Scales)[scaleIndex];

        selectedNote = ALL_NOTES[noteIndex];
        selectedScale = scaleKey;
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

    <div>
        <button on:click={chooseRandomScale}>
            Random Scale
        </button>
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

    button {
        border: 1px solid white;
        padding: 10px;
        font-size: 1em;
        cursor: pointer;
    }


 button:hover {
     transition: 0.3s linear;
     background: white;
     border: 1px solid #559E55;
     color: #559E55;
 }
</style>
