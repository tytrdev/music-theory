import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';

function getDefaultTuning(): string {
	if (browser) {
		const localStorageTuning = localStorage.getItem('mt.tuningkey');
		if (localStorageTuning) {
			return localStorageTuning;
		}
	}

	return "Guitar - Fourths";
}

export const tuning: Writable<string> = writable(getDefaultTuning());
tuning.subscribe(t => {
	if (browser) {
		localStorage.setItem('mt.tuningkey', t);
	}
})

export const showIntervals = writable(true);

// TODO: Vertical Flip uses localStorage
export const verticalFlip: Writable<boolean> = writable(true);