import { c as create_ssr_component, a as subscribe, d as each, e as escape } from "./ssr.js";
import { t as tuning, f as frets, A as ALL_TUNINGS, d as Sequence, a as ALL_NOTES, i as intervalBetween } from "./stores.js";
const css = {
  code: ".root.svelte-jhxf37{background:var(--fallback-p,oklch(var(--p)/1)) !important}.active.svelte-jhxf37{background:var(--fallback-s,oklch(var(--s)/1)) !important}.fretmarker-dot.svelte-jhxf37{border-bottom-color:var(--fallback-a,oklch(var(--a)/1));border-style:none none solid none}.fretmarker-double-dot.svelte-jhxf37{border-bottom-color:var(--fallback-a,oklch(var(--a)/1));border-style:none none double none;border-width:4px}.fretmarker-dot-bottom.svelte-jhxf37{border-top-color:var(--fallback-a,oklch(var(--a)/1));border-style:solid none none none}.fretmarker-double-dot-bottom.svelte-jhxf37{border-top-color:var(--fallback-a,oklch(var(--a)/1));border-style:double none none none;border-width:4px}",
  map: null
};
const minWidthForFullFretboard = 1e3;
function fretMarkerHasDot(marker) {
  return marker === 3 || marker === 5 || marker === 7 || marker === 9 || marker === 15 || marker == 17 || marker == 19 || marker == 21;
}
function fretMarkerHasDoubleDot(marker) {
  return marker > 1 && marker % 12 === 0;
}
const Fretboard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let miniView;
  let microView;
  let hideStringNumbers;
  let NUM_FRETS;
  let tuningNotes;
  let sequences;
  let fretMarkers;
  let isActive;
  let isRoot;
  let getDisplayInterval;
  let $tuning, $$unsubscribe_tuning;
  let $frets, $$unsubscribe_frets;
  $$unsubscribe_tuning = subscribe(tuning, (value) => $tuning = value);
  $$unsubscribe_frets = subscribe(frets, (value) => $frets = value);
  let { root } = $$props;
  let { notes } = $$props;
  let { showIntervals = false } = $$props;
  let { forceMiniView = false } = $$props;
  let { forceMicroView = false } = $$props;
  let { startingFret = 0 } = $$props;
  let { forceHideStringNumbers = false } = $$props;
  let { activeFunction = null } = $$props;
  let windowWidth = Infinity;
  if ($$props.root === void 0 && $$bindings.root && root !== void 0)
    $$bindings.root(root);
  if ($$props.notes === void 0 && $$bindings.notes && notes !== void 0)
    $$bindings.notes(notes);
  if ($$props.showIntervals === void 0 && $$bindings.showIntervals && showIntervals !== void 0)
    $$bindings.showIntervals(showIntervals);
  if ($$props.forceMiniView === void 0 && $$bindings.forceMiniView && forceMiniView !== void 0)
    $$bindings.forceMiniView(forceMiniView);
  if ($$props.forceMicroView === void 0 && $$bindings.forceMicroView && forceMicroView !== void 0)
    $$bindings.forceMicroView(forceMicroView);
  if ($$props.startingFret === void 0 && $$bindings.startingFret && startingFret !== void 0)
    $$bindings.startingFret(startingFret);
  if ($$props.forceHideStringNumbers === void 0 && $$bindings.forceHideStringNumbers && forceHideStringNumbers !== void 0)
    $$bindings.forceHideStringNumbers(forceHideStringNumbers);
  if ($$props.activeFunction === void 0 && $$bindings.activeFunction && activeFunction !== void 0)
    $$bindings.activeFunction(activeFunction);
  $$result.css.add(css);
  miniView = forceMiniView || windowWidth < minWidthForFullFretboard;
  microView = forceMicroView;
  hideStringNumbers = forceHideStringNumbers || miniView || microView || false;
  NUM_FRETS = miniView ? 8 : microView ? 5 : $frets;
  tuningNotes = ALL_TUNINGS[$tuning];
  sequences = tuningNotes.slice().reverse().map((note, i) => {
    const sequence = new Sequence(ALL_NOTES);
    sequence.moveTo(note);
    if (startingFret && startingFret > 0) {
      sequence.moveForward(startingFret);
    }
    if (hideStringNumbers) {
      return sequence.take(NUM_FRETS);
    }
    return [`${i + 1}`, ...sequence.take(NUM_FRETS)];
  });
  fretMarkers = hideStringNumbers ? Array(NUM_FRETS).fill(0).map((_, i) => i + startingFret) : [" ", ...Array(NUM_FRETS).fill(0).map((_, i) => i + startingFret)];
  isActive = function(string, fret, note) {
    if (activeFunction) {
      return activeFunction(string, fret, note);
    }
    return notes.includes(note);
  };
  isRoot = function(note) {
    return note === root;
  };
  getDisplayInterval = function(note) {
    if (showIntervals) {
      return intervalBetween(root, note);
    }
    if (note.length === 1) {
      return note;
    }
    return note[0];
  };
  $$unsubscribe_tuning();
  $$unsubscribe_frets();
  return ` <div class="flex flex-col"><div class="flex flex-col relative w-11/12 p-3 self-center border rounded border-primary divide-y-2 divide-dashed divide-slate-700"><div class="flex w-full center justify-evenly">${each(fretMarkers, (fretMarker) => {
    return `<div class="${[
      "grow h-9 dark:text-secondary text-2xl font-bold text-center basis-0 border-2 border-transparent svelte-jhxf37",
      (fretMarkerHasDot(fretMarker) ? "fretmarker-dot" : "") + " " + (fretMarkerHasDoubleDot(fretMarker) ? "fretmarker-double-dot" : "")
    ].join(" ").trim()}">${escape(fretMarker)} </div>`;
  })}</div> ${each(sequences, (sequence, string) => {
    return `<div class="flex w-full justify-evenly divide-slate-800">${each(sequence, (note, i) => {
      return `<div class="${[
        "grow h-8 text-2xl font-bold text-center basis-0 relative mask m-1 svelte-jhxf37",
        (isActive(string, i, note) && !isRoot(note) ? "active" : "") + " " + (isRoot(note) && isActive(string, i, note) ? "root" : "") + " " + (startingFret > 0 || (hideStringNumbers ? i !== 0 : i !== 1) ? "mask-circle" : "") + " " + (!hideStringNumbers && i == 0 ? "dark:text-secondary" : "")
      ].join(" ").trim()}">${escape(getDisplayInterval(note))} ${!showIntervals && note.length > 1 ? `<span class="text-sm absolute top-0" data-svelte-h="svelte-1wr7dft">♯ </span>` : ``} </div>`;
    })} </div>`;
  })} <div class="flex w-full justify-evenly">${each(fretMarkers, (fretMarker) => {
    return `<div class="${[
      "grow h-8 mt-1 dark:text-secondary text-2xl font-bold text-center basis-0 border-2 border-transparent svelte-jhxf37",
      (fretMarkerHasDot(fretMarker) ? "fretmarker-dot-bottom" : "") + " " + (fretMarkerHasDoubleDot(fretMarker) ? "fretmarker-double-dot-bottom" : "")
    ].join(" ").trim()}">${escape(fretMarker)} </div>`;
  })}</div> <div class="tooltip absolute bottom-1 right-0" data-tip="Toggle interval names"><button class="ml-5 btn btn-xs btn-primary self-center max-w-fit mr-5" data-svelte-h="svelte-15nqc5w">#</button></div></div>    </div>`;
});
export {
  Fretboard as F
};
