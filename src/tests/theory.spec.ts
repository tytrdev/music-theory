import { Naturals, Accidentals, Scales, getScaleNotesFromRoot } from '../lib/theory';

describe('Theory Tests', () => {
    describe('#getScaleNotesFromRoot', () => {
        it('should return C major', () => {
            const cMajor = [
                Naturals.C,
                Naturals.D,
                Naturals.E,
                Naturals.F,
                Naturals.G,
                Naturals.A,
                Naturals.B,
            ];

            const results = getScaleNotesFromRoot(Naturals.C, Scales.Major);
            expect(results).toBe(cMajor);
        });

        it('should return D dorian', () => {
            const scale = [
                Naturals.D,
                Naturals.E,
                Naturals.F,
                Naturals.G,
                Naturals.A,
                Naturals.B,
                Naturals.C,
            ];

            const results = getScaleNotesFromRoot(Naturals.D, Scales.Dorian);
            expect(results).toBe(scale);
        });

        it('should return E phrygian', () => {
            const scale = [
                Naturals.E,
                Naturals.F,
                Naturals.G,
                Naturals.A,
                Naturals.B,
                Naturals.C,
                Naturals.D,
            ];

            const results = getScaleNotesFromRoot(Naturals.E, Scales.Phrygian);
            expect(results).toBe(scale);
        });

        it('should return F lydian', () => {
            const scale = [
                Naturals.F,
                Naturals.G,
                Naturals.A,
                Naturals.B,
                Naturals.C,
                Naturals.D,
                Naturals.E,
            ];

            const results = getScaleNotesFromRoot(Naturals.F, Scales.Lydian);
            expect(results).toBe(scale);
        });

        it('should return G mixolydian', () => {
            const scale = [
                Naturals.G,
                Naturals.A,
                Naturals.B,
                Naturals.C,
                Naturals.D,
                Naturals.E,
                Naturals.F,
            ];

            const results = getScaleNotesFromRoot(Naturals.G, Scales.Mixolydian);
            expect(results).toBe(scale);
        });

        it('should return A minor', () => {
            const scale = [
                Naturals.A,
                Naturals.B,
                Naturals.C,
                Naturals.D,
                Naturals.E,
                Naturals.F,
                Naturals.G,
            ];

            const results = getScaleNotesFromRoot(Naturals.A, Scales.Aeolian);
            expect(results).toBe(scale);
        });

        it('should return B locrian', () => {
            const scale = [
                Naturals.B,
                Naturals.C,
                Naturals.D,
                Naturals.E,
                Naturals.F,
                Naturals.G,
                Naturals.A,
            ];

            const results = getScaleNotesFromRoot(Naturals.B, Scales.Locrian);
            expect(results).toBe(scale);
        });
    });
});