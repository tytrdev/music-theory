<script lang="ts">
	import { Sequence } from '$lib/sequence';
	import { ALL_NOTES, getArpeggioNotesFromRoot, Naturals, Arpeggios, type Note } from '$lib/theory';
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
    const arpeggios = Object.keys(Arpeggios);

    $: selectedNote = 'A';
    $: selectedArpeggio = 'Major';

    $: note = ALL_NOTES.find(note => note === selectedNote);
    $: arpeggio = Arpeggios[selectedArpeggio];
    $: arpeggioNotes = getArpeggioNotesFromRoot(note, arpeggio);

    $: isActive = function (note: Note): boolean {
        return arpeggioNotes.includes(note);
    }

    $: isRoot = function (note: Note): boolean {
        return note === selectedNote;
    }

    function chooseRandomArpeggio(): void {
        const noteIndex = Math.floor(Math.random() * ALL_NOTES.length);
        const arpeggioIndex = Math.floor(Math.random() * Object.keys(Arpeggios).length);

        const arpeggioKey = Object.keys(Arpeggios)[arpeggioIndex];

        selectedNote = ALL_NOTES[noteIndex];
        selectedArpeggio = arpeggioKey;
    }
</script>

<h3>Arpeggios</h3>

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
        <span>Arpeggio</span>

        <select bind:value={selectedArpeggio}>
            {#each arpeggios as arpeggio}
                <option>{arpeggio}</option>
            {/each}
        </select>
    </div>

    <button on:click={chooseRandomArpeggio}>
        Random Arpeggio
    </button>
</div>

<div class="fretboard">
    <Fretboard root={note} notes={arpeggioNotes} />
</div>

<style>
    .selections {
        display: flex;
        font-size: 2em;
    }

    span {
        margin-left: 10px;
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
        margin-left: 10px;
    }

    button:hover {
        transition: 0.3s linear;
        background: white;
        border: 1px solid #559E55;
        color: #559E55;
    }
</style>
