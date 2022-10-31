import { writable, type Writable } from 'svelte/store';
import { Naturals, type Note } from '$lib/theory';

export const tuning: Writable<Array<Note>> = writable([
	Naturals.E,
	Naturals.A,
	Naturals.D,
	Naturals.G,
	Naturals.C,
	Naturals.F
]);

export const verticalFlipFretboard = writable(true);

export const showIntervals = writable(true);
