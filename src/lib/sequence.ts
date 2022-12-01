export class Sequence<T> {
	private index = 0;

	// TODO: Consider cloning array for safety
	constructor(public elements: Array<T>) {}

	take(n: number): Array<T> {
		if (n < 0) return [];

		const nArray = [];

		for (let i = 0; i < n; i++) {
			nArray.push(this.consume());
		}

		return nArray;
	}

	public current(): T {
		return this.elements[this.index];
	}

	public consume(): T {
		const element = this.elements[this.index++];

		// Naieve Cycling
		if (this.index >= this.elements.length) {
			this.index = 0;
		}

		return element;
	}

	// Weirdly defaults to moving to 0 if element not found
	public moveTo(e: T) {
		const index = this.elements.indexOf(e);
		// Ternary to scrub default to 0
		this.index = index === -1 ? 0 : index;
		return this; // Hack for creation
	}

	public moveToIndex(i: number) {
		this.index = i;
		return this; // Hack for creation
	}

	public moveForward(n: number) {
		for (let i = 0; i < n; i++) {
			this.consume();
		}
	}

	public getCount(): number {
		return this.elements.length;
	}
}
