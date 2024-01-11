import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

function getDefaultTuning(): string {
	if (browser) {
		const localStorageTuning = localStorage.getItem('mt.tuningkey');
		if (localStorageTuning) {
			return localStorageTuning;
		}
	}

	return 'Guitar - Fourths';
}

function getDefaultFrets(): number {
	if (browser) {
		const lsFrets = localStorage.getItem('mt.fretskey');
		if (lsFrets) {
			return Number.parseInt(lsFrets);
		}
	}

	return 22;
}

export const tuning: Writable<string> = writable(getDefaultTuning());
tuning.subscribe((t) => {
	if (browser) {
		localStorage.setItem('mt.tuningkey', t);
	}
});

export const frets: Writable<number> = writable(getDefaultFrets());
frets.subscribe((f) => {
	if (browser) {
		localStorage.setItem('mt.fretskey', f.toString());
	}
});

export const showIntervals = writable(true);

// TODO: Vertical Flip uses localStorage
export const verticalFlip: Writable<boolean> = writable(true);

