<script lang="ts">
	import { Sequence } from '$lib/sequence';
	import { ALL_NOTES, Naturals, intervalBetween, type Note } from '$lib/theory';

    export let root;
	export let frets;
    export let showIntervals = false;

	const tuning: Array<Note> = [
        Naturals.E,
        Naturals.A,
        Naturals.D,
        Naturals.G,
        Naturals.B,
        Naturals.E
    ].reverse();

	$: sequences = tuning.map((note) => {
		const sequence = new Sequence(ALL_NOTES);
		sequence.moveTo(note);
		return sequence.take(max - min + 1);
	});

    $: min = Math.min(...frets);
    $: max = Math.max(...frets);

    // Easy way to get 24 elements mapped to indices
    // Better than typing out an array with 0 - 23
	$: fretMarkers = Array(max - min + 1)
		.fill(0)
		.map((_, i) => i + min);

	// These are reactive so that they can be changed by parent components
    $: isActive = function (string: number, fret: number): boolean {
        return frets[string] - min == fret;
    }

    $: isRoot = function (note: Note): boolean {
        return note === root;
    }

    $: getDisplayInterval = function(note) {
      if (showIntervals) {
        return intervalBetween(root, note);
      }

      return note;
    }

    function toggleIntervalNames() {
      showIntervals = !showIntervals;
    }
</script>

<div class="voicing">
	<div class="string">
		{#each fretMarkers as fretMarker}
			<div class="note fret-marker">{fretMarker}</div>
		{/each}
	</div>

	{#each sequences as sequence, string}
		<div class="string">
			{#each sequence as note, fret}
				<div class="note" class:active={isActive(string, fret)} class:root={isActive(string, fret) && isRoot(note)}>
          {getDisplayInterval(note)}
        </div>
			{/each}
		</div>
	{/each}

	<div class="string">
		{#each fretMarkers as fretMarker}
			<div class="note fret-marker">{fretMarker}</div>
		{/each}
	</div>
</div>

<button on:click={toggleIntervalNames}>
  {#if showIntervals}
    Show Note Names
  {:else}
    Show Interval Names
  {/if}
</button>

<div class="legend">
  <h3>Legend</h3>

  <span>
    <div class="legend-note active">
      {root}
    </div>

    <div>
      In scale/arpeggio
    </div>
  </span>

  <span>
    <div class="legend-note root">
      {root}
    </div>

    <div>
      Root note
    </div>
  </span>
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

  button {
    padding: 10px;
    font-size: 1.3em;
    border: none;
    background-color: lightblue;
    color: black;
    transition: 0.2s linear;
  }

  button:hover {
    color: white;
    background-color: black;
    cursor: pointer;
  }

  .legend {
    margin-top: 10px;
  }

  .legend-note {
		display: flex;
    width: 50px;
    font-size: 2em;
    font-weight: 600;
    justify-content: center;
    flex-shrink: 1;
  }

  .legend span {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  .legend span div:not(.legend-note) {
    margin-left: 10px;
  }
</style>
