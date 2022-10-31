import { Sequence } from './sequence';

// Represent the 7 natural notes
export enum Naturals {
	A = 'A',
	B = 'B',
	C = 'C',
	D = 'D',
	E = 'E',
	F = 'F',
	G = 'G'
}

// Represent the 5 accidentals
// Currently using sharps, may change this later
export enum Accidentals {
	As = 'A#',
	Cs = 'C#',
	Ds = 'D#',
	Fs = 'F#',
	Gs = 'G#'
}

// A note is either a Natural or an Accidental
// This is a union type (and if it's not I should change this)
export type Note = Naturals | Accidentals;

// Ordered list of notes starting at A
// Will be used for sequences later
export const ALL_NOTES: Array<Note> = [
	Naturals.A,
	Accidentals.As,
	Naturals.B,
	Naturals.C,
	Accidentals.Cs,
	Naturals.D,
	Accidentals.Ds,
	Naturals.E,
	Naturals.F,
	Accidentals.Fs,
	Naturals.G,
	Accidentals.Gs
];

const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const MELODIC_MINOR_INTERVALS = [0, 2, 3, 5, 7, 9, 11];
const HARMONIC_MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 11];

// Quick utility for modes
function rotateIntervals(intervals: Array<number>, n: number): Array<number> {
	const internal = [...intervals]; // Clone to avoid mutating

	const prefix = internal.slice(0, n).map((i) => i + 12);
	const suffix = internal.slice(n);

	const rotated = [...suffix, ...prefix];
	const diff = rotated[0];

	return rotated.map((r) => r - diff);
}

export type ScaleSequence = Sequence<number>;
export type ArpeggioSequence = Sequence<number>;

// TODO: Add more scales
export const Scales = {
	// Major scale modes
	Major: new Sequence(MAJOR_INTERVALS),
	Dorian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 1)),
	Phrygian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 2)),
	Lydian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 3)),
	Mixolydian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 4)),
	Aeolian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 5)),
	Minor: new Sequence(rotateIntervals(MAJOR_INTERVALS, 5)),
	Locrian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 6)),
	// Melodic Minor Modes
	MelodicMinor: new Sequence(MELODIC_MINOR_INTERVALS),
	Dorianb9: new Sequence(rotateIntervals(MELODIC_MINOR_INTERVALS, 1)),
	LydianAugmented: new Sequence(rotateIntervals(MELODIC_MINOR_INTERVALS, 2)),
	LydianDominant: new Sequence(rotateIntervals(MELODIC_MINOR_INTERVALS, 3)),
	Mixolydianb13: new Sequence(rotateIntervals(MELODIC_MINOR_INTERVALS, 4)),
	LocrianSharp2: new Sequence(rotateIntervals(MELODIC_MINOR_INTERVALS, 5)),
	SuperLocrian: new Sequence(rotateIntervals(MELODIC_MINOR_INTERVALS, 6)),
	Altered: new Sequence(rotateIntervals(MELODIC_MINOR_INTERVALS, 6)),
	// Harmonic Minor Modes
	HarmonicMinor: new Sequence(HARMONIC_MINOR_INTERVALS),
	LocrianNatural6: new Sequence(HARMONIC_MINOR_INTERVALS),
	IonianSharp5: new Sequence(HARMONIC_MINOR_INTERVALS),
	DorianSharp11: new Sequence(HARMONIC_MINOR_INTERVALS),
	PhrygianDominant: new Sequence(HARMONIC_MINOR_INTERVALS),
	LydianSharp2: new Sequence(HARMONIC_MINOR_INTERVALS),
	SuperLocrianDoubleFlat7: new Sequence(HARMONIC_MINOR_INTERVALS)
};

export const Arpeggios = {
	Major: new Sequence([0, 4, 7]),
	Minor: new Sequence([0, 3, 7]),
	Diminished: new Sequence([0, 3, 6]),
	Major7: new Sequence([0, 4, 7, 11]),
	Minor7: new Sequence([0, 3, 7, 10]),
	Dominant: new Sequence([0, 4, 7, 10]),
	Minor7b5: new Sequence([0, 3, 6, 10]),
	Minor6: new Sequence([0, 3, 7, 9]),
	MinorMaj7: new Sequence([0, 3, 7, 11]),
	Fifth: new Sequence([0, 7]),
	Thirteen: new Sequence([0, 4, 7, 9, 10]),
	Eleven: new Sequence([0, 4, 5, 7, 10]),
	Nine: new Sequence([0, 2, 4, 7, 10])
};

// This is way overly complicated...
export function getScaleNotesFromRoot(root: Note, scale: ScaleSequence) {
	const noteSequence = new Sequence(ALL_NOTES);
	noteSequence.moveTo(root);

	const intervals = scale.take(scale.getCount());
	let last = intervals[0];

	const scaleNotes = [];

	for (const interval of intervals) {
		const diff = interval - last;
		noteSequence.moveForward(diff);

		scaleNotes.push(noteSequence.current());
		last = interval;
	}

	return scaleNotes;
}

// This is way overly complicated...
export function getArpeggioNotesFromRoot(root: Note, arpeggio: ArpeggioSequence) {
	const noteSequence = new Sequence(ALL_NOTES);
	noteSequence.moveTo(root);

	const intervals = arpeggio.take(arpeggio.getCount());
	let last = intervals[0];

	const arpeggioNotes = [];

	for (const interval of intervals) {
		const diff = interval - last;
		noteSequence.moveForward(diff);

		arpeggioNotes.push(noteSequence.current());
		last = interval;
	}

	return arpeggioNotes;
}

// TODO: Move this to display logic
const INTERVAL_NAMES = ['R', 'b2', '2', 'b3', '3', '4', '#4', '5', 'b6', '6', 'b7', '7', 'R'];

export function intervalBetween(startNote: Note, endNote: Note) {
	const i = ALL_NOTES.indexOf(startNote);
	const j = ALL_NOTES.indexOf(endNote);

	console.log('Interval Between: ', i, j);

	if (i < j) return INTERVAL_NAMES[j - i];
	return INTERVAL_NAMES[j + 12 - i];
}

type VoicingData = {
	name: string;
	frets: number[];
};

const Voicings = {
	Major: [
		{
			name: 'Barre Chord',
			frets: [0, 0, 1, 2, 2, 0]
		}
	]
};

export function getVoicing(root: Note, chord: string): number[] {
	const voicing = Voicings[chord];

	if (voicing && voicing.length > 0 && voicing[0].frets && voicing[0].frets.length > 0) {
		return voicing[0].frets;
	}

	return [];
}
