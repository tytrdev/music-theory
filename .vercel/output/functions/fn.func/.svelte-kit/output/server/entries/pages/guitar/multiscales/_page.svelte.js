import { c as create_ssr_component, d as each, b as add_attribute, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { a as ALL_NOTES, c as getScaleNotesFromRoot, S as Scales } from "../../../../chunks/stores.js";
import { F as Fretboard } from "../../../../chunks/Fretboard.js";
const MiniScaleWrapper = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedNote;
  let selectedScale;
  let note;
  let scale;
  let scaleNotes;
  let { startingFret = 0 } = $$props;
  const scales = Object.keys(Scales);
  if ($$props.startingFret === void 0 && $$bindings.startingFret && startingFret !== void 0)
    $$bindings.startingFret(startingFret);
  selectedNote = "D";
  selectedScale = "Major";
  note = ALL_NOTES.find((note2) => note2 === selectedNote);
  scale = Scales[selectedScale];
  scaleNotes = getScaleNotesFromRoot(note, scale);
  {
    console.log("Scale notes done changeded! ", note, scale, scaleNotes);
  }
  return `<div class="self-center flex mb-1 flex-col md:flex-row"><span class="text-xl mr-5 self-center" data-svelte-h="svelte-z8ikps">Note</span> <select class="select select-sm select-primary mr-5">${each(ALL_NOTES, (note2) => {
    return `<option${add_attribute("value", note2, 0)}>${escape(note2)}</option>`;
  })}</select> <span class="text-xl mr-5 self-center" data-svelte-h="svelte-la8inq">Scale</span> <select class="select select-sm select-primary mr-5">${each(scales, (scale2) => {
    return `<option${add_attribute("value", scale2, 0)}>${escape(scale2)}</option>`;
  })}</select></div> ${validate_component(Fretboard, "Fretboard").$$render(
    $$result,
    {
      startingFret,
      forceMiniView: true,
      root: note,
      notes: scaleNotes
    },
    {},
    {}
  )}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let startingFret;
  let selectedNote;
  let selectedScale;
  let note;
  let scale;
  function getNotes(note2, scale2) {
    return getScaleNotesFromRoot(note2, scale2);
  }
  startingFret = 0;
  selectedNote = "A";
  selectedScale = "Major";
  note = ALL_NOTES.find((note2) => note2 === selectedNote);
  scale = Scales[selectedScale];
  getNotes(note, scale);
  return `<div><span class="text-4xl mb-5 mr-5" data-svelte-h="svelte-jjcrz2">Multiple Scales |</span> <span class="text-3xl mr-5 self-center" data-svelte-h="svelte-4jyfs2">Starting Fret</span> <input type="number" min="0" max="15" class="input input-bordered"${add_attribute("value", startingFret, 0)}></div> <span class="divider"></span> <div class="flex flex-row w-full flex-wrap"><div class="flex flex-col flex-grow w-1/2">${validate_component(MiniScaleWrapper, "MiniScaleWrapper").$$render($$result, { startingFret }, {}, {})}</div> <div class="flex flex-col flex-grow w-1/2">${validate_component(MiniScaleWrapper, "MiniScaleWrapper").$$render($$result, { startingFret }, {}, {})}</div> <div class="mt-2 flex flex-col flex-grow w-1/2">${validate_component(MiniScaleWrapper, "MiniScaleWrapper").$$render($$result, { startingFret }, {}, {})}</div> <div class="mt-2 flex flex-col flex-grow w-1/2">${validate_component(MiniScaleWrapper, "MiniScaleWrapper").$$render($$result, { startingFret }, {}, {})}</div></div> <div class="flex flex-col w-half"></div> `;
});
export {
  Page as default
};
