import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="hero min-h-screen" style="background-image: url(/images/pexels-bg.jpg);" data-svelte-h="svelte-rvf889"><div class="hero-overlay bg-opacity-90"></div> <div class="hero-content text-center text-neutral-content"><div class="max-w"><h1 class="mb-5 text-5xl font-bold">Fretboard Visualization</h1> <a href="/guitar/scales" class="btn w-1/2 btn-primary">Scales</a> <a href="/guitar/arpeggios" class="btn w-1/2 mt-5 btn-primary">Arpeggios</a> <a href="/guitar/chord-palette" class="btn w-1/2 mt-5 btn-primary">Chord Palette</a> <a href="/guitar/multiscales" class="btn w-1/2 mt-5 btn-primary">Multiple Scales</a> <a href="/guitar/holdsworth" class="btn w-1/2 mt-5 btn-primary">Holdsworth Scales</a>  <div class="divider"></div> <div class="text-center"><h2 class="text-primary text-center text-4xl">What is this?</h2> <p class="mt-5">An experimental collection of music theory tools, designed to grow over time.</p> <p class="mt-5">I&#39;ll probably make this open source soon, once I clean up the code.</p></div></div></div></div>`;
});
export {
  Page as default
};
