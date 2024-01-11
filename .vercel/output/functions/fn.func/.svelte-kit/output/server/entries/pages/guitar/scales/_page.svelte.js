import { c as create_ssr_component, d as each, v as validate_component, b as add_attribute, e as escape } from "../../../../chunks/ssr.js";
import { a as ALL_NOTES, c as getScaleNotesFromRoot, S as Scales } from "../../../../chunks/stores.js";
import { F as Fretboard } from "../../../../chunks/Fretboard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedNote;
  let selectedScale;
  let note;
  let scale;
  let scaleNotes;
  const scales = Object.keys(Scales);
  function getNotes(note2, scale2) {
    return getScaleNotesFromRoot(note2, scale2);
  }
  selectedNote = "A";
  selectedScale = "Major";
  note = ALL_NOTES.find((note2) => note2 === selectedNote);
  scale = Scales[selectedScale];
  scaleNotes = getNotes(note, scale);
  return `<h1 class="text-4xl mb-5" data-svelte-h="svelte-i82itl">Fretboard Visualizer - Scales</h1> <div class="flex mb-5 flex-col md:flex-row"><span class="text-3xl mr-5 self-center" data-svelte-h="svelte-10jxuhl">Note</span> <select class="select select-lg select-primary mr-5">${each(ALL_NOTES, (note2) => {
    return `<option${add_attribute("value", note2, 0)}>${escape(note2)}</option>`;
  })}</select> <span class="text-3xl mr-5 self-center" data-svelte-h="svelte-14qkijj">Scale</span> <select class="select select-lg select-primary mr-5">${each(scales, (scale2) => {
    return `<option${add_attribute("value", scale2, 0)}>${escape(scale2)}</option>`;
  })}</select> <button class="btn btn-lg btn-primary" data-svelte-h="svelte-h1narb">Random Scale</button></div> <div class="flex flex-col w-full">${validate_component(Fretboard, "Fretboard").$$render($$result, { root: note, notes: scaleNotes }, {}, {})}</div>`;
});
export {
  Page as default
};
