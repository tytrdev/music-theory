<script lang="ts">
	import { Sequence } from '$lib/sequence';
	import {
		ALL_NOTES,
		INTERVAL_DISPLAY_NAMES,
		INTERVAL_NAMES,
		IntervalValues,
		Intervals,
		Naturals,
		Scales,
		getScaleNotesFromRoot
	} from '$lib/theory';
	import Fretboard from '../../../components/Fretboard.svelte';

	// TODO: Add holdsworth scale generator
	// 1. For scales with 5 - 9 notes
	// 2. Generate all permutations of the possible scales with that many notes
	// 3. Disregard any with 4 or more consecutive half steps
	// 4. Enumerate them for display
	// 5. Display them in a fretboard diagram

	function fact(x: number) {
		if (x <= 0) {
			return 1;
		}

		return x * fact(x - 1);
	}

	let numNotes = 5;
	let root = Naturals.C;
	let maxCsh = 3;
	let maxScales = 10;
	const TOTAL = fact(12) / (fact(8) * fact(4));

	// n is the number of notes in the scale
	$: generateScales = function (n: number) {
		const intervals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
		const scales: Intervals[][] = [];

		// csh = consecutive half steps
		function generateCombinations(scale: Intervals[], start: number, csh: number) {
			if (scales.length >= maxScales) return;
			if (csh >= maxCsh) return;

			if (scale.length === n) {
				scales.push(scale);
				return;
			}

			for (let i = start; i < intervals.length; i++) {
				const previousInterval = scale.length > 0 ? scale[scale.length - 1] : Infinity;
				const interval = intervals[i] as Intervals;
				const difference = interval - previousInterval;
				const isHalfStep = difference === 1;

				// TODO: Debug numeric interval numbers

				if (isHalfStep) {
					generateCombinations(scale.concat(interval), i + 1, csh + 1);
				} else {
					generateCombinations(scale.concat(interval), i + 1, 0);
				}
			}
		}

		generateCombinations([], 0, 0);
		return scales;
	};

	$: scales = generateScales(numNotes);
	console.log('Generated Scales: ', scales);
</script>

<h1>Holdsworth Scale Generator</h1>
<p>Based on Allan Holdsworth's Approach to Scales</p>

<div class="flex flex-col center items-center align-center justify-center text-center">
	<p>Total number of possible scales {TOTAL}</p>

	<p>N = Number of scales to generate</p>

	<p>M = Maximum number of consecutive half steps</p>

	<p>X = Number of notes per scale</p>
</div>

<div class="flex mb-5 flex-col md:flex-row">
	<span class="text-3xl mr-5 self-center">Root</span>

	<select bind:value={root} class="select select-lg select-primary mr-5">
		{#each ALL_NOTES as note}
			<option>{note}</option>
		{/each}
	</select>

	<span class="text-3xl mr-5 self-center">N</span>

	<input
		type="number"
		min="1"
		max="100"
		bind:value={maxScales}
		class="input input-lg input-bordered mr-5"
	/>

	<span class="text-3xl mr-5 self-center">M</span>

	<input
		type="number"
		min="1"
		max="100"
		bind:value={maxCsh}
		class="input input-lg input-bordered mr-5"
	/>

	<span class="text-3xl mr-5 self-center">X</span>

	<input
		type="number"
		min="1"
		max="100"
		bind:value={numNotes}
		class="input input-lg input-bordered"
	/>
</div>

{#each scales as scale}
	<div class="flex">
		{#each scale as interval}
			<span class="mr-5">
				{INTERVAL_NAMES[interval]}
			</span>
		{/each}
	</div>

	<div class="flex flex-col w-full justify-center">
		<Fretboard {root} notes={getScaleNotesFromRoot(root, new Sequence(scale))} />
	</div>
{/each}
