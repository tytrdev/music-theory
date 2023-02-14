<script>
	import { ALL_TUNINGS } from '$lib/tunings';
	import { tuning } from '../stores';

	const tuningKeys = Object.keys(ALL_TUNINGS);

	function setTuning(e) {
		tuning.set(e.target.value);
	}

	function setFlip(e) {
		tuning.update((t) => {
			tuning.set(t.reverse());
			return t.reverse();
		});
	}

    // function setHFlip() {
    // }
</script>

<div class="flex flex-col md:flex-row mt-10">
	<div class="flex items-center">
		<label for="tuning" class="mr-5">Tuning</label>
		<select class="select select-primary select-md mr-5" value={$tuning} name="tuning" on:change={setTuning}>
			{#each tuningKeys as tuningKey}
				<option value={tuningKey}>
					{tuningKey}
				</option>
			{/each}
		</select>
	</div>

	<!-- <div class="flex items-center justify-center mt-5 md:mt-0">
		<label for="flip" class="mr-2 self-center">Vertical Flip</label>
		<input name="flip" type="checkbox" class="checkbox self-center" checked on:change={setFlip} />
	</div> -->

	<!-- <div class="flex items-center justify-center ml-5 mt-5 md:mt-0">
		<label for="flip" class="mr-2 self-center">Horizontal Flip</label>
		<input name="flip" type="checkbox" class="checkbox self-center" on:change={setHFlip} />
	</div> -->
</div>
