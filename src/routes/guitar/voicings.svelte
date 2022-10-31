<script lang="ts">
	import { ALL_NOTES, getVoicing, Arpeggios, type Note } from '$lib/theory';
    import Voicing from '../../components/Voicing.svelte';

    // Selections
    const chords = Object.keys(Arpeggios);

    $: selectedNote = 'A';
    $: selectedChord = 'Major';
    $: frets = getVoicing(selectedNote, selectedChord);
</script>

<h3>Voicings</h3>

<div class="selections">
    <div class="select-container">
        <span>Root</span>

        <select bind:value={selectedNote}>
            {#each ALL_NOTES as note}
                <option>{note}</option>
            {/each}
        </select>
    </div>

    <div class="select-container">
        <span>Chord</span>

        <select bind:value={selectedChord}>
            {#each chords as chord}
                <option>{chord}</option>
            {/each}
        </select>
    </div>
</div>

<div class="fretboard">
    <Voicing root={selectedNote} frets={frets} />
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
