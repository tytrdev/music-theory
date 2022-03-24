<script lang="ts">
	import { Sequence } from '$lib/sequence';
	import { ALL_NOTES, Naturals, type Note } from '$lib/theory';

	export let root: Note;
	export let notes: Array<Note>;

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

	// These are reactive so that they can be changed by parent components
    $: isActive = function (note: Note): Boolean {
        return notes.includes(note);
    }

    $: isRoot = function (note: Note): Boolean {
        return note === root;
    }
</script>

<div class="fretboard">
	<div class="string">
		{#each fretMarkers as fretMarker}
			<div class="note fret-marker">{fretMarker}</div>
		{/each}
	</div>

	{#each sequences as sequence}
		<div class="string">
			{#each sequence as note}
				<div class="note" class:active={isActive(note)} class:root={isRoot(note)}>{note}</div>
			{/each}
		</div>
	{/each}

	<div class="string">
		{#each fretMarkers as fretMarker}
			<div class="note fret-marker">{fretMarker}</div>
		{/each}
	</div>
</div>

<style>
	.fretboard {
		display: flex;
		flex-direction: column;
		border: 5px solid black;
		font-size: 1.3em;
		font-weight: 600;
	}

	.string {
		display: flex;
		width: 100%;
		justify-content: space-evenly;
	}

	.string:not(:last-child) {
		border-bottom: 1px solid black;
	}

	.note {
		display: flex;
		flex-grow: 0;
		width: 100%;
		justify-content: center;
	}

	.note:not(:last-child) {
		border-right: 1px solid black;
	}

	.fret-marker {
		background: white;
		color: black;
	}

    .active {
        background: lightblue;
		color: black;
    }

    .root {
        background: rgb(160, 72, 72);
		color: black;
    }
</style>
