import { w as writable } from "./index.js";
class Sequence {
  // TODO: Consider cloning array for safety
  constructor(elements) {
    this.elements = elements;
    this.index = 0;
  }
  take(n) {
    if (n < 0)
      return [];
    const nArray = [];
    for (let i = 0; i < n; i++) {
      nArray.push(this.consume());
    }
    return nArray;
  }
  current() {
    return this.elements[this.index];
  }
  consume() {
    const element = this.elements[this.index++];
    if (this.index >= this.elements.length) {
      this.index = 0;
    }
    return element;
  }
  // Weirdly defaults to moving to 0 if element not found
  moveTo(e) {
    const index = this.elements.indexOf(e);
    this.index = index === -1 ? 0 : index;
    return this;
  }
  moveToIndex(i) {
    this.index = i;
    return this;
  }
  moveForward(n) {
    for (let i = 0; i < n; i++) {
      this.consume();
    }
  }
  getCount() {
    return this.elements.length;
  }
}
var Naturals = /* @__PURE__ */ ((Naturals2) => {
  Naturals2["A"] = "A";
  Naturals2["B"] = "B";
  Naturals2["C"] = "C";
  Naturals2["D"] = "D";
  Naturals2["E"] = "E";
  Naturals2["F"] = "F";
  Naturals2["G"] = "G";
  return Naturals2;
})(Naturals || {});
var Accidentals = /* @__PURE__ */ ((Accidentals2) => {
  Accidentals2["As"] = "A#";
  Accidentals2["Cs"] = "C#";
  Accidentals2["Ds"] = "D#";
  Accidentals2["Fs"] = "F#";
  Accidentals2["Gs"] = "G#";
  return Accidentals2;
})(Accidentals || {});
const ALL_NOTES = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#"
  /* Gs */
];
const MINOR_PENTATONIC_INTERVALS = [0, 3, 5, 7, 10];
const MAJOR_PENTATONIC_INTERVALS = [0, 2, 4, 7, 9];
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
const MELODIC_MINOR_INTERVALS = [0, 2, 3, 5, 7, 9, 11];
const HARMONIC_MAJOR_INTERVALS = [0, 2, 4, 5, 7, 8, 11];
const HARMONIC_MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 11];
function rotateIntervals(intervals, n) {
  const internal = [...intervals];
  const prefix = internal.slice(0, n).map((i) => i + 12);
  const suffix = internal.slice(n);
  const rotated = [...suffix, ...prefix];
  const diff = rotated[0];
  return rotated.map((r) => r - diff);
}
const Scales = {
  // Pentatonic Scales
  MinorPentatonic: new Sequence(MINOR_PENTATONIC_INTERVALS),
  MajorPentatonic: new Sequence(MAJOR_PENTATONIC_INTERVALS),
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
  // Harmonic Major Modes
  HarmonicMajor: new Sequence(HARMONIC_MAJOR_INTERVALS),
  DorianFlat5: new Sequence(rotateIntervals(HARMONIC_MAJOR_INTERVALS, 1)),
  PhrygianFlat4: new Sequence(rotateIntervals(HARMONIC_MAJOR_INTERVALS, 2)),
  LydianFlat3: new Sequence(rotateIntervals(HARMONIC_MAJOR_INTERVALS, 3)),
  MixolydianFlat2: new Sequence(rotateIntervals(HARMONIC_MAJOR_INTERVALS, 4)),
  LydianAugmentedSharp2: new Sequence(rotateIntervals(HARMONIC_MAJOR_INTERVALS, 5)),
  LocrianDoubleFlat7: new Sequence(rotateIntervals(HARMONIC_MAJOR_INTERVALS, 6)),
  // Harmonic Minor Modes
  HarmonicMinor: new Sequence(HARMONIC_MINOR_INTERVALS),
  LocrianNatural6: new Sequence(rotateIntervals(HARMONIC_MINOR_INTERVALS, 1)),
  IonianSharp5: new Sequence(rotateIntervals(HARMONIC_MINOR_INTERVALS, 2)),
  DorianSharp11: new Sequence(rotateIntervals(HARMONIC_MINOR_INTERVALS, 3)),
  PhrygianDominant: new Sequence(rotateIntervals(HARMONIC_MINOR_INTERVALS, 4)),
  LydianSharp2: new Sequence(rotateIntervals(HARMONIC_MINOR_INTERVALS, 5)),
  SuperLocrianDoubleFlat7: new Sequence(rotateIntervals(HARMONIC_MINOR_INTERVALS, 6)),
  // Whole tone
  WholeTone: new Sequence([0, 2, 4, 6, 8, 10]),
  // Whole half diminished
  DiminishedWholeHalf: new Sequence([0, 2, 3, 5, 6, 8, 9, 11]),
  DiminishedHalfWhole: new Sequence([0, 1, 3, 4, 6, 7, 9, 10])
};
const Arpeggios = {
  Major: new Sequence([0, 4, 7]),
  Maj7: new Sequence([0, 4, 7, 11]),
  Maj7Sharp11: new Sequence([0, 4, 6, 11]),
  Maj7Sharp5: new Sequence([0, 4, 6, 11]),
  DimMaj7: new Sequence([0, 3, 6, 11]),
  Minor: new Sequence([0, 3, 7]),
  Minor6: new Sequence([0, 3, 6]),
  Minor7: new Sequence([0, 3, 7, 10]),
  Minor7b5: new Sequence([0, 3, 6, 10]),
  MinMaj7: new Sequence([0, 3, 7, 11]),
  Sus4b9: new Sequence([0, 5, 7, 1]),
  Dominant: new Sequence([0, 4, 7, 10]),
  Dom7Sus4: new Sequence([0, 5, 7, 10]),
  Dom7Sharp11: new Sequence([0, 4, 6, 7, 10]),
  Dom7b9: new Sequence([0, 1, 4, 7, 10]),
  Dom7Sharp9: new Sequence([0, 3, 4, 7, 10]),
  Dom7Dim: new Sequence([0, 4, 7, 10]),
  Diminished: new Sequence([0, 3, 6])
};
function getScaleNotesFromRoot(root, scale) {
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
function getArpeggioNotesFromRoot(root, arpeggio) {
  console.log("Getting arpeggio notes: ", root, arpeggio);
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
const INTERVAL_NAMES = [
  "R",
  "b2",
  "2",
  "b3",
  "3",
  "4",
  "#4",
  "5",
  "b6",
  "6",
  "b7",
  "7",
  "R"
];
function intervalBetween(startNote, endNote) {
  const i = ALL_NOTES.indexOf(startNote);
  const j = ALL_NOTES.indexOf(endNote);
  if (i < j)
    return INTERVAL_NAMES[j - i];
  return INTERVAL_NAMES[j + 12 - i];
}
const standardTuning = [Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.B, Naturals.E];
const fourthsTuning = [Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.C, Naturals.F];
const dFourths = [Naturals.D, Naturals.G, Naturals.C, Naturals.F, Accidentals.As, Accidentals.Ds];
const sevenStringStandard = [Naturals.B, Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.B, Naturals.E];
const eightStringStandard = [Accidentals.Fs, Naturals.B, Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.B, Naturals.E];
const bassStandard = [Naturals.E, Naturals.A, Naturals.D, Naturals.G];
const bassFiveStandard = [Naturals.B, Naturals.E, Naturals.A, Naturals.D, Naturals.G];
const bassSixStandard = [Naturals.B, Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.C];
const ALL_TUNINGS = {
  "Guitar - Fourths": fourthsTuning,
  "Guitar - Standard": standardTuning,
  "Guitar - D Fourths": dFourths,
  "Guitar - 7 Standard": sevenStringStandard,
  "Guitar - 8 Standard": eightStringStandard,
  "Bass - Standard": bassStandard,
  "Bass - 5 Standard": bassFiveStandard,
  "Bass - 6 Standard": bassSixStandard
};
function getDefaultTuning() {
  return "Guitar - Fourths";
}
function getDefaultFrets() {
  return 22;
}
const tuning = writable(getDefaultTuning());
tuning.subscribe((t) => {
});
const frets = writable(getDefaultFrets());
frets.subscribe((f) => {
});
export {
  ALL_TUNINGS as A,
  INTERVAL_NAMES as I,
  Naturals as N,
  Scales as S,
  ALL_NOTES as a,
  Arpeggios as b,
  getScaleNotesFromRoot as c,
  Sequence as d,
  frets as f,
  getArpeggioNotesFromRoot as g,
  intervalBetween as i,
  tuning as t
};
