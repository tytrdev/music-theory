import { c as create_ssr_component, d as each, b as add_attribute, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { N as Naturals, a as ALL_NOTES, g as getArpeggioNotesFromRoot, d as Sequence, b as Arpeggios } from "../../../../chunks/stores.js";
import { F as Fretboard } from "../../../../chunks/Fretboard.js";
const css = {
  code: ".selections.svelte-1mh9ibb{display:flex;font-size:2em}span.svelte-1mh9ibb{margin-left:10px}select.svelte-1mh9ibb{font-size:1em}.fretboard.svelte-1mh9ibb{width:90%}button.svelte-1mh9ibb{border:1px solid white;padding:10px;font-size:1em;cursor:pointer;margin-left:10px}button.svelte-1mh9ibb:hover{transition:0.3s linear;background:white;border:1px solid #559E55;color:#559E55}",
  map: null
};
const Arpeggios_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedNote;
  let selectedArpeggio;
  let note;
  let arpeggio;
  let arpeggioNotes;
  const tuning = [Naturals.E, Naturals.A, Naturals.D, Naturals.G, Naturals.B, Naturals.E].reverse();
  tuning.map((note2) => {
    const sequence = new Sequence(ALL_NOTES);
    sequence.moveTo(note2);
    return sequence.take(25);
  });
  Array(25).fill(0).map((_, i) => i);
  const arpeggios = Object.keys(Arpeggios);
  $$result.css.add(css);
  selectedNote = "A";
  selectedArpeggio = "Major";
  note = ALL_NOTES.find((note2) => note2 === selectedNote);
  arpeggio = Arpeggios[selectedArpeggio];
  arpeggioNotes = getArpeggioNotesFromRoot(note, arpeggio);
  return `<h3 data-svelte-h="svelte-1ytouav">Arpeggios</h3> <div class="selections svelte-1mh9ibb"><div class="select-container"><span class="svelte-1mh9ibb" data-svelte-h="svelte-mro7j2">Root</span> <select class="svelte-1mh9ibb">${each(ALL_NOTES, (note2) => {
    return `<option${add_attribute("value", note2, 0)}>${escape(note2)}</option>`;
  })}</select></div> <div class="select-container"><span class="svelte-1mh9ibb" data-svelte-h="svelte-11rcwwo">Arpeggio</span> <select class="svelte-1mh9ibb">${each(arpeggios, (arpeggio2) => {
    return `<option${add_attribute("value", arpeggio2, 0)}>${escape(arpeggio2)}</option>`;
  })}</select></div> <button class="svelte-1mh9ibb" data-svelte-h="svelte-phcfin">Random Arpeggio</button></div> <div class="fretboard svelte-1mh9ibb">${validate_component(Fretboard, "Fretboard").$$render($$result, { root: note, notes: arpeggioNotes }, {}, {})} </div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedNote;
  let selectedArpeggio;
  let note;
  let arpeggio;
  const arpeggios = Object.keys(Arpeggios_1);
  function getNotes(note2, arpeggio2) {
    return getArpeggioNotesFromRoot(note2, arpeggio2);
  }
  selectedNote = "A";
  selectedArpeggio = "Major";
  note = ALL_NOTES.find((note2) => note2 === selectedNote);
  arpeggio = Arpeggios_1[selectedArpeggio];
  getNotes(note, arpeggio);
  return `<h1 class="text-4xl mb-5" data-svelte-h="svelte-1u442t8">Fretboard Visualizer - Scales by Chord</h1> <p data-svelte-h="svelte-b6b6d4">A listing of same-root scales that could theoretically be used over a chord.</p> <div class="flex mb-5 flex-col md:flex-row"><span class="text-3xl mr-5 self-center" data-svelte-h="svelte-10jxuhl">Note</span> <select class="select select-lg select-primary mr-5">${each(ALL_NOTES, (note2) => {
    return `<option${add_attribute("value", note2, 0)}>${escape(note2)}</option>`;
  })}</select> <span class="text-3xl mr-5 self-center" data-svelte-h="svelte-xfoqnf">Arpeggio</span> <select class="select select-lg select-primary mr-5">${each(arpeggios, (arpeggio2) => {
    return `<option${add_attribute("value", arpeggio2, 0)}>${escape(arpeggio2)}</option>`;
  })}</select></div> <div class="flex flex-col w-full" data-svelte-h="svelte-1dpozjh"></div>`;
});
export {
  Page as default
};
