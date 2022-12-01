<script>
 import { Sequence } from '$lib/sequence';
 import { ALL_NOTES, Naturals, Intervals, INTERVAL_DISPLAY_NAMES } from '$lib/theory';

 let note = Naturals.A;
 let interval = Intervals.MajorSecond;
 let target = Naturals.

 const sequence = new Sequence(ALL_NOTES);

 function chooseRandomNote() {
     const index = Math.floor(Math.random() * ALL_NOTES.length);
     note = ALL_NOTES[index];
 }

 function chooseRandomInterval() {
     interval = Math.floor(Math.random() * 12);
 }

 function randomize() {
     chooseRandomNote();
     chooseRandomInterval();
 }

 function attempt(noteValue) {
     if sequence.get()
 }
</script>

<h2>
    Interval Practice
</h2>

<p>
    Choose the note that corresponds to the interval distance from the root
</p>

<div>
    <div>
        Root - {note}
    </div>

    <div>
        Interval - {INTERVAL_DISPLAY_NAMES[interval]}
    </div>

    <div id="note-buttons">
        {#each ALL_NOTES as note_value}
            <button on:click={() => attempt(note_value)}>
                {note_value}
            </button>
        {/each}
    </div>
</div>

<style>
 #note-buttons {
     display: flex;
 }
 button {
     color: white;
     border: 1px solid white;
     font-size: 2em;
     padding: 10px;
     cursor: pointer;
 }

 button:hover {
     transition: 0.3s linear;
     border: 1px solid black;
     background-color: white;
     color: black;
 }
</style>
