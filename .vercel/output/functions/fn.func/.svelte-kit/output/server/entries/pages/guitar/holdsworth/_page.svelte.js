import { c as create_ssr_component, e as escape, d as each, b as add_attribute, v as validate_component } from "../../../../chunks/ssr.js";
import { N as Naturals, a as ALL_NOTES, c as getScaleNotesFromRoot, d as Sequence, I as INTERVAL_NAMES } from "../../../../chunks/stores.js";
import { F as Fretboard } from "../../../../chunks/Fretboard.js";
function fact(x) {
  if (x <= 0) {
    return 1;
  }
  return x * fact(x - 1);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let generateScales;
  let scales;
  let numNotes = 5;
  let root = Naturals.C;
  let maxCsh = 3;
  let maxScales = 10;
  const TOTAL = fact(12) / (fact(8) * fact(4));
  console.log("Generated Scales: ", scales);
  generateScales = function(n) {
    const intervals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const scales2 = [];
    function generateCombinations(scale, start, csh) {
      if (scales2.length >= maxScales)
        return;
      if (csh >= maxCsh)
        return;
      if (scale.length === n) {
        scales2.push(scale);
        return;
      }
      for (let i = start; i < intervals.length; i++) {
        const previousInterval = scale.length > 0 ? scale[scale.length - 1] : Infinity;
        const interval = intervals[i];
        const difference = interval - previousInterval;
        const isHalfStep = difference === 1;
        if (isHalfStep) {
          generateCombinations(scale.concat(interval), i + 1, csh + 1);
        } else {
          generateCombinations(scale.concat(interval), i + 1, 0);
        }
      }
    }
    generateCombinations([], 0, 0);
    return scales2;
  };
  scales = generateScales(numNotes);
  return `<h1 data-svelte-h="svelte-1r4nqm1">Holdsworth Scale Generator</h1> <p data-svelte-h="svelte-1at6k8o">Based on Allan Holdsworth&#39;s Approach to Scales</p> <div class="flex flex-col center items-center align-center justify-center text-center"><p>Total number of possible scales ${escape(TOTAL)}</p> <p data-svelte-h="svelte-110wmey">N = Number of scales to generate</p> <p data-svelte-h="svelte-me09eo">M = Maximum number of consecutive half steps</p> <p data-svelte-h="svelte-oqurwl">X = Number of notes per scale</p></div> <div class="flex mb-5 flex-col md:flex-row"><span class="text-3xl mr-5 self-center" data-svelte-h="svelte-1wgkikx">Root</span> <select class="select select-lg select-primary mr-5">${each(ALL_NOTES, (note) => {
    return `<option${add_attribute("value", note, 0)}>${escape(note)}</option>`;
  })}</select> <span class="text-3xl mr-5 self-center" data-svelte-h="svelte-17n06dr">N</span> <input type="number" min="1" max="100" class="input input-lg input-bordered mr-5"${add_attribute("value", maxScales, 0)}> <span class="text-3xl mr-5 self-center" data-svelte-h="svelte-dtc81w">M</span> <input type="number" min="1" max="100" class="input input-lg input-bordered mr-5"${add_attribute("value", maxCsh, 0)}> <span class="text-3xl mr-5 self-center" data-svelte-h="svelte-nadyx1">X</span> <input type="number" min="1" max="100" class="input input-lg input-bordered"${add_attribute("value", numNotes, 0)}></div> ${each(scales, (scale) => {
    return `<div class="flex">${each(scale, (interval) => {
      return `<span class="mr-5">${escape(INTERVAL_NAMES[interval])} </span>`;
    })}</div> <div class="flex flex-col w-full justify-center">${validate_component(Fretboard, "Fretboard").$$render(
      $$result,
      {
        root,
        notes: getScaleNotesFromRoot(root, new Sequence(scale))
      },
      {},
      {}
    )} </div>`;
  })}`;
});
export {
  Page as default
};
