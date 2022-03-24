import { Sequence } from "./sequence";

// Represent the 7 natural notes
export enum Naturals {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
}

// Represent the 5 accidentals
// Currently using sharps, may change this later
export enum Accidentals {
    As = "A#",
    Cs = "C#", 
    Ds = "D#",
    Fs = "F#",
    Gs = "G#",
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
    Accidentals.Gs,
];

const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];

// Quick utility for modes
function rotateIntervals(intervals: Array<number>, n: number): Array<number> {
    const internal = [...intervals]; // Clone to avoid mutating

    const prefix = internal.slice(0, n).map(i => i + 12);
    const suffix = internal.slice(n);

    const rotated = [...suffix, ...prefix];
    const diff = rotated[0];

    return rotated.map(r => r - diff);
}

export type ScaleSequence = Sequence<number>;

// TODO: Add more scales
export const Scales = {
    Major: new Sequence(MAJOR_INTERVALS),
    Dorian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 1)),
    Phrygian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 2)),
    Lydian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 3)),
    Mixolydian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 4)),
    Aeolian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 5)),
    Minor: new Sequence(rotateIntervals(MAJOR_INTERVALS, 5)),
    Locrian: new Sequence(rotateIntervals(MAJOR_INTERVALS, 6)),
}

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
