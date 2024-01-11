import { c as create_ssr_component, d as each, b as add_attribute, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { c as getScaleNotesFromRoot, a as ALL_NOTES, S as Scales } from "../../../../chunks/stores.js";
import { F as Fretboard } from "../../../../chunks/Fretboard.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let selectedRoot;
  let selectedArchetype;
  let note;
  let archetypeScales;
  let scaleNotes;
  const archetypeOptions = ["Major", "Minor", "Dominant"];
  const Archetypes = {
    Major: [
      {
        label: "Major/Ionian, (Maj7)",
        scale: Scales.Major
      },
      {
        label: "Lydian, (Maj7#11)",
        scale: Scales.Lydian
      },
      {
        label: "Lydian Augmented (Maj7#5)",
        scale: Scales.LydianAugmented
      },
      {
        label: "Diminished Whole Half (Diminished Maj7)",
        scale: Scales.DiminishedWholeHalf
      },
      {
        label: "Lydian Sharp 9 (Maj7#9)",
        scale: Scales.LydianSharp2
      }
    ],
    Minor: [
      {
        label: "Dorian (m7/m6)",
        scale: Scales.Dorian
      },
      {
        label: "Aoelian/Minor (m7/m7b6)",
        scale: Scales.Aeolian
      },
      {
        label: "Phrygian (Sus4b9, m11b9)",
        scale: Scales.Phrygian
      },
      {
        label: "Locrian (m7b5)",
        scale: Scales.Locrian
      },
      {
        label: "Locrian Natural 2",
        scale: Scales.LocrianSharp2
      },
      {
        label: "Melodic Minor (minMaj7)",
        scale: Scales.MelodicMinor
      },
      {
        label: "Harmonic Minor (minMaj7)",
        scale: Scales.HarmonicMinor
      }
    ],
    Dominant: [
      {
        label: "Mixolydian (7, 7/9, 7/13, 7Sus4)",
        scale: Scales.Mixolydian
      },
      {
        label: "Lydian b7 (Dom7#11)",
        scale: Scales.LydianDominant
      },
      {
        label: "Altered Dominant (7b5/#5/b9/#9)",
        scale: Scales.Altered
      },
      {
        label: "Half Whole Diminished (Dom13b9)",
        scale: Scales.DiminishedHalfWhole
      }
    ]
  };
  function getNotes(note2, scale) {
    return getScaleNotesFromRoot(note2, scale);
  }
  selectedRoot = "E";
  selectedArchetype = "Major";
  note = ALL_NOTES.find((note2) => note2 === selectedRoot);
  archetypeScales = Archetypes[selectedArchetype];
  scaleNotes = archetypeScales.map((s) => ({
    label: s.label,
    notes: getNotes(note, s.scale)
  }));
  return `<h1 data-svelte-h="svelte-l8x3z4">Chord Palette Scales</h1> <div class="flex mb-5 flex-col md:flex-row"><span class="text-3xl mr-5 self-center" data-svelte-h="svelte-1wgkikx">Root</span> <select class="select select-lg select-primary mr-5">${each(ALL_NOTES, (note2) => {
    return `<option${add_attribute("value", note2, 0)}>${escape(note2)}</option>`;
  })}</select> <span class="text-3xl mr-5 self-center" data-svelte-h="svelte-1warel5">Palette Archetype</span> <select class="select select-lg select-primary mr-5">${each(archetypeOptions, (archetype) => {
    return `<option${add_attribute("value", archetype, 0)}>${escape(archetype)}</option>`;
  })}</select></div> <div class="flex w-full flex-wrap">${each(scaleNotes, ({ label, notes }) => {
    return `<div class="flex flex-col w-1/2 mb-5"><div><h1 class="text-xl text-center">${escape(label)} </h1></div> ${validate_component(Fretboard, "Fretboard").$$render($$result, { root: note, notes }, {}, {})} </div>`;
  })}</div>`;
});
export {
  Page as default
};
