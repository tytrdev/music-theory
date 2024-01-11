<script lang="ts">
	import {
		ALL_NOTES,
		getScaleNotesFromRoot,
		Scales,
		type Note,
		type ScaleSequence
	} from '$lib/theory';
	import Fretboard from '../../../components/Fretboard.svelte';

	// Selections
	const archetypeOptions = ['Major', 'Minor', 'Dominant'];
	const Archetypes = {
		Major: [
			{
				label: 'Major/Ionian, (Maj7)',
				scale: Scales.Major
			},
			{
				label: 'Lydian, (Maj7#11)',
				scale: Scales.Lydian
			},
			{
				label: 'Lydian Augmented (Maj7#5)',
				scale: Scales.LydianAugmented
			},
			{
				label: 'Diminished Whole Half (Diminished Maj7)',
				scale: Scales.DiminishedWholeHalf
			},
			{
				label: 'Lydian Sharp 9 (Maj7#9)',
				scale: Scales.LydianSharp2
			}
		],
		Minor: [
			{
				label: 'Dorian (m7/m6)',
				scale: Scales.Dorian
			},
			{
				label: 'Aoelian/Minor (m7/m7b6)',
				scale: Scales.Aeolian
			},
			{
				label: 'Phrygian (Sus4b9, m11b9)',
				scale: Scales.Phrygian
			},
			{
				label: 'Locrian (m7b5)',
				scale: Scales.Locrian
			},
			{
				label: 'Locrian Natural 2',
				scale: Scales.LocrianSharp2
			},
			{
				label: 'Melodic Minor (minMaj7)',
				scale: Scales.MelodicMinor
			},
			{
				label: 'Harmonic Minor (minMaj7)',
				scale: Scales.HarmonicMinor
			}
		],
		Dominant: [
			{
				label: 'Mixolydian (7, 7/9, 7/13, 7Sus4)',
				scale: Scales.Mixolydian
			},
			{
				label: 'Lydian b7 (Dom7#11)',
				scale: Scales.LydianDominant
			},
			{
				label: 'Altered Dominant (7b5/#5/b9/#9)',
				scale: Scales.Altered
			},
			{
				label: 'Half Whole Diminished (Dom13b9)',
				scale: Scales.DiminishedHalfWhole
			}
		]
	};

	$: selectedRoot = 'E';
	$: selectedArchetype = 'Major';

	$: note = ALL_NOTES.find((note) => note === selectedRoot);
	$: archetypeScales = Archetypes[selectedArchetype];
	$: scaleNotes = archetypeScales.map((s) => ({ label: s.label, notes: getNotes(note, s.scale) }));

	function getNotes(note: Note, scale: ScaleSequence) {
		return getScaleNotesFromRoot(note, scale);
	}
</script>

<h1>Chord Palette Scales</h1>

<div class="flex mb-5 flex-col md:flex-row">
	<span class="text-3xl mr-5 self-center">Root</span>

	<select bind:value={selectedRoot} class="select select-lg select-primary mr-5">
		{#each ALL_NOTES as note}
			<option>{note}</option>
		{/each}
	</select>

	<span class="text-3xl mr-5 self-center">Palette Archetype</span>

	<select bind:value={selectedArchetype} class="select select-lg select-primary mr-5">
		{#each archetypeOptions as archetype}
			<option>{archetype}</option>
		{/each}
	</select>
</div>

<div class="flex w-full flex-wrap">
	{#each scaleNotes as { label, notes }}
		<div class="flex flex-col w-1/2 mb-5">
			<div>
				<h1 class="text-xl text-center">
					{label}
				</h1>
			</div>
			<Fretboard root={note} {notes} />
		</div>
	{/each}
</div>
