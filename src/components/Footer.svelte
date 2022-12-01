<script>
 import { Naturals, Accidentals } from '$lib/theory';
 import { tuning } from '../stores';

 const standardTuning = [
     Naturals.E,
     Naturals.A,
     Naturals.D,
     Naturals.G,
     Naturals.B,
     Naturals.E,
 ];

 const fourthsTuning = [
     Naturals.E,
     Naturals.A,
     Naturals.D,
     Naturals.G,
     Naturals.C,
     Naturals.F,
 ];

 const dFourths = [
     Naturals.D,
     Naturals.G,
     Naturals.C,
     Naturals.F,
     Accidentals.As,
     Accidentals.Ds,
 ];

 const tunings = {
     "Fourths: EADGCF": fourthsTuning,
     "Standard: EADGBE": standardTuning,
     "D Fourths: DGCFBbEb": dFourths,
 };

 const tuningKeys = Object.keys(tunings);

 function setTuning(e) {
     const t = tunings[e.target.value];
     tuning.set(t);
 }
</script>

<div id="footer">
    <label for="tuning">Tuning</label>
    <select name="tuning" on:change={setTuning}>
        {#each tuningKeys as tuningKey}
            <option value={tuningKey}>
                {tuningKey}
            </option>
        {/each}
    </select>

    <label for="flip">Fretboard Flipped Vertically</label>
    <input name="flip" type="checkbox" checked />
</div>

<style>
 #footer {
     position: fixed;
     bottom: 0;
 }
 label {
     margin-left: 10px;
 }
</style>
