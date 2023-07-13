<script>
	import { Sequence } from '$lib/sequence';
	import { Naturals, Scales, getScaleNotesFromRoot } from '$lib/theory';
	import Fretboard from '../../../components/Fretboard.svelte';

	const root = Naturals.A;
	const scale = Scales.Major;
	const notes = getScaleNotesFromRoot(root, scale);

	console.log('C major notes: ', notes);

	const chords = [];

	const noteSequence = new Sequence(notes);

	for (const note of notes) {
		// Start with root
		const chord = [note];

		console.log('Building chord for: ', note);

		noteSequence.moveTo(note);

		// Take every other note
		noteSequence.moveForward(2);
		chord.push(noteSequence.current());
		noteSequence.moveForward(2);
		chord.push(noteSequence.current());
		noteSequence.moveForward(2);
		chord.push(noteSequence.current());

		console.log('Built chord: ', chord);

		chords.push(chord);
	}

	console.log('Chords: ', chords);

	const fretboardFunctions = chords.map((chord) => {
		return function (string, fret, note) {
			const index = chord.indexOf(note);

			if (index === -1) return false;

			if (index === 0) {
				console.log('Chord index 0, string: ', string);
				return string === 5;
			}

			if (index === 1) {
				console.log('Chord index 1, string: ', string);
				return string === 2;
			}

			if (index === 2) {
				return false;
				console.log('Chord index 2, string: ', string);
				return string === 3;
			}

			if (index === 3) {
				console.log('Chord index 3, string: ', string);
				return string === 3;
			}

			return false;
		};
	});
</script>

<h1>Shell Voicings</h1>

<div class="flex flex-row flex-wrap w-full">
	<div class="flex flex-col flex-grow w-1/2 mb-5">
		{#each fretboardFunctions as f, i}
			<Fretboard
				forceMicroView
				root={chords[i][0]}
				notes={chords[i]}
				activeFunction={f}
				startingFret={i + 4}
			/>
		{/each}
	</div>
</div>
