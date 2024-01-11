import { c as create_ssr_component, d as each, v as validate_component } from "../../../../chunks/ssr.js";
import { N as Naturals, c as getScaleNotesFromRoot, d as Sequence, S as Scales } from "../../../../chunks/stores.js";
import { F as Fretboard } from "../../../../chunks/Fretboard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const root = Naturals.A;
  const scale = Scales.Major;
  const notes = getScaleNotesFromRoot(root, scale);
  console.log("C major notes: ", notes);
  const chords = [];
  const noteSequence = new Sequence(notes);
  for (const note of notes) {
    const chord = [note];
    console.log("Building chord for: ", note);
    noteSequence.moveTo(note);
    noteSequence.moveForward(2);
    chord.push(noteSequence.current());
    noteSequence.moveForward(2);
    chord.push(noteSequence.current());
    noteSequence.moveForward(2);
    chord.push(noteSequence.current());
    console.log("Built chord: ", chord);
    chords.push(chord);
  }
  console.log("Chords: ", chords);
  const fretboardFunctions = chords.map((chord) => {
    return function(string, fret, note) {
      const index = chord.indexOf(note);
      if (index === -1)
        return false;
      if (index === 0) {
        console.log("Chord index 0, string: ", string);
        return string === 5;
      }
      if (index === 1) {
        console.log("Chord index 1, string: ", string);
        return string === 2;
      }
      if (index === 2) {
        return false;
      }
      if (index === 3) {
        console.log("Chord index 3, string: ", string);
        return string === 3;
      }
      return false;
    };
  });
  return `<h1 data-svelte-h="svelte-ihje54">Shell Voicings</h1> <div class="flex flex-row flex-wrap w-full"><div class="flex flex-col flex-grow w-1/2 mb-5">${each(fretboardFunctions, (f, i) => {
    return `${validate_component(Fretboard, "Fretboard").$$render(
      $$result,
      {
        forceMicroView: true,
        root: chords[i][0],
        notes: chords[i],
        activeFunction: f,
        startingFret: i + 4
      },
      {},
      {}
    )}`;
  })}</div></div>`;
});
export {
  Page as default
};
