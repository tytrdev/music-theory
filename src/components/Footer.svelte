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
     console.log("Setting tuning: ", t);
     tuning.set(t);
 }
</script>

<p>
    Thing
</p>

<select on:change={setTuning}>
    {#each tuningKeys as tuningKey}
        <option value={tuningKey}>
            {tuningKey}
        </option>
    {/each}
</select>
