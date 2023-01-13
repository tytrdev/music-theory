<script lang="ts">
	import { Sequence } from '$lib/sequence';
	import { ALL_NOTES, Naturals, type Note } from '$lib/theory';

	export let root: Note;
	export let notes: Array<Note>;

	const sequence = new Sequence(ALL_NOTES);
	sequence.moveTo(Naturals.C);

	const keys = sequence.take(15);

	// These are reactive so that they can be changed by parent components
	$: isActive = function (note: Note): boolean {
		return notes.includes(note);
	};

	$: isRoot = function (note: Note): boolean {
		return note === root;
	};

	$: isNatural = function (note: Note): boolean {
		return Naturals[note];
	};
</script>

<div class="keyboard-wrapper">
<div class="keyboard">
	{#each keys as note}
		<div class="key" class:natural={isNatural(note)} class:accidental={!isNatural(note)}>
			<div class="note" class:active={isActive(note)} class:root={isRoot(note)}>
                {note}
            </div>
		</div>
	{/each}
</div>

</div>

<style>
    .keyboard-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

	.keyboard {
        width: 100%;
        justify-content: center;
	}

	.key {
		display: inline-block;
		position: relative;
		width: 11.111%;
		padding-bottom: 35%;
		box-shadow: inset 0 0 0 1px rgb(0 0 0 / 30%);
		background: ivory;
		vertical-align: bottom;
		cursor: pointer;
		border-radius: 5px;
		transition: 1s;
		color: rgba(255, 255, 255, 0.3);
	}

	.key.accidental {
		position: absolute;
		z-index: 100;
		width: 12.5%;
		background: #111;
		transform-origin: center top;
		transform: translateX(-50%) scale(0.6);
		border-radius: 0 0 8px 8px;
	}

	.note {
        background: none;
        margin-top: auto;
		display: flex;
		width: 100%;
		justify-content: center;
        font-size: 3em;
        font-weight: 600;
        color: black;
        position: absolute;
        bottom: 0;
	}

    .key.accidental .note {
        color: white;
        font-size: 3em;
    }

	.note:not(:last-child) {
		border-right: 1px solid black;
	}

	.active {
        color: rgb(120, 120, 238) !important;
	}

	.root {
        color: rgb(231, 124, 124) !important;
	}
</style>
