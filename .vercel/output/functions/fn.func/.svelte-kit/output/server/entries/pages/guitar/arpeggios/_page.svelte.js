import { c as create_ssr_component, d as each, v as validate_component, b as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import { g as getArpeggioNotesFromRoot, a as ALL_NOTES, b as Arpeggios } from "../../../../chunks/stores.js";
import { F as Fretboard } from "../../../../chunks/Fretboard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedNote;
  let selectedArpeggio;
  let note;
  let arpeggio;
  let arpeggioNotes;
  const arpeggios = Object.keys(Arpeggios);
  function getNotes(note2, arpeggio2) {
    return getArpeggioNotesFromRoot(note2, arpeggio2);
  }
  selectedNote = "A";
  selectedArpeggio = "Major";
  note = ALL_NOTES.find((note2) => note2 === selectedNote);
  arpeggio = Arpeggios[selectedArpeggio];
  arpeggioNotes = getNotes(note, arpeggio);
  return `<h1 class="text-4xl mb-5" data-svelte-h="svelte-qfpxs9">Fretboard Visualizer - Arpeggios</h1> <div class="flex mb-5 flex-col md:flex-row"><span class="text-3xl mr-5 self-center" data-svelte-h="svelte-10jxuhl">Note</span> <select class="select select-lg select-primary mr-5">${each(ALL_NOTES, (note2) => {
    return `<option${add_attribute("value", note2, 0)}>${escape(note2)}</option>`;
  })}</select> <span class="text-3xl mr-5 self-center" data-svelte-h="svelte-xfoqnf">Arpeggio</span> <select class="select select-lg select-primary mr-5">${each(arpeggios, (arpeggio2) => {
    return `<option${add_attribute("value", arpeggio2, 0)}>${escape(arpeggio2)}</option>`;
  })}</select> <button class="btn btn-lg btn-primary" data-svelte-h="svelte-85wc6v">Random Arpeggio</button></div> <div class="flex flex-col w-full">${validate_component(Fretboard, "Fretboard").$$render($$result, { root: note, notes: arpeggioNotes }, {}, {})}</div>`;
});
export {
  Page as default
};
