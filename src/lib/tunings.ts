import { Accidentals, Naturals, type Note } from "./theory";

export type Tuning = Array<Note>;

// Standard Guitar Tunings
export const standardTuning: Tuning = [Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.B, Naturals.E];
export const fourthsTuning: Tuning = [Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.C, Naturals.F];
export const dFourths: Tuning = [Naturals.D, Naturals.G, Naturals.C, Naturals.F, Accidentals.As, Accidentals.Ds];

// Extended Range Guitar Tunings
export const sevenStringStandard: Tuning = [Naturals.B, Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.B, Naturals.E];
export const eightStringStandard: Tuning = [Accidentals.Fs, Naturals.B, Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.B, Naturals.E];
export const eightStringFourths: Tuning = [Accidentals.Fs, Naturals.B, Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.C, Naturals.F];

// Bass Guitar Tunings
export const bassStandard: Tuning = [Naturals.E, Naturals.A, Naturals.D, Naturals.G];
export const bassFiveStandard: Tuning = [Naturals.B, Naturals.E, Naturals.A, Naturals.D, Naturals.G];
export const bassSixStandard: Tuning = [Naturals.B, Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.C];

// TODO: Should fourths be the default?
export const ALL_TUNINGS = {
    "Guitar - Fourths": fourthsTuning,
    "Guitar - Standard": standardTuning,
    "Guitar - D Fourths": dFourths,
    "Guitar - 7 Standard": sevenStringStandard,
    "Guitar - 8 Standard": eightStringStandard,
    "Guitar - 8 Fourths": eightStringFourths,
    "Bass - Standard": bassStandard,
    "Bass - 5 Standard": bassFiveStandard,
    "Bass - 6 Standard": bassSixStandard,
}
